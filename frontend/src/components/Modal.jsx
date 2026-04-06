import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40 backdrop-blur-sm">
      <div className="relative p-4 w-full max-w-2xl">
        <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-100 rounded-t-xl shrink-0">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <button type="button"
              className="text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 rounded-lg text-sm w-9 h-9 flex justify-center items-center transition-colors duration-200 cursor-pointer"
              onClick={onClose}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-y-auto p-5 md:p-6 text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;