export interface NavItemType {
  title: string;
  url: string;
  icon: string;
  onClick?: (tex: string) => void;
}

export interface SidebarProps {
  walletAddress: string | null;
}

export interface SpinnerProps {
  label: string;
}

export interface NFTProps {
  image: string;
  name: string;
  description: string;
  price: string;
  onClick: () => void;
}

export interface UserAnnouncementProps {
  text: string;
}
