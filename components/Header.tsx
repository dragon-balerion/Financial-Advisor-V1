import React from 'react';
import { Currency } from '../types';

interface HeaderProps {
    currencies: Currency[];
    selectedCurrency: Currency;
    onCurrencyChange: (currency: Currency) => void;
}


const Header: React.FC<HeaderProps> = ({ currencies, selectedCurrency, onCurrencyChange }) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = event.target.value;
        const newCurrency = currencies.find(c => c.code === selectedCode);
        if (newCurrency) {
            onCurrencyChange(newCurrency);
        }
    };
    
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h1 className="text-2xl font-bold ml-2 text-white">FinancAI</h1>
                    </div>
                    <div>
                        <select
                            value={selectedCurrency.code}
                            onChange={handleSelectChange}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-teal-500 focus:border-teal-500"
                            aria-label="Select Currency"
                        >
                            {currencies.map(c => (
                                <option key={c.code} value={c.code}>
                                    {c.code} - {c.symbol}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;