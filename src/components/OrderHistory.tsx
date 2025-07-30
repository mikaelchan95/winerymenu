import React, { useState } from 'react';
import { Clock, Users, ChefHat, RotateCcw, Eye, Trash2, CheckCircle, AlertCircle, X, Receipt, MapPin, Star } from 'lucide-react';
import { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  onReorder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ 
  orders, 
  onReorder, 
  onDeleteOrder 
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [swipedOrderId, setSwipedOrderId] = useState<string | null>(null);

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <CheckCircle size={16} className="text-blue-500" />,
          text: 'Confirmed',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          dotColor: 'bg-blue-500'
        };
      case 'preparing':
        return {
          icon: <ChefHat size={16} className="text-orange-500" />,
          text: 'Preparing',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700',
          borderColor: 'border-orange-200',
          dotColor: 'bg-orange-500'
        };
      case 'ready':
        return {
          icon: <AlertCircle size={16} className="text-green-500" />,
          text: 'Ready',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
          dotColor: 'bg-green-500'
        };
      case 'completed':
        return {
          icon: <CheckCircle size={16} className="text-gray-500" />,
          text: 'Completed',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200',
          dotColor: 'bg-gray-400'
        };
    }
  };

  const formatOrderTime = (timestamp: Date) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      if (days === 1) return 'Yesterday';
      return `${days} days ago`;
    }
  };

  const formatFullDate = (timestamp: Date) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSwipeStart = (orderId: string) => {
    setSwipedOrderId(orderId);
  };

  const handleSwipeEnd = () => {
    setTimeout(() => setSwipedOrderId(null), 300);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Clock size={36} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Orders Yet</h2>
          <p className="text-gray-500 leading-relaxed mb-6">Your order history will appear here once you place your first order.</p>
          <p className="text-sm text-gray-400">Start browsing our delicious menu!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
            <Clock size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Order History</h1>
            <p className="text-gray-500 mt-1">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'} • Saved on this device
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{orders.length}</div>
            <div className="text-sm text-gray-500">Total Orders</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(0)}
            </div>
            <div className="text-sm text-gray-500">Total Spent</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
            </div>
            <div className="text-sm text-gray-500">Items Ordered</div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => {
          const statusConfig = getStatusConfig(order.status);
          const isRecent = index < 3;
          
          return (
            <div
              key={order.id}
              className={`relative bg-white rounded-3xl border-2 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${
                isRecent ? 'border-gray-200 shadow-sm' : 'border-gray-100'
              }`}
            >
              {/* Main Order Content */}
              <div
                className={`relative transition-transform duration-300 ${
                  swipedOrderId === order.id ? 'transform -translate-x-20' : ''
                }`}
                onTouchStart={() => handleSwipeStart(order.id)}
                onTouchEnd={handleSwipeEnd}
                onMouseDown={() => handleSwipeStart(order.id)}
                onMouseUp={handleSwipeEnd}
              >
                <div className="p-6">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1 min-w-0">
                      {/* Order Number Badge */}
                      <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="font-bold text-white text-sm">#{order.orderNumber.slice(-3)}</span>
                      </div>
                      
                      {/* Order Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 text-lg truncate">
                            Order #{order.orderNumber}
                          </h3>
                          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex-shrink-0 flex items-center space-x-1.5 ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor}`}>
                            <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor} animate-pulse`} />
                            {statusConfig.icon}
                            <span>{statusConfig.text}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                          <div className="flex items-center space-x-1.5 flex-shrink-0">
                            <Clock size={14} />
                            <span className="font-medium">{formatOrderTime(order.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 flex-shrink-0">
                            <Users size={14} />
                            <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                          </div>
                          {order.estimatedTime && order.status === 'preparing' && (
                            <div className="flex items-center space-x-1.5 text-orange-600 flex-shrink-0 bg-orange-50 px-2 py-1 rounded-lg">
                              <ChefHat size={14} />
                              <span className="font-medium">~{order.estimatedTime} min</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="text-2xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">incl. tax</div>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="space-y-3">
                      {order.items.slice(0, 3).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="bg-white text-gray-700 text-xs font-bold px-2 py-1 rounded-lg border">
                                {item.quantity}×
                              </span>
                              <span className="font-medium text-gray-900 truncate">{item.menuItem.name}</span>
                            </div>
                            {Object.keys(item.customizations).length > 0 && (
                              <div className="text-xs text-gray-500 ml-8 truncate">
                                {Object.values(item.customizations).flat().slice(0, 2).join(', ')}
                                {Object.values(item.customizations).flat().length > 2 && '...'}
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                            ${item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="text-center py-2 border-t border-gray-200">
                          <span className="text-xs text-gray-500 font-medium">
                            +{order.items.length - 3} more items
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      aria-label={`View details for order ${order.orderNumber}`}
                      className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all duration-150 flex-shrink-0 active:scale-95"
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                    
                    <button
                      onClick={() => onReorder(order)}
                      aria-label={`Reorder items from order ${order.orderNumber}`}
                      className="flex items-center space-x-2 px-6 py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all duration-150 flex-1 justify-center active:scale-95 shadow-sm"
                    >
                      <RotateCcw size={16} />
                      <span>Reorder • ${order.totalAmount.toFixed(2)}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Swipe Delete Action */}
              <div className={`absolute top-0 right-0 h-full flex items-center transition-opacity duration-300 ${
                swipedOrderId === order.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <button
                  onClick={() => onDeleteOrder(order.id)}
                  aria-label={`Delete order ${order.orderNumber}`}
                  className="h-full px-8 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors duration-150"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onReorder={() => {
            onReorder(selectedOrder);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

// Enhanced Order Detail Modal Component
interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onReorder: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose, onReorder }) => {
  const statusConfig = (() => {
    switch (order.status) {
      case 'confirmed':
        return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'preparing':
        return { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
      case 'ready':
        return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      case 'completed':
        return { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
    }
  })();

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        {/* Header */}
        <div className="relative p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <button
            onClick={onClose}
            aria-label="Close order details"
            className="absolute top-6 right-6 w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-150 flex items-center justify-center active:scale-95"
          >
            <X size={20} />
          </button>
          
          <div className="pr-16">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="font-bold text-white text-sm">#{order.orderNumber.slice(-3)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Order #{order.orderNumber}</h2>
                <p className="text-gray-500 mt-1">
                  {new Date(order.timestamp).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold border ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
              <div className={`w-2 h-2 rounded-full ${statusConfig.color.replace('text-', 'bg-')} animate-pulse`} />
              <span>Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[60vh]">
          {/* Items List */}
          <div className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Receipt size={24} className="text-gray-600" />
              <h3 className="text-xl font-bold text-gray-900">Order Items</h3>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex justify-between items-start gap-6 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-white text-gray-700 text-sm font-bold px-3 py-1.5 rounded-lg border shadow-sm">
                          {item.quantity}×
                        </span>
                        <h4 className="font-bold text-gray-900 text-lg truncate">{item.menuItem.name}</h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                        {item.menuItem.description}
                      </p>
                      <div className="text-sm text-gray-500">
                        ${(item.totalPrice / item.quantity).toFixed(2)} each
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl font-bold text-gray-900">${item.totalPrice.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  {Object.keys(item.customizations).length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Customizations:</h5>
                      <div className="space-y-1">
                        {Object.entries(item.customizations).map(([key, values]) => (
                          <div key={key} className="text-sm text-gray-600">
                            <span className="font-medium">{key}:</span> {values.join(', ')}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bill Breakdown */}
          <div className="px-8 pb-8">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin size={20} className="text-gray-600" />
                <h3 className="text-lg font-bold text-gray-900">Bill Summary</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span>Service Charge (10%)</span>
                  <span className="font-semibold">${order.serviceCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span>GST (9%)</span>
                  <span className="font-semibold">${order.gst.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-8 border-t border-gray-100 bg-gray-50">
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              aria-label="Close order details"
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl font-semibold transition-all duration-150 active:scale-95"
            >
              Close
            </button>
            <button
              onClick={onReorder}
              aria-label="Reorder these items"
              className="flex-2 px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-2xl font-semibold transition-all duration-150 flex items-center justify-center space-x-2 active:scale-95 shadow-lg"
            >
              <RotateCcw size={18} />
              <span>Reorder for ${order.totalAmount.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};