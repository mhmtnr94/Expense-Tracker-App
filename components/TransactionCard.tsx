import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description?: string;
};

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.category}>{transaction.category}</Text>
        <Text style={[styles.amount, transaction.type === 'income' ? styles.income : styles.expense]}>
          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>{transaction.date}</Text>
        {transaction.description ? (
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{transaction.description}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  category: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  income: {
    color: '#2ecc71',
  },
  expense: {
    color: '#e74c3c',
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  description: {
    color: '#555',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default TransactionCard;
