export interface PageProps {
  marketplace: any;
  nft: any;
}

export interface MyListedItemsProps extends PageProps {
  account: string;
}

export interface CreatorDashboardProps extends PageProps {
  account: string;
  profileImage: string;
  setProfileChoice: (arg0: string) => void;
}
