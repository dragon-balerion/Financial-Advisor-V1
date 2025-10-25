import React, { useState, useMemo, useEffect } from 'react';
import { Transaction, Currency, Page } from './types';
import Chatbot from './components/Chatbot';
import Header from './components/Header';
import ChatbotFAB from './components/ChatbotFAB';
import BottomNav from './components/BottomNav';
import DashboardPage from './pages/DashboardPage';
import AccountPage from './pages/AccountPage';

const currencies: Currency[] = [
    { code: 'USD', symbol: '$', rate: 1 },
    { code: 'EUR', symbol: '€', rate: 0.92 },
    { code: 'GBP', symbol: '£', rate: 0.79 },
    { code: 'JPY', symbol: '¥', rate: 157 },
    { code: 'LKR', symbol: 'Rs', rate: 300 },
];

const initialTransactions: Transaction[] = [
    { id: '1', type: 'income', category: 'Salary', amount: 5000, date: new Date().toISOString(), description: 'Monthly Salary' },
    { id: '2', type: 'expense', category: 'Travel', amount: 250, date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), description: 'Weekend trip' },
    { id: '3', type: 'expense', category: 'Food', amount: 80, date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), description: 'Groceries' },
    { id: '4', type: 'expense', category: 'Personal', amount: 120, date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(), description: 'New headphones' },
    { id: '5', type: 'expense', category: 'Utilities', amount: 150, date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(), description: 'Electricity Bill' },
    { id: '6', type: 'income', category: 'Freelance', amount: 750, date: new Date(new Date().setDate(new Date().getDate() - 12)).toISOString(), description: 'Web Design Project' },
];

const App: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        try {
            const savedTransactions = localStorage.getItem('transactions');
            return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
        } catch (error) {
            console.error("Failed to parse transactions from localStorage", error);
            return initialTransactions;
        }
    });

    const [currency, setCurrency] = useState<Currency>(() => {
        try {
            const savedCurrencyCode = localStorage.getItem('currencyCode');
            return currencies.find(c => c.code === savedCurrencyCode) || currencies[0];
        } catch (error) {
            console.error("Failed to parse currency from localStorage", error);
            return currencies[0];
        }
    });
    
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('currencyCode', currency.code);
    }, [currency]);

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: new Date().getTime().toString(),
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };
    
    const handleResetMonth = () => {
        if(window.confirm("Are you sure you want to reset all transactions for the current month? This action cannot be undone.")) {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const filteredTransactions = transactions.filter(t => {
                const transactionDate = new Date(t.date);
                return transactionDate.getMonth() !== currentMonth || transactionDate.getFullYear() !== currentYear;
            });
            setTransactions(filteredTransactions);
            alert("This month's transactions have been reset.");
        }
    };

    const handleResetAll = () => {
        if(window.confirm("Are you sure you want to reset all application data? This will delete all your transactions permanently.")) {
            setTransactions([]);
            alert("All application data has been reset.");
        }
    };


    const financialDataForAI = useMemo(() => {
        const summary = transactions.reduce((acc, t) => {
             if (t.type === 'income') acc.totalIncome += t.amount;
             else acc.totalExpense += t.amount;
             
             if(t.type === 'expense') {
                acc.expensesByCategory[t.category] = (acc.expensesByCategory[t.category] || 0) + t.amount;
             }
             return acc;
        }, {totalIncome: 0, totalExpense: 0, expensesByCategory: {} as Record<string, number>});
        
        const convert = (amount: number) => (amount * currency.rate).toFixed(2);

        return `Here is a summary of my recent financial activity (in ${currency.code}):
- Total Income: ${currency.symbol}${convert(summary.totalIncome)}
- Total Expense: ${currency.symbol}${convert(summary.totalExpense)}
- Net Savings: ${currency.symbol}${convert(summary.totalIncome - summary.totalExpense)}
- Expense Breakdown: ${JSON.stringify(
    Object.fromEntries(
        Object.keys(summary.expensesByCategory).map((key) => [key, `${currency.symbol}${convert(summary.expensesByCategory[key])}`])
    )
)}
- Recent Transactions: ${JSON.stringify(transactions.slice(0, 5).map(t => ({...t, amount: `${currency.symbol}${convert(t.amount)}`})), null, 2)}`;
    }, [transactions, currency]);


    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
            <Header 
              currencies={currencies}
              selectedCurrency={currency}
              onCurrencyChange={setCurrency}
            />
            <main className="flex-grow p-4 sm:p-6 lg:p-8 mb-16">
               {currentPage === 'dashboard' && (
                    <DashboardPage 
                        transactions={transactions} 
                        addTransaction={addTransaction} 
                        currency={currency}
                    />
               )}
               {currentPage === 'account' && (
                    <AccountPage 
                        onResetMonth={handleResetMonth}
                        onResetAll={handleResetAll}
                    />
                )}
            </main>
            <ChatbotFAB onClick={() => setIsChatbotOpen(true)} />
            {isChatbotOpen && (
                <Chatbot 
                    financialData={financialDataForAI} 
                    onClose={() => setIsChatbotOpen(false)}
                />
            )}
            <BottomNav
                currentPage={currentPage}
                onNavigate={setCurrentPage}
            />
        </div>
    );
};

export default App;