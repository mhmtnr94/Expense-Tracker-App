import { useMemo } from 'react';
import { Transaction } from '../components/TransactionCard';

export function useBalance(transactions: Transaction[]) {
  return useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((t) => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    return {
      balance: income - expense,
      income,
      expense,
    };
  }, [transactions]);
}
