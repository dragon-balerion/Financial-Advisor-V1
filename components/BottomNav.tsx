import React from 'react';
import { Page } from '../types';

interface BottomNavProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const DashboardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const AccountIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
    const navItems: { page: Page; label: string; icon: React.FC<{className?: string}> }[] = [
        { page: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
        { page: 'account', label: 'Account', icon: AccountIcon },
    ];
    
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-around h-16">
                    {navItems.map(item => {
                        const isActive = currentPage === item.page;
                        return (
                            <button
                                key={item.page}
                                onClick={() => onNavigate(item.page)}
                                className={`flex flex-col items-center justify-center w-full text-sm font-medium transition-colors duration-200 ${
                                    isActive ? 'text-teal-400' : 'text-gray-400 hover:text-white'
                                }`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <item.icon className="h-6 w-6 mb-1" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default BottomNav;