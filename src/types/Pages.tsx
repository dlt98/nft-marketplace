import { ActionMeta, SingleValue } from "react-select";

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
  profileChoice: string;
  setProfileChoice: (
    newValue: SingleValue<string>,
    actionMeta: ActionMeta<string>
  ) => void;
}
