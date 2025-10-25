import React from 'react';
import { Transaction, Currency } from '../types';

interface TransactionListProps {
    transactions: Transaction[];
    currency: Currency;
}

const IncomeIcon: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    </div>
);

const ExpenseIcon: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
    </div>
);


const TransactionList: React.FC<TransactionListProps> = ({ transactions, currency }) => {
    if (transactions.length === 0) {
        return <p className="text-gray-400 text-center py-4">No transactions yet.</p>;
    }
    
    return (
        <ul className="space-y-3">
            {transactions.map(t => {
                const convertedAmount = t.amount * currency.rate;
                return (
                    <li key={t.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/50">
                        <div className="flex items-center gap-4">
                            {t.type === 'income' ? <IncomeIcon /> : <ExpenseIcon />}
                            <div>
                                <p className="font-semibold text-white">{t.description}</p>
                                <p className="text-sm text-gray-400">{t.category}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                               {t.type === 'income' ? '+' : '-'}{currency.symbol}{convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                             <p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default TransactionList;