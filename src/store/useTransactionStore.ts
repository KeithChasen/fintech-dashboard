import { create } from 'zustand';

export interface Transaction {
	id: string;
	title: string;
	amount: number;
	type: 'income' | 'expense';
	date: string;
}

interface TransactionState {
	transactions: Transaction[];
	addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => Promise<void>;
}

const generateFakeData = (): Transaction[] => {
	return Array.from({ length: 10000 }, (_, i) => ({
		id: `tx-${i}`,
		title: `Transaction #${i}`,
		amount: Math.floor(Math.random() * 1000) + 1,
		type: Math.random() > 0.4 ? 'expense' : 'income',
		date: new Date().toLocaleDateString(),
	}));
};

export const useTransactionStore = create<TransactionState>(set => ({
	transactions: generateFakeData(),

	addTransaction: async newTx => {
		await new Promise(resolve => setTimeout(resolve, 1000));

		const transaction: Transaction = {
			...newTx,
			id: `tx-${Date.now()}`,
			date: new Date().toLocaleDateString(),
		};

		set(state => ({
			transactions: [transaction, ...state.transactions],
		}));
	},
}));
