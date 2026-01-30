export interface NavbarItem {
  path : string;
  label: string;
  icon?: string;
  route?: string;
  externalUrl?: string;
  divider?: boolean;
  children?: NavbarItem[];
}
