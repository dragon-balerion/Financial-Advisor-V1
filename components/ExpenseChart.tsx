import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction, Currency } from '../types';

interface ExpenseChartProps {
    transactions: Transaction[];
    currency: Currency;
}

const COLORS = ['#14B8A6', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'];

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions, currency }) => {
    const expenseData = useMemo(() => {
        const expenseByCategory = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {} as Record<string, number>);

        return Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));
    }, [transactions]);

    if (expenseData.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-400">No expense data for this month.</div>;
    }

    return (
        <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                    >
                        {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#2A2A2A',
                            borderColor: '#3A3A3A',
                            borderRadius: '0.5rem',
                        }}
                        itemStyle={{ color: '#E5E7EB' }}
                        formatter={(value: number) => `${currency.symbol}${(value * currency.rate).toFixed(2)}`}
                    />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '12px', color: '#9CA3AF' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseChart;