import { Directive, Input, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../components/auth/services/auth.service';


@Directive({
  selector: '[hasAllPermission]' // Selector for the directive
})
export class HasAllPermissionDirective implements OnChanges {

  @Input() hasAllPermission: string[] = []; // An array of permissions to check

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //if (changes.hasAllPermission) {
    //  this.updateView();
    //}

     this.updateView();
  }

  private updateView() {
    // Clear previous content
    this.viewContainer.clear();

    // Check if the user has all of the permissions
    if (this.authService.hasAllPermission(this.hasAllPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
