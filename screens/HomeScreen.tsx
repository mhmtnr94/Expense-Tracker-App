import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useTransactionStore } from '../store/useTransactionStore';
import { useBalance } from '../hooks/useBalance';
import TransactionCard, { Transaction } from '../components/TransactionCard';

const HomeScreen = ({ navigation }: any) => {
  const { transactions, loadTransactions, removeTransaction, resetTransactions } = useTransactionStore();
  const { balance, income, expense } = useBalance(transactions);

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert('Delete Transaction', 'Are you sure you want to delete this transaction?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeTransaction(id) },
    ]);
  };

  const handleReset = () => {
    Alert.alert('Reset All', 'Are you sure you want to delete all transactions?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => resetTransactions() },
    ]);
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.cardRow}>
      <View style={styles.sideBtnCol}>
        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditTransaction', { transaction: item })}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <TransactionCard transaction={item} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <View style={styles.summary}>
        <Text style={styles.balance}>Balance: ${balance.toFixed(2)}</Text>
        <Text style={styles.income}>Income: ${income.toFixed(2)}</Text>
        <Text style={styles.expense}>Expense: ${expense.toFixed(2)}</Text>
      </View>
      <Button title="Add Transaction" onPress={() => navigation.navigate('AddTransaction')} />
      <Button title="Reset All" color="#e74c3c" onPress={handleReset} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  summary: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  income: {
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  expense: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 8,
  },
  sideBtnCol: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8,
    marginVertical: 4,
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editBtn: {
    backgroundColor: '#2980b9',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
