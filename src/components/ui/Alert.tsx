import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface AlertProps {
  type: "success" | "error" | "warning";
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Alert({ type, message, isVisible, onClose }: AlertProps) {
  // Auto close diperlama jadi 4 detik agar user puas membacanya
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: "bg-white border-l-4 border-green-500 text-gray-800",
    error: "bg-white border-l-4 border-red-500 text-gray-800",
    warning: "bg-white border-l-4 border-yellow-500 text-gray-800",
  };

  const icons = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    warning: <AlertTriangle className="text-yellow-500" size={24} />,
  };

  return (
    <div className={`fixed top-6 right-6 z-[9999] flex items-center gap-4 px-6 py-4 rounded-r-lg shadow-2xl min-w-[320px] max-w-md animate-in slide-in-from-right-10 fade-in duration-300 ${styles[type]}`}>
      <div className="shrink-0">
        {icons[type]}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm uppercase tracking-wider mb-0.5 opacity-60">
          {type === 'success' ? 'Berhasil' : type === 'error' ? 'Gagal' : 'Perhatian'}
        </h4>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
      >
        <X size={18} />
      </button>
    </div>
  );
}