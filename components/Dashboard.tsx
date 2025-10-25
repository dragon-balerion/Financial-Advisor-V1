import React, { useState, useMemo } from 'react';
import { Transaction, Currency } from '../types';
import ExpenseChart from './ExpenseChart';
import TransactionList from './TransactionList';
import AddTransactionForm from './AddTransactionForm';

interface DashboardProps {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    currency: Currency;
}

const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const ArrowUpIcon: React.FC<{className?: string}> = ({className}) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
    </svg>
);

const ArrowDownIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-7-7m7 7l7-7" />
    </svg>
);

const Dashboard: React.FC<DashboardProps> = ({ transactions, addTransaction, currency }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const summary = useMemo(() => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return transactions.reduce((acc, t) => {
            const transactionDate = new Date(t.date);
            if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
                if (t.type === 'income') {
                    acc.income += t.amount;
                } else {
                    acc.expenses += t.amount;
                }
            }
            return acc;
        }, { income: 0, expenses: 0 });
    }, [transactions]);

    const savings = summary.income - summary.expenses;

    const formatCurrency = (amount: number) => {
        const convertedAmount = amount * currency.rate;
        return `${currency.symbol}${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Monthly Overview</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors duration-300 shadow-lg">
                    <PlusIcon className="h-5 w-5" />
                    Add Transaction
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl shadow-md flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Total Income</p>
                        <p className="text-3xl font-bold text-white">{formatCurrency(summary.income)}</p>
                    </div>
                     <div className="bg-green-500/20 p-2 rounded-full">
                        <ArrowUpIcon className="h-6 w-6 text-green-400" />
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-md flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Total Expenses</p>
                        <p className="text-3xl font-bold text-white">{formatCurrency(summary.expenses)}</p>
                    </div>
                     <div className="bg-red-500/20 p-2 rounded-full">
                        <ArrowDownIcon className="h-6 w-6 text-red-400" />
                    </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl shadow-md flex items-start justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Net Savings</p>
                        <p className={`text-3xl font-bold ${savings >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                           {formatCurrency(savings)}
                        </p>
                    </div>
                    <div className="bg-blue-500/20 p-2 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                           <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" />
                         </svg>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-gray-800 p-6 rounded-xl shadow-md">
                     <h3 className="text-xl font-semibold mb-4 text-white">Recent Transactions</h3>
                    <TransactionList transactions={transactions.slice(0, 5)} currency={currency} />
                </div>
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-white">Expense Breakdown</h3>
                    <ExpenseChart transactions={transactions} currency={currency} />
                </div>
            </div>

            {isModalOpen && <AddTransactionForm onClose={() => setIsModalOpen(false)} onAdd={addTransaction} />}
        </div>
    );
};

export default Dashboard;