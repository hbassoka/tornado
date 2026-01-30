import { Directive, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../components/auth/services/auth.service';


@Directive({
  selector: '[isLoggedIn]'  // Directive selector
})
export class IsLoggedInDirective implements OnChanges {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateView();
  }

  private updateView() {
    // Clear the view
    this.viewContainer.clear();

    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      // If logged in, display the content
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
