import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, filter } from 'rxjs';

import { CommonModule } from '@angular/common';
import { BreadcrumbService } from './services/breadcrumb-service';
import { BreadcrumbItem } from './models/breadcrumb-item';



@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule,RouterLink],
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {

  private router = inject(Router);
  private breadcrumbService = inject(BreadcrumbService);

  private currentUrl = toSignal(
  this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map(e => e.urlAfterRedirects)
  ),
  { initialValue: this.router.url }
);

breadcrumbs = this.breadcrumbService.breadcrumbs;
/*
  breadcrumbs = computed<BreadcrumbItem[]>(() =>
    this.breadcrumbService.findBreadcrumbs(this.currentUrl())
  );
*/
  goBack() {
    const crumbs = this.breadcrumbs();
    const previous = crumbs.length > 1
      ? crumbs[crumbs.length - 2].route
      : null;

    if (previous) {
      this.router.navigate([previous]);
    }
  }

  //trackByLabel = (_: number, item: BreadcrumbItem) => item.label;
  trackByFn = (index: number, item: BreadcrumbItem) => item.route ?? `${item.label}-${index}`;

}
