import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ModalLayout = ({ isOpen, setIsOpen, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md relative">
                    {children}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        <IoIosCloseCircleOutline onClick={() => setIsOpen(!isOpen)} size={25} className="absolute top-1 right-1 hover:text-red-500 cursor-pointer duration-500 z-50" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default ModalLayout;


