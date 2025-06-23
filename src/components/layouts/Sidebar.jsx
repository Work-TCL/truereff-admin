import { useNavigate } from "react-router-dom";
import { Home, Layers, UsersRound, Store, X } from "lucide-react";

const Sidebar = ({ setActive, isOpen, setIsOpen }) => {

  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <Home />, path: "/" },
    { name: "Categories", icon: <Layers />, path: "/categories" },
    { name: "Creators", icon: <UsersRound />, path: "/creators" },
    { name: "Brands", icon: <Store />, path: "/vendors" },
  ];

  const handleActive = (data) => {
    setActive(data?.name);
    navigate(data?.path);
    // Auto close on mobile after selecting a menu
    setIsOpen(false);
  };

  return (
    <aside
      className={`
          fixed top-0 left-0 h-full w-60 bg-gray-900 text-white p-4 z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
    >
        <div className="relative w-full p-4 text-primary-color font-bold text-4xl text-center">
          <img
            onClick={() => { }}
            width={25}
            height={25}
            src="/assets/images/truereff-white.svg"
            alt="TrueReff"
            className="md:w-auto md:max-w-[150px] w-auto max-w-[120px] mx-auto"
          />
        </div>
         <X
          className="block md:hidden absolute top-2 right-2 size-6 shrink-0 mr-0 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      <ul className="space-y-1 mt-3">
        {navItems.map((item) => {
          const isActive =
            item?.path === "/"
              ? window.location.pathname === "/"
              : window.location.pathname.startsWith(item?.path);
          return (
            <li
              key={item.name}
              className={`flex hover:bg-white ${isActive ? "bg-white text-black" : ""
                } items-center gap-3 cursor-pointer hover:text-black p-2 rounded-lg`}
              onClick={() => handleActive(item)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
export default Sidebar;
