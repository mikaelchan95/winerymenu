import React from 'react';
import { Home, Star, Clock, User } from 'lucide-react';

type TabType = 'menu' | 'orders';</action>

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'menu' as TabType, label: 'Menu', icon: Home },
  { id: 'orders' as TabType, label: 'Orders', icon: Clock },
];

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white border-t border-gray-200 px-6 py-2 flex-shrink-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center space-x-0">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex flex-col items-center justify-center py-3 px-8 min-w-[80px] transition-colors
                  ${isActive 
                    ? 'text-black' 
                    : 'text-gray-400 hover:text-gray-600'
                  }
                `}
              >
                <IconComponent size={24} />
                <span className="text-xs font-medium mt-1">{tab.label}</span>
                {isActive && (
                  <div className="w-4 h-0.5 bg-black rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};