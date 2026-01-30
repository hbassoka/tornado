import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../components/auth/services/auth.service';


@Directive({
  selector: '[hasAnyRole]' // Directive selector to use in templates
})
export class HasAnyRoleDirective implements OnChanges {

  @Input() hasAnyRole: string[] = []; // Expected to be an array of roles

  constructor(
    private templateRef: TemplateRef<any>,       // Access the template where the directive is applied
    private viewContainer: ViewContainerRef,     // Manipulate the view container (DOM)
    private authService: AuthService             // Inject AuthService to check roles
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //if (changes.hasAnyRole) {
    //  this.updateView();  // Re-run the check whenever the input changes
    //}
     this.updateView();  // Re-run the check whenever the input changes
    
  }

  private updateView() {
    // Clear previous content
    this.viewContainer.clear();

    // Check if the user has any of the provided roles
    if (this.authService.hasAnyRole(this.hasAnyRole)) {
      // Render the content if the user has at least one of the roles
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
