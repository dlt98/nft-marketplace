import { Link } from "react-router-dom";
import { NavItemType } from "../../utils";

const NavItem = ({ url, title, icon, onClick }: NavItemType) => {
  return (
    <Link to={url || "#"}>
      <div className="sidebar-icon group" onClick={() => onClick?.(title)}>
        <img src={icon} alt={`${title} icon`} className="w-8 h-8" />
        <span className="sidebar-tooltip group-hover:scale-100">{title}</span>
      </div>
    </Link>
  );
};

export default NavItem;
