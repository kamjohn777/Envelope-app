import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StepWelcome = ({ onNext }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to Envelope</Text>
    <Text style={styles.subtitle}>Let’s personalize your budgeting experience.</Text>
    <TouchableOpacity style={styles.button} onPress={onNext}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#295642', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24, textAlign: 'center' },
  button: { backgroundColor: '#295642', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 12 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default StepWelcome;