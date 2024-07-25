import { useEffect } from 'react';

export interface SnackBarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

const SnackBar = ({ message, isOpen, onClose, duration }: SnackBarProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-grey400 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {message}
    </div>
  );
};

export default SnackBar;
