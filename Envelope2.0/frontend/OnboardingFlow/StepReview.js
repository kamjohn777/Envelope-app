import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const StepReview = ({ profile, envelopes, onBack, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile</Text>
        <Text>Name: {profile.name}</Text>
        <Text>Currency: {profile.currency}</Text>
        <Text>Pay frequency: {profile.payFrequency}</Text>
        <Text>Income: {profile.income.amount} / {profile.income.cadence}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Envelopes</Text>
        <FlatList
          data={envelopes}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <Text>• {item.name} ({item.color})</Text>
          )}
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.secondary]} onPress={onBack}><Text style={styles.buttonTextSecondary}>Back</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onConfirm}><Text style={styles.buttonText}>Finish</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#295642', marginBottom: 12 },
  card: { backgroundColor: 'white', borderRadius: 10, padding: 12, marginBottom: 12 },
  cardTitle: { fontWeight: 'bold', marginBottom: 6, color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  button: { backgroundColor: '#295642', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  secondary: { backgroundColor: '#EAEDED' },
  buttonTextSecondary: { color: '#295642', fontWeight: 'bold' },
});

export default StepReview;