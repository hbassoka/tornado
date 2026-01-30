import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../components/auth/services/auth.service';


@Directive({
  selector: '[hasRole]' // Adjusted to a single role check
})
export class HasRoleDirective implements OnChanges {

  @Input() hasRole: string = ''; // Expecting a single role here

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
   // if (changes.hasRole) {
    //  this.updateView();
    //}
    this.updateView();
  }

  private updateView() {
    // Clear previous content
    this.viewContainer.clear();

    // Avoid rendering if role is empty
    if (!this.hasRole?.length) return;

    // Check if the user has the role
    if (this.authService.hasRole(this.hasRole)) {
      // Render the content if the user has the role
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
