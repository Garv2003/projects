import { Image, User } from "lucide-react";
import { JSX } from "react";
import {NavLink} from "react-router-dom";
const SideNav = (): JSX.Element => {
  const menuList = [
    {
      id: 1,
      name: "Home",
      href: "/",
      icon: Image,
    },
    {
      id: 2,
      name: "Profile",
        href: "/profile",
      icon: User,
    },
  ];

  return (
    <div className=" border shadow-sm h-screen">
      <div>
        {menuList.map((menu) => (
          <NavLink
            key={menu.id}
            to={menu.href}
            className="p-4 text-lg hover:bg-blue-100 cursor-pointer flex items-center hover:text-blue-500"
              // activeIndex === index ? "bg-blue-100 text-blue-500" : ""
          >
            <menu.icon size={24} className="mr-2" />
            {menu.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
