import NavItem from "./NavItem";
import { NAV_ITEMS } from "../../utils";
import "../../styles/navigation.css";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 flex flex-col w-16 h-screen m-0 text-white bg-green-400">
      {NAV_ITEMS.map((navItem, idx) => (
        <NavItem
          title={navItem.title}
          url={navItem.url}
          icon={navItem.icon}
          key={idx}
        />
      ))}
    </div>
  );
};

export default Sidebar;
