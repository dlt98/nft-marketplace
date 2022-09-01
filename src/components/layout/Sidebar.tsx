import NavItem from "./NavItem";
import { NAV_ITEMS, copyToClipboard } from "../../utils";
import { SidebarProps } from "../../types";
import "../../styles/navigation.css";
import { ethereumIcon, bruno } from "../../images";

const Sidebar = ({ walletAddress, profileImage, ethPrice }: SidebarProps) => {
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
      <div className="w-5/6 h-[1px] bg-black mx-auto" />
      <NavItem title={"Minting"} url={"/minting"} icon={bruno} />
      <div className="mx-auto mt-auto mb-1">
        <div data-bs-toggle="modal" data-bs-target={`#ethModal`}>
          <NavItem
            icon={ethereumIcon}
            title={`ETH/USD Price: ${ethPrice || "loading..."}`}
            url={""}
            onClick={() => {}}
          />
        </div>
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
