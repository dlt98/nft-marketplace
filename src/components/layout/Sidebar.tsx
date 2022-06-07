import NavItem from "./NavItem";
import { NAV_ITEMS, SidebarType, copyToClipboard } from "../../utils";
import "../../styles/navigation.css";
import { cryptoWallet } from "../../images/navigation";

const Sidebar = ({ walletAddress }: SidebarType) => {
  return (
    <div className="fixed top-0 left-0 flex flex-col w-16 h-screen m-0 text-white bg-cyan-100">
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
          icon={cryptoWallet}
          title={walletAddress || ""}
          url={""}
          onClick={copyToClipboard}
        />
      </div>
    </div>
  );
};

export default Sidebar;
