export interface NavItemType {
  title: string;
  url: string;
  icon: string;
  onClick?: (tex: string) => void;
}

export interface SidebarType {
  walletAddress: string | null;
}
