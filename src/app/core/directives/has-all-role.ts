import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../components/auth/services/auth.service';


@Directive({
  selector: '[hasAllRole]' // Multiple roles version
})
export class HasAllRoleDirective implements OnChanges {

  @Input() hasAllRole: string[] = []; // Expecting an array of roles

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //if (changes.hasAllRole) {
    //  this.updateView();
    //}
    this.updateView();
  }

  private updateView() {
    // Clear previous content
    this.viewContainer.clear();

    // Check if the user has all the required roles
    if (this.authService.hasAllRole(this.hasAllRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef); // Render the content if the user has all the roles
    }
  }
}
