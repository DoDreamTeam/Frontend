import React from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineAccessAlarms } from "react-icons/md";

const NotificationMenu = ({ notifications, closeMenu }) => {
  return (
    <div className="absolute right-0 top-10 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-2 border-b m-2">
        <span className="font-semibold">알람</span>
        <button
          onClick={closeMenu}
          className="text-gray-600 hover:text-gray-800 ml-2"
        >
          <FaTimes />
        </button>
      </div>
      <ul className="py-1">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
              notification.read ? "bg-transparent" : "bg-blue-100"
            }`}
          >
            <span className="mr-3">
              <MdOutlineAccessAlarms />
            </span>
            <div className="flex-1 m-3">
              <div className="flex justify-between items-center">
                <span className="mr-1 text-s">{notification.message}</span>
                <span className="text-xs text-gray-500">20시간 전</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationMenu;
