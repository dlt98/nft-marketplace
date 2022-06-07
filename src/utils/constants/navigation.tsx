import { NavItemType } from "../index";
import {
  dashboard,
  home,
  marketplace,
  wallet,
} from "../../images/navigation/index";

export const NAV_ITEMS: NavItemType[] = [
  {
    title: "Home",
    url: "/",
    icon: home,
  },
  {
    title: "Sell digital asset",
    url: "/create-item",
    icon: marketplace,
  },
  {
    title: "My digital asset",
    url: "/my-assets",
    icon: wallet,
  },
  {
    title: "Creator dashboard",
    url: "/creator-dashboard",
    icon: dashboard,
  },
];
