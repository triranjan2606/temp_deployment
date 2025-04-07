import React from "react";
import { MdDashboard } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const fields = [
    {
      name: "Dashboard",
      route: `dashboard`,
      icon: <MdDashboard />,
      isActive: currentPath.includes("dashboard"),
    },
    {
      name: "Manage",
      route: `manage`,
      icon: <MdManageAccounts />,
      isActive: currentPath.includes("manage"),
    },
  ];

  return (
    <>
      <div className="w-1/4 bg-white flex flex-col py-5">
        {fields.map((field,index) => (
          <>
            {field.isActive ? (
              <Link to={`${field.route}`} >
                <div className="w-full h-12 bg-blue-50 text-blue-800 border-r-2 border-blue-800 font-bold flex my-2  pr-2 pl-5 py-4 gap-2 items-center" key={index}>
                  <span className="text-2xl items-center ">{field.icon}</span>
                  {field.name}
                </div>
              </Link>
            ) : (
              <Link to={`${field.route}`}>
                <div className="w-full h-12 bg-white flex  my-2 rounded-r-md pr-2 pl-5 py-4  gap-2 items-center" key={index}>
                  <span className="text-2xl items-center ">{field.icon}</span>
                  {field.name}
                </div>
              </Link>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
