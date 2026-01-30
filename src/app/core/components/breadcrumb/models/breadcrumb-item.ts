export interface BreadcrumbItem {
  label?: string;
  icon?: string;
  route?: string;
  children?: BreadcrumbItem[];
  divider?: boolean;
}
