import { Link } from "react-router-dom";
import { NavItemType } from "../../utils";

const NavItem = ({
  url,
  title,
  icon,
  onClick,
  profile = false,
}: NavItemType) => {
  return (
    <Link to={url || "#"}>
      <div className="sidebar-icon group" onClick={() => onClick?.(title)}>
        <img
          src={icon}
          alt={`${title} icon`}
          className={`w-8 h-8 ${profile ? "rounded-xl shadow-lg" : ""}`}
        />
        <span className="sidebar-tooltip group-hover:scale-100">{title}</span>
      </div>
    </Link>
  );
};

export default NavItem;
