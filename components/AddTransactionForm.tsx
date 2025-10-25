import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';

interface AddTransactionFormProps {
    onClose: () => void;
    onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

const expenseCategories = ['Food', 'Travel', 'Personal', 'Utilities', 'Subscriptions', 'Shopping', 'Tech items', 'Other'];
const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onClose, onAdd }) => {
    const [type, setType] = useState<TransactionType>('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(expenseCategories[0]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleTypeChange = (newType: TransactionType) => {
        setType(newType);
        setCategory(newType === 'expense' ? expenseCategories[0] : incomeCategories[0]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !category || !date) return;

        onAdd({
            type,
            amount: parseFloat(amount),
            category,
            description,
            date: new Date(date).toISOString(),
        });
        onClose();
    };

    const categories = type === 'expense' ? expenseCategories : incomeCategories;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity">
            <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md m-4 transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Add Transaction</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>

                <div className="mb-6">
                    <div className="flex bg-gray-700 rounded-lg p-1">
                        <button
                            onClick={() => handleTypeChange('expense')}
                            className={`w-1/2 py-2 rounded-md transition-colors ${type === 'expense' ? 'bg-red-500 text-white' : 'text-gray-400'}`}
                        >
                            Expense
                        </button>
                        <button
                            onClick={() => handleTypeChange('income')}
                            className={`w-1/2 py-2 rounded-md transition-colors ${type === 'income' ? 'bg-green-500 text-white' : 'text-gray-400'}`}
                        >
                            Income
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-400">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-teal-500 focus:border-teal-500"
                            placeholder="0.00"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-400">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-teal-500 focus:border-teal-500"
                            required
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-400">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-teal-500 focus:border-teal-500"
                            placeholder="e.g., Coffee with friends"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-400">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                    <div className="pt-2 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors">Add Transaction</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionForm;