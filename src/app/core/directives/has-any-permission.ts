import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../components/auth/services/auth.service';


@Directive({
  selector: '[hasAnyPermission]' // Selector for the directive
})
export class HasAnyPermissionDirective implements OnChanges {

  @Input() hasAnyPermission: string[] = []; // An array of permissions to check

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //if (changes.hasAnyPermission) {
    //  this.updateView();
    //}
    this.updateView();
  }

  private updateView() {
    // Clear previous content
    this.viewContainer.clear();

    // Check if the user has any of the permissions
    if (this.authService.hasAnyPermission(this.hasAnyPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
