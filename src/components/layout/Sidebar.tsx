import NavItem from "./NavItem";
import { NAV_ITEMS, copyToClipboard } from "../../utils";
import { SidebarProps } from "../../types";
import "../../styles/navigation.css";

const Sidebar = ({ walletAddress, profileImage }: SidebarProps) => {
  return (
    <nav className="fixed top-0 left-0 flex flex-col w-16 h-screen m-0 text-white bg-cyan-100">
      {NAV_ITEMS.map((navItem, idx) => (
        <NavItem
          title={navItem.title}
          url={navItem.url}
          icon={navItem.icon}
          key={idx}
        />
      ))}
      <div className="mx-auto mt-auto mb-1">
        <NavItem
          icon={profileImage}
          title={walletAddress || ""}
          url={""}
          onClick={copyToClipboard}
          profile
        />
      </div>
    </nav>
  );
};

export default Sidebar;
