import { BigNumberish } from "ethers";

export interface NavItemType {
  title: string;
  url: string;
  icon: string;
  onClick?: (tex: string) => void;
}

export interface SidebarProps {
  walletAddress: string | null;
  profileImage: string;
}

export interface SpinnerProps {
  label: string;
}

export interface NFTProps {
  image: string;
  name: string;
  description: string;
  price: BigNumberish;
  onClick: () => void;
}

export interface UserAnnouncementProps {
  text: string;
}

export interface HeadlineProps {
  text: string;
  description: string;
}
