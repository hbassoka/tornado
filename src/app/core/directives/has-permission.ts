import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../components/auth/services/auth.service';


@Directive({
  selector: '[hasPermission]' // Selector for the directive
})
export class HasPermissionDirective implements OnChanges {

  @Input() hasPermission: string = ''; // A single permission to check

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //if (changes.hasPermission) {
    //  this.updateView();
   // }

    this.updateView();
  }

  private updateView() {
    // Clear previous content
    this.viewContainer.clear();

    // Avoid rendering if permission is empty
    if (!this.hasPermission?.length) return;

    // Check if the user has the specified permission
    if (this.authService.hasPermission(this.hasPermission)) {
      // Render the content if the user has the permission
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
