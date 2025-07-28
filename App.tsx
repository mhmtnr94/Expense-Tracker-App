import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTransactionStore } from './store/useTransactionStore';
import { categories } from './utils/categories';
import { Transaction } from './components/TransactionCard';

const Stack = createNativeStackNavigator();

function AddTransactionScreen({ navigation }: any) {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount.');
      return;
    }
    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      category,
      amount: amt,
      date,
      description,
    };
    addTransaction(transaction);
    navigation.goBack();
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Add Transaction</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Type:</Text>
        <Button title="Expense" onPress={() => setType('expense')} color={type === 'expense' ? '#e74c3c' : '#ccc'} />
        <Button title="Income" onPress={() => setType('income')} color={type === 'income' ? '#2ecc71' : '#ccc'} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Category:</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue: string) => setCategory(itemValue)}
        >
          {categories.map((cat) => (
            <Picker.Item label={cat} value={cat} key={cat} />
          ))}
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Optional"
        />
      </View>
      <Button title="Add Transaction" onPress={handleAdd} />
    </View>
  );
}

function EditTransactionScreen({ route, navigation }: any) {
  const { transaction } = route.params;
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  const [type, setType] = useState<'income' | 'expense'>(transaction.type);
  const [category, setCategory] = useState(transaction.category);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [date, setDate] = useState(transaction.date);
  const [description, setDescription] = useState(transaction.description || '');

  const handleUpdate = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount.');
      return;
    }
    updateTransaction(transaction.id, {
      type,
      category,
      amount: amt,
      date,
      description,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Edit Transaction</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Type:</Text>
        <Button title="Expense" onPress={() => setType('expense')} color={type === 'expense' ? '#e74c3c' : '#ccc'} />
        <Button title="Income" onPress={() => setType('income')} color={type === 'income' ? '#2ecc71' : '#ccc'} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Category:</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue: string) => setCategory(itemValue)}
        >
          {categories.map((cat) => (
            <Picker.Item label={cat} value={cat} key={cat} />
          ))}
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Optional"
        />
      </View>
      <Button title="Update Transaction" onPress={handleUpdate} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTransaction" component={AddTransactionScreen} options={{ title: 'Add Transaction' }} />
        <Stack.Screen name="EditTransaction" component={EditTransactionScreen} options={{ title: 'Edit Transaction' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    width: 90,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginLeft: 8,
  },
  picker: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
