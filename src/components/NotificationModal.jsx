import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const NotificationModal = ({ isOpen, setIsOpen, type = "success", title, message, onConfirm }) => {
  const isSuccess = type === "success";
  const isWarning = type === "warning";
  
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsOpen(false);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className={`${
              isSuccess ? 'bg-gradient-to-br from-green-600 to-emerald-600' : 
              isWarning ? 'bg-gradient-to-br from-yellow-600 to-orange-600' :
              'bg-gradient-to-br from-red-600 to-rose-600'
            } text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden`}
          >
            {isSuccess ? (
              <CheckCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            ) : (
              <XCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            )}
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl grid place-items-center mx-auto">
                {isSuccess ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <XCircle className="text-red-600" />
                )}
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                {title}
              </h3>
              <p className="text-center mb-6">
                {message}
              </p>
              {isWarning && onConfirm ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleConfirm}
                    className="bg-white hover:opacity-90 transition-opacity text-gray-900 font-semibold flex-1 py-2 rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-white/20 hover:bg-white/30 transition-colors text-white font-semibold flex-1 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-gray-900 font-semibold w-full py-2 rounded"
                >
                  Got it!
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;