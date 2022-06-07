import { Link } from "react-router-dom";
import { NavItemType } from "../../utils";

const NavItem = ({ url, title, icon }: NavItemType) => {
  // const { asPath } = useRouter();

  const asPath = "";
  return (
    <Link to={url}>
      <div className="sidebar-icon group">
        <img src={icon} alt={`${title} icon`} className="w-8 h-8" />
        <span className="sidebar-tooltip group-hover:scale-100">{title}</span>
      </div>
    </Link>
  );
};

export default NavItem;
