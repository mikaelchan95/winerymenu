import React, { useState } from 'react';
import { Clock, Users, ChefHat, RotateCcw, Eye, Trash2, CheckCircle, AlertCircle, X } from 'lucide-react';
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

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={14} className="text-blue-500" />;
      case 'preparing':
        return <ChefHat size={14} className="text-orange-500" />;
      case 'ready':
        return <AlertCircle size={14} className="text-green-500" />;
      case 'completed':
        return <CheckCircle size={14} className="text-gray-500" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'completed':
        return 'Done';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'preparing':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'ready':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'completed':
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const formatOrderTime = (timestamp: Date) => {
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return orderTime.toLocaleDateString();
    }
  };

  const handleSwipeStart = (orderId: string) => {
    setSwipedOrderId(orderId);
  };

  const handleSwipeEnd = () => {
    setTimeout(() => setSwipedOrderId(null), 300);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Clock size={32} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-600 mb-2">No Order History</h2>
        <p className="text-gray-500 text-sm">Your completed orders will appear here</p>
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-apple">
          <Clock size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Order History</h1>
          <p className="text-gray-500 mt-1">{orders.length} {orders.length === 1 ? 'order' : 'orders'} • This device only</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Main Order Content */}
            <div
              className={`relative p-6 transition-transform duration-300 ${
                swipedOrderId === order.id ? 'transform -translate-x-20' : ''
              }`}
              onTouchStart={() => handleSwipeStart(order.id)}
              onTouchEnd={handleSwipeEnd}
              onMouseDown={() => handleSwipeStart(order.id)}
              onMouseUp={handleSwipeEnd}
            >
              {/* Header Row - Fixed Layout */}
              <div className="flex items-start gap-4 mb-4">
                {/* Left: Order Info */}
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-gray-900 text-sm">#{order.orderNumber.slice(-3)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        Order #{order.orderNumber}
                      </h3>
                      <div className={`px-2 py-1 rounded-lg text-xs font-medium border flex-shrink-0 ${getStatusColor(order.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                      <span className="flex-shrink-0">{formatOrderTime(order.timestamp)}</span>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <Users size={14} />
                        <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right: Price */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</div>
                  {order.estimatedTime && order.status === 'preparing' && (
                    <div className="text-sm text-orange-600 font-medium whitespace-nowrap">
                      ~{order.estimatedTime} min
                    </div>
                  )}
                </div>
              </div>

              {/* Items Preview - Fixed Layout */}
              <div className="mb-4 bg-gray-50 rounded-xl p-4">
                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-start gap-4">
                      <span className="text-sm text-gray-700 flex-1 min-w-0">
                        <span className="font-medium">{item.quantity}×</span> 
                        <span className="truncate ml-1">{item.menuItem.name}</span>
                      </span>
                      <span className="text-sm font-medium text-gray-900 flex-shrink-0">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="text-xs text-gray-500 pt-1 border-t border-gray-200">
                      +{order.items.length - 2} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Actions - Fixed Layout */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedOrder(order)}
                  aria-label={`View details for order ${order.orderNumber}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors duration-150 flex-shrink-0"
                >
                  <Eye size={14} />
                  <span>Details</span>
                </button>
                
                <button
                  onClick={() => onReorder(order)}
                  aria-label={`Reorder items from order ${order.orderNumber}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-colors duration-150 flex-shrink-0"
                >
                  <RotateCcw size={14} />
                  <span>Reorder</span>
                </button>
              </div>
            </div>

            {/* Swipe Actions */}
            <div className={`absolute top-0 right-0 h-full flex items-center transition-opacity duration-300 ${
              swipedOrderId === order.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              <button
                onClick={() => onDeleteOrder(order.id)}
                aria-label={`Delete order ${order.orderNumber}`}
                className="h-full px-6 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors duration-150"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
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

// Order Detail Modal Component
interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onReorder: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose, onReorder }) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1 pr-4">
              <h2 className="text-2xl font-bold text-gray-900 truncate">Order #{order.orderNumber}</h2>
              <p className="text-gray-500 mt-1">
                {new Date(order.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close order details"
              className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-150 flex items-center justify-center flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 truncate">{item.menuItem.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.menuItem.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    <div className="font-semibold text-gray-900">${item.totalPrice.toFixed(2)}</div>
                  </div>
                </div>
                
                {Object.keys(item.customizations).length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Customizations:</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      {Object.entries(item.customizations).map(([key, values]) => (
                        <div key={key} className="truncate">
                          {values.join(', ')}
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
        <div className="px-6 pb-6">
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Bill Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Charge (10%)</span>
                <span className="font-medium">${order.serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (9%)</span>
                <span className="font-medium">${order.gst.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              aria-label="Close order details"
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors duration-150"
            >
              Close
            </button>
            <button
              onClick={onReorder}
              aria-label="Reorder these items"
              className="flex-1 px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-medium transition-colors duration-150"
            >
              Reorder Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};