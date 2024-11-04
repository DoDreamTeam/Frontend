import React, { useState } from "react";
import { IoMdWarning } from "react-icons/io";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";

const iconMapping = {
  success: (
    <AiOutlineCheckCircle className="text-green-400 text-3xl mr-2 w-[60px] h-[60px]" />
  ),
  error: (
    <RiErrorWarningLine className="text-red-400 text-3xl mr-2 w-[60px] h-[60px]" />
  ),
  warning: (
    <IoMdWarning className="text-yellow-400 text-3xl mr-2 w-[60px] h-[60px]" />
  ),
};

const useAlert = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("warning"); // Default type

  const showAlert = (message, type = "warning") => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 3000); // 3초 후 자동으로 닫힘
  };

  const Alert = () => {
    return isAlertOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-70" />
        <div className="relative w-120 h-40 flex items-center justify-center bg-white text-black p-6 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out animate-fade-in">
          <div className="flex flex-col items-center">
            {iconMapping[alertType]}
            <div>{alertMessage}</div>
          </div>
        </div>
      </div>
    ) : null;
  };

  return { showAlert, Alert };
};

export default useAlert;
