import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../components/TransactionCard';

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, updated: Partial<Transaction>) => void;
  resetTransactions: () => void;
  loadTransactions: () => Promise<void>;
}

const STORAGE_KEY = 'transactions';

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  addTransaction: (transaction: Transaction) => {
    const updated = [transaction, ...get().transactions];
    set({ transactions: updated });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  removeTransaction: (id: string) => {
    const updated = get().transactions.filter((t: Transaction) => t.id !== id);
    set({ transactions: updated });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  updateTransaction: (id: string, updatedFields: Partial<Transaction>) => {
    const updated = get().transactions.map((t: Transaction) =>
      t.id === id ? { ...t, ...updatedFields } : t
    );
    set({ transactions: updated });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },
  resetTransactions: () => {
    set({ transactions: [] });
    AsyncStorage.removeItem(STORAGE_KEY);
  },
  loadTransactions: async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) set({ transactions: JSON.parse(data) });
  },
}));
