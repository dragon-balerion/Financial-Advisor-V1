import React from 'react';
import { Transaction, Currency } from '../types';
import Dashboard from '../components/Dashboard';

interface DashboardPageProps {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    currency: Currency;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ transactions, addTransaction, currency }) => {
    return (
        <Dashboard 
            transactions={transactions} 
            addTransaction={addTransaction} 
            currency={currency} 
        />
    );
};

export default DashboardPage;