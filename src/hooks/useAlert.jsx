import React, { useState } from "react";
import { IoMdWarning } from "react-icons/io";

const useAlert = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 1000); // 5초 후 자동으로 닫힘
  };

  const Alert = () => {
    return isAlertOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-70" />
        <div className="relative w-120 h-40 flex items-center justify-center bg-white text-black p-6 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out animate-fade-in">
          <div className="flex flex-col items-center">
            <IoMdWarning className="text-yellow-400 text-3xl mr-2 w-[60px] h-[60px] mb-6" />
            <div>{alertMessage}</div>
          </div>
        </div>
      </div>
    ) : null;
  };

  return { showAlert, Alert };
};

export default useAlert;
