export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Currency {
  code: string;
  symbol: string;
  rate: number; // Rate relative to USD
}

export type Page = 'dashboard' | 'account';