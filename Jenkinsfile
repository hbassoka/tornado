pipeline {
    agent any

    parameters {
        choice(
            name: 'BRANCH_TO_BUILD',
            choices: ['master','develop','preproduction','production'],
            description: 'Choisissez la branche à builder'
        )
    }

    environment {
    
       
        // Set Git config        
        GIT_USER_NAME="jenkins";
        GIT_REPO_URL = 'https://github.com/hbassoka/tornado.git'
        GITHUB_CREDENTIALS_ID='github_creds'
        TAG_PREFIX = 'release-'
        
        // sonard
        SONARQUBE_ENV  = 'SonarQubeServer'         
        SONARQUBE_HOST_URL = 'https://sonar.jdevhub.com'  
        
        // Docker 
        DOCKER_REGISTRY_URL ="nexus.jdevhub.com"        
        DOCKER_REGISTRY_CREDENTIALS_ID ='nexus-creds'  

        // 
         NPM_CREDENTIALS_ID = 'nexus-creds' // Jenkins credentials (token or base64 auth)
         NPM_REGISTRY_URL = 'nexus.jdevhub.com/repository/npm-registry/' // Replace with your Nexus repo URL
         CHROME_BIN = '/usr/bin/google-chrome'
        // set Kubernetes config
        PROD_KUBECONFIG_CREDENTIAL_ID='prod-kubeconfig-creds'              
        PPROD_KUBECONFIG_CREDENTIAL_ID='dev-kubeconfig-creds'
    }

    tools {
        nodejs 'node-v22'
    }

    stages {
        stage('Init') {
            steps {
                script { env.BUILD_TIME = System.currentTimeMillis().toString() }
            }
        }

        stage('Extract Project props') {
            steps {
                script {
                    env.ARTIFACT_ID = sh(script: "node -p \"require('./package.json').name\"", returnStdout: true).trim()
                    env.VERSION     = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()

                    echo "📦 ARTIFACT_ID: ${env.ARTIFACT_ID}"
                    echo "🏷️ VERSION: ${env.VERSION}"
                }
            }
        }

        stage('Checkout') {
            steps {
                echo "📥 Clonage de la branche : ${params.BRANCH_TO_BUILD}"
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/${params.BRANCH_TO_BUILD}"]],
                    userRemoteConfigs: [[
                        url: "${env.GIT_REPO_URL}",
                        credentialsId: "${env.GITHUB_CREDENTIALS_ID}"
                    ]]
                ])
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'rm -rf node_modules package-lock.json'                
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh """
                        sonar-scanner \
                        -Dsonar.projectKey=${env.ARTIFACT_ID}-${env.VERSION} \
                        -Dsonar.projectName=${env.ARTIFACT_ID}-${env.VERSION} \
                        -Dsonar.projectVersion=${env.VERSION} \
                        -Dsonar.projectBaseDir=. \
                        -Dsonar.sources=src \
                        -Dsonar.language=ts \
                        -Dsonar.exclusions=**/*.spec.ts,**/node_modules/** \
                        -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
                        -Dsonar.host.url=${SONARQUBE_HOST_URL}
                    """
                }
            }
        }

        stage('Build Angular app') {
          
                steps {    

                    script {
                     // Check the branch and set the correct build configuration
                    def config
                    if (params.BRANCH_TO_BUILD == 'preproduction') {
                       config = 'preproduction'
                    } else{  
                        config = 'production'    
                    }
                   
                    sh " npm run build -- --configuration=${config} "

                    }
                }
        }
        

        stage('Build and Push Docker Image') {
             when { anyOf { expression { params.BRANCH_TO_BUILD in ['preproduction','production'] } } }
            steps {
                script {

                    def configuration  = (params.BRANCH_TO_BUILD == 'preproduction') ? 'preproduction' : 'production'
                    echo "🐳 Build & Push Docker Image ${env.ARTIFACT_ID}:${env.VERSION}"

                    sh """
                        docker build --no-cache \
                        --build-arg ARTIFACT_ID=${env.ARTIFACT_ID} \
                        --build-arg VERSION=${env.VERSION} \
                        --build-arg CONFIGURATION=${configuration} \
                        --label build_time=${env.BUILD_TIME} \
                        -t ${DOCKER_REGISTRY_URL}/${env.ARTIFACT_ID}:${env.VERSION} .
                    """

                    sh "docker tag ${DOCKER_REGISTRY_URL}/${env.ARTIFACT_ID}:${env.VERSION} ${DOCKER_REGISTRY_URL}/${env.ARTIFACT_ID}:latest"

                    withCredentials([usernamePassword(credentialsId: DOCKER_REGISTRY_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo \$DOCKER_PASS | docker login ${DOCKER_REGISTRY_URL} -u \$DOCKER_USER --password-stdin"
                    }

                    sh "docker push ${DOCKER_REGISTRY_URL}/${env.ARTIFACT_ID}:${env.VERSION}"
                    sh "docker push ${DOCKER_REGISTRY_URL}/${env.ARTIFACT_ID}:latest"
                    sh "docker logout ${DOCKER_REGISTRY_URL}"

                     // Supprimer les images locales après push
		            sh "docker rmi -f ${DOCKER_REGISTRY_URL}/${env.ARTIFACT_ID}:${env.VERSION}"
		            sh "docker rmi -f ${DOCKER_REGISTRY_URL}/${env.ARTIFACT_ID}:latest"
		            sh "docker image prune -a -f"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            when { anyOf { expression { params.BRANCH_TO_BUILD in ['preproduction','production'] } } }
            steps {
                script {
                    def kubeCred = (params.BRANCH_TO_BUILD == 'production') ? env.PROD_KUBECONFIG_CREDENTIAL_ID : env.PPROD_KUBECONFIG_CREDENTIAL_ID
                    def profile  = (params.BRANCH_TO_BUILD == 'production') ? 'prod' : 'dev'
                    def host     = (params.BRANCH_TO_BUILD == 'production') ? '172.16.0.40' : '172.16.0.30'

                    withCredentials([file(credentialsId: kubeCred, variable: 'KUBECONFIG')]) {
                        sh """
                            export SPRING_PROFILES_ACTIVE=${profile}
                            export INGRESS_HOST=${host}

                            # Supprime la ressource si elle existe, ignore si pas trouvée
                            envsubst < k8s/deployment.yaml | kubectl delete -f - --ignore-not-found

                            # Applique le YAML
                            envsubst < k8s/deployment.yaml | kubectl apply -f -
                        """
                    }
                }
            }
        }
    }

    post {
        always { echo "🏁 Pipeline terminé pour ${params.BRANCH_TO_BUILD}" }
        success { echo "✅ Pipeline réussi pour ${params.BRANCH_TO_BUILD}" }
        failure { echo "❌ Pipeline échoué pour ${params.BRANCH_TO_BUILD}" }
    }
}
