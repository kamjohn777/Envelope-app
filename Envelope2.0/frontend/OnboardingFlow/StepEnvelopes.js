import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const StepEnvelopes = ({ value, onChange, onNext, onBack }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#4A90E2');

  const add = () => {
    if (!name.trim()) return;
    onChange([...value, { id: `${Date.now()}`, name: name.trim(), color, balance: 0 }]);
    setName('');
  };

  const remove = (id) => onChange(value.filter((e) => e.id !== id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Envelopes</Text>

      <FlatList
        data={value}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.rowItem, { borderLeftColor: item.color }]}> 
            <Text style={styles.rowText}>{item.name}</Text>
            <TouchableOpacity onPress={() => remove(item.id)}><Text style={styles.delete}>Remove</Text></TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#666', marginBottom: 12 }}>No envelopes yet</Text>}
      />

      <View style={styles.group}>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="New envelope name" />
        <TextInput style={styles.input} value={color} onChangeText={setColor} placeholder="#4A90E2" />
        <TouchableOpacity style={styles.button} onPress={add}><Text style={styles.buttonText}>Add Envelope</Text></TouchableOpacity>
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
  group: { marginTop: 12 },
  input: { backgroundColor: 'white', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  button: { backgroundColor: '#295642', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  secondary: { backgroundColor: '#EAEDED' },
  buttonTextSecondary: { color: '#295642', fontWeight: 'bold' },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: 'white', borderRadius: 10, marginBottom: 8, borderLeftWidth: 6 },
  rowText: { fontSize: 16, color: '#333' },
  delete: { color: '#E74C3C', fontWeight: 'bold' },
});

export default StepEnvelopes;