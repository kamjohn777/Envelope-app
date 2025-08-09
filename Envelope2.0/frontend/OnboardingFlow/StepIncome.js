import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const StepIncome = ({ value, onChange, onNext, onBack }) => {
  const setIncome = (patch) => onChange({ ...value, income: { ...value.income, ...patch } });
  const set = (patch) => onChange({ ...value, ...patch });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income</Text>
      <View style={styles.group}>
        <Text style={styles.label}>Pay frequency</Text>
        <TextInput style={styles.input} value={value.payFrequency} onChangeText={(t) => set({ payFrequency: t })} placeholder="monthly / biweekly / weekly" />
      </View>
      <View style={styles.group}>
        <Text style={styles.label}>Income amount</Text>
        <TextInput style={styles.input} value={String(value.income.amount || '')} onChangeText={(t) => setIncome({ amount: Number(t) || 0 })} keyboardType="numeric" placeholder="0" />
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.secondary]} onPress={onBack}><Text style={styles.buttonTextSecondary}>Back</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onNext}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#295642', marginBottom: 12 },
  group: { marginBottom: 16 },
  label: { color: '#333', marginBottom: 6 },
  input: { backgroundColor: 'white', borderRadius: 10, padding: 12, fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  button: { backgroundColor: '#295642', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  secondary: { backgroundColor: '#EAEDED' },
  buttonTextSecondary: { color: '#295642', fontWeight: 'bold' },
});

export default StepIncome;