import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-competences',
  imports: [CommonModule],
  templateUrl: './competences.component.html',
  styleUrl: './competences.component.css'
})
export class CompetencesComponent {

  currentIndex = 0;

 competences = [
   { 
      icon:'bi-laptop',
      titre: 'Frontend & Frameworks', 
      technologies: "JSP, JSF, MyFaces, PrimeFaces, Spring MVC, Struts, Angular, RxJS, NgRx, Material Design, TailwindCSS, Bootstrap, HTML, CSS, XML, JavaScript, JQuery, Ajax, Signals",
    },
    { 
      icon:'bi-server',
      titre: 'Backend & Frameworks', 
      technologies: "JSP, JSF, MyFaces, PrimeFaces, Spring MVC, Struts, Angular, RxJS, NgRx, Material Design, TailwindCSS, Bootstrap, HTML, CSS, XML, JavaScript, JQuery, Ajax, Signals",
    },
   
    { 
      icon:'bi-diagram-3',
      titre: 'Architecture & Design', 
      technologies: "Hexagonale, Microservices, Event-Driven, Monolithique, N-tiers, CQRS, CQS, DDD, SOLID, Clean Architecture, MVC, MVP",
    },
    { 
      icon:'bi-kanban',
      titre: 'Message Brokers', 
      technologies: "JMS, RabbitMQ, Apache Kafka, ZooKeeper",
    },
    { 
      icon:'bi-hdd-network',
      titre: 'Serveurs Applicatifs', 
      technologies: "NGINX, HTTPD, Jonas, Jetty, Apache Tomcat, JBoss, WebLogic, WebSphere",
    },
    { 
      icon:'bi-gear-fill',
      titre: 'DevOps', 
      technologies: "CI/CD, GitLab CI, Jenkins, SonarQube, Nexus, Docker, Kubernetes, OpenShift, Terraform, Ansible, Vault, Control-M, Grafana, Prometheus, Fortify, Grype, Maven, Ant, SVN, Git",
    },
    { 
      icon:'bi-cloud',
      titre: 'Cloud', 
      technologies: "AWS (EC2, S3, Lambda, API Gateway), Azure, GCP, Oracle ERP Cloud",
    },
    { 
      icon:'bi-database',
      titre: 'Bases de Données', 
      technologies: "MySQL, MariaDB, PostgreSQL, Oracle, SQL Server, DB2, MongoDB, Elasticsearch, H2",
    },
    { 
      icon:'bi-shield-lock',
      titre: 'Sécurité', 
      technologies: "Spring Security, OAuth2, JWT, Keycloak, LDAP, DevSecOps, gestion des certificats, signature électronique",
    },

    { 
      icon:'bi-check2-square',
      titre: 'Tests & QA', 
      technologies: " Spring Test, JUnit, Mockito, TestNG, Selenium, FitNesse, Cucumber, JMeter, TDD",
    },
    { 
      icon:'bi-window',
      titre: 'Environnements & OS', 
      technologies: " CentOS, Red Hat, VMware, KVM, Windows",
    },
    { 
      icon:'bi-people',
      titre: 'Outils collaboratifs', 
      technologies: "Jira, Confluence, Mantis Bug Tracker, RoundCube, Teams",
    },

 ];
 

  
// Move to the next project
  next() {
    if (this.currentIndex < this.competences.length - 1) {
      this.currentIndex++;
    }
  }

  // Move to the previous project
  prev() {
    if (this.currentIndex > 0) {
       this.currentIndex--;
    }
  }
}
