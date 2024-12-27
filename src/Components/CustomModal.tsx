import { useState, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const CustomModal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded shadow-lg p-4 relative">
        {/* Modal Header */}
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

        {/* Modal Content */}
        <div>{children}</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-300 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
