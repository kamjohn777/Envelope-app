import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const StepBasic = ({ value, onChange, onNext, onBack }) => {
  const set = (patch) => onChange({ ...value, ...patch });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic info</Text>
      <View style={styles.group}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={value.name} onChangeText={(t) => set({ name: t })} placeholder="Your name" />
      </View>
      <View style={styles.group}>
        <Text style={styles.label}>Currency</Text>
        <TextInput style={styles.input} value={value.currency} onChangeText={(t) => set({ currency: t })} placeholder="USD" />
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

export default StepBasic;