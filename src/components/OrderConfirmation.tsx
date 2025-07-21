import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, MapPin, Sparkles, Star } from 'lucide-react';

interface OrderConfirmationProps {
  orderNumber: string;
  totalAmount: number;
  onClose: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ 
  orderNumber, 
  totalAmount, 
  onClose 
}) => {
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);

    // Progress bar animation
    const timer = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 100));
    }, 50);

    // Auto close after 6 seconds
    const autoClose = setTimeout(() => {
      onClose();
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoClose);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300 safe-area-all">
      <div className="bg-white rounded-3xl p-8 text-center max-w-md w-full animate-in zoom-in duration-500 relative overflow-hidden mt-safe-area mb-safe-area">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Success Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-700 delay-200">
            <CheckCircle size={40} className="text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-gray-200 rounded-full mx-auto animate-pulse opacity-30"></div>
          {showConfetti && (
            <Star size={20} className="absolute -top-2 -right-2 text-yellow-500 animate-pulse" />
          )}
        </div>
        
        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your delicious order is being prepared
        </p>
        
        {/* Order Details */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
          <div className="grid gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Order Number</span>
              <span className="font-mono font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border">
                #{orderNumber}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Total Amount</span>
              <span className="font-bold text-gray-900 text-lg">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Status Information */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-center space-x-3 text-gray-600">
            <Clock size={18} className="text-orange-500" />
            <span className="text-sm font-medium">Estimated time: 15-20 minutes</span>
          </div>
          
          <div className="flex items-center justify-center space-x-3 text-gray-600">
            <MapPin size={18} className="text-blue-500" />
            <span className="text-sm font-medium">Table service • Stay seated</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Order confirmed</span>
            <span>Preparing...</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-black to-gray-700 h-full transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Continue Button */}
        <button
          onClick={onClose}
          aria-label="Continue browsing menu"
          className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-150 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          Continue Browsing
        </button>
        
        {/* Auto close indicator */}
        <p className="text-xs text-gray-400 mt-4">
          This message will close automatically
        </p>
      </div>
    </div>
  );
};