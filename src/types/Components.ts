import { ActionMeta, SingleValue } from "react-select";
import { SingleAlertOption } from "./ItemTypes";
export interface NavItemType {
  title: string;
  url: string;
  icon: string;
  onClick?: (text: string) => void;
  profile?: boolean;
}

export interface SidebarProps {
  walletAddress: string | null;
  profileImage: string;
  ethPrice: number;
}

export interface SpinnerProps {
  label?: string;
}

export interface NFTProps {
  name: string;
  image: string;
  price: string;
  collection: string;
  description?: string;
  onClick: () => void;
  priceText?: string;
  buttonText?: string;
}

export interface UserAnnouncementProps {
  text: string;
}

export interface HeadlineProps {
  text: string;
  description: string;
}

export interface UserProfileSectionProps {
  profileImage: string;
  account: string;
  profileChoice: string;
  setProfileChoice: (
    newValue: SingleValue<string>,
    actionMeta: ActionMeta<string>
  ) => void;
}

export interface SelectProps {
  options: any;
  value: string;
  onChange: (
    newValue: SingleValue<string>,
    actionMeta: ActionMeta<string>
  ) => void;
}
export interface CopyProps {
  text: string;
  className: string;
  children: any;
  textRef: any;
}

export interface ButtonProps {
  text: string;
  onClick?: (arg0?: any) => void;
  href?: string;
  disabled?: boolean;
}

interface Input {
  placeholder: string;
  type: string;
  onChange: (e: any) => void;
  name: string;
}

export interface InputProps extends Input {}
export interface TextAreaProps extends Input {
  rows?: number;
  maxLength?: number;
}
export interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  image: string | null;
}
export interface LabelProps {
  title: string;
  description: string;
  required?: boolean;
}

export interface AlertProps {
  visible: boolean;
  setAlert: (arg0: boolean) => void;
  alertOption: SingleAlertOption;
  text: string;
}

export interface SingleStepProps {
  step: number;
  title: string;
  text: string;
  active: boolean;
  onClick: () => void;
}

export interface MintingButtonProps {
  nftImage: string;
  onClick: () => void;
}
