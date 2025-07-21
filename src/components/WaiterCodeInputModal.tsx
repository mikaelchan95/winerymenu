import React, { useState, useRef, useEffect } from 'react';
import { X, Lock, CheckCircle, AlertCircle, User } from 'lucide-react';

interface WaiterCodeInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalAmount: number;
  itemCount: number;
}

const WAITER_CODE = "WAITER123"; // TODO: Make this configurable

export const WaiterCodeInputModal: React.FC<WaiterCodeInputModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  itemCount
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      // Reset state when modal closes
      setCode('');
      setError('');
      setIsValidating(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter waiter code');
      return;
    }

    setIsValidating(true);
    setError('');
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (code.toUpperCase() === WAITER_CODE) {
      setIsSuccess(true);
      // Show success state briefly before confirming
      setTimeout(() => {
        onConfirm();
      }, 600);
    } else {
      setError('Invalid waiter code. Please try again.');
      setCode('');
      setIsValidating(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setCode(value);
    if (error) setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300 safe-area-all">
      <div className="bg-white rounded-3xl p-8 text-center max-w-md w-full animate-in zoom-in duration-500 relative overflow-hidden mt-safe-area mb-safe-area">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close waiter code input"
          className="absolute top-4 right-4 w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className={`
            w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300
            ${isSuccess 
              ? 'bg-green-600 scale-110' 
              : 'bg-black'
            }
          `}>
            {isSuccess ? (
              <CheckCircle size={32} className="text-white animate-in zoom-in duration-300" />
            ) : (
              <User size={32} className="text-white" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isSuccess ? 'Order Confirmed!' : 'Waiter Confirmation Required'}
          </h2>
          
          <p className="text-gray-600">
            {isSuccess 
              ? 'Order has been successfully confirmed'
              : 'Please enter your waiter code to confirm this order'
            }
          </p>
        </div>

        {!isSuccess && (
          <>
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Items</span>
                <span className="font-semibold text-gray-900">{itemCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Total Amount</span>
                <span className="font-bold text-gray-900 text-lg">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Code Input Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="Enter waiter code"
                  className={`
                    w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-150 text-center font-mono text-lg font-semibold uppercase tracking-wider
                    ${error 
                      ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400' 
                      : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10'
                    }
                  `}
                  disabled={isValidating}
                  maxLength={20}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div 
                  id="code-error"
                  role="alert"
                  aria-live="polite"
                  className="flex items-center space-x-2 p-3 bg-red-50 rounded-xl border border-red-100 animate-in zoom-in duration-200"
                >
                  <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                  <span className="text-sm text-red-700 font-medium">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!code.trim() || isValidating}
                aria-label="Confirm order with waiter code"
                aria-label="Waiter code"
                aria-describedby={error ? "code-error" : undefined}
                className={`
                  w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-150 transform active:scale-95 min-h-[56px] flex items-center justify-center space-x-2
                  ${!code.trim() || isValidating
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800 text-white hover:scale-[1.02] shadow-lg hover:shadow-xl'
                  }
                `}
              >
                {isValidating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    <span>Validating...</span>
                  </>
                ) : (
                  <span>Confirm Order</span>
                )}
              </button>
            </form>

            {/* Help Text */}
            <p className="text-xs text-gray-400 mt-4">
              Only authorized staff can confirm orders
            </p>
          </>
        )}

        {/* Success State */}
        {isSuccess && (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-600" role="status" aria-live="polite">
              <CheckCircle size={20} />
              <span className="font-medium">Order successfully confirmed</span>
            </div>
            
            <div className="w-full bg-green-100 rounded-2xl p-3">
              <div className="bg-green-600 h-2 rounded-full animate-pulse" />
            </div>
            
            <p className="text-sm text-gray-500">
              Processing order confirmation...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};