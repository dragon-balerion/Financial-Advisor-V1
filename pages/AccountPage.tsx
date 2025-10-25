import React from 'react';

interface AccountPageProps {
    onResetMonth: () => void;
    onResetAll: () => void;
}

const DangerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);


const AccountPage: React.FC<AccountPageProps> = ({ onResetMonth, onResetAll }) => {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-slide-in-bottom">
            <h2 className="text-3xl font-bold text-white">Account Settings</h2>

            <div className="bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-white mb-2">Data Management</h3>
                <p className="text-gray-400 mb-6">Manage your application data. These actions are irreversible.</p>
                
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div>
                            <p className="font-medium text-white">Reset Current Month</p>
                            <p className="text-sm text-gray-400">Clear all income and expenses for the current month.</p>
                        </div>
                        <button 
                            onClick={onResetMonth}
                            className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-semibold">
                            Reset Month
                        </button>
                    </div>

                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-700/50 rounded-lg border border-red-500/30">
                        <div>
                            <p className="font-medium text-red-400 flex items-center gap-2">
                                <DangerIcon className="h-5 w-5" />
                                Reset All Data
                            </p>
                            <p className="text-sm text-gray-400">Permanently delete all transactions from the application.</p>
                        </div>
                        <button 
                            onClick={onResetAll}
                            className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                            Reset All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;