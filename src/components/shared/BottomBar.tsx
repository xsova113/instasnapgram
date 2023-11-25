import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";

export const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {sidebarLinks.map((link) => (
        <NavLink
          to={link.route}
          key={link.label}
          className={({ isActive }) =>
            cn("flex-center flex-col gap-1 p-2 transition", {
              "bg-primary-500 rounded-[10px]": isActive,
            })
          }
        >
          <img
            src={link.imgURL}
            alt={link.label}
            width={16}
            height={16}
            className={cn({
              "invert-white": pathname === link.route,
            })}
          />
          <p className="tiny-medium text-light-2">{link.label}</p>
        </NavLink>
      ))}
    </section>
  );
};
