import React from 'react';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StepIncome = ({ value, onChange, onNext, onBack }) => {
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const setIncome = (patch) => onChange({ ...value, income: { ...value.income, ...patch } });
  const set = (patch) => onChange({ ...value, ...patch });

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <MaterialIcons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Greeting and Name */}
        <Text style={styles.greeting}>HELLO!</Text>
        <Text style={styles.userName}>{value.name || 'Kameron Johnson'}</Text>
        
        {/* Income Question */}
        <Text style={styles.question}>
          What's your income (monthly preferred, or annual)?
        </Text>

        {/* Pay Frequency Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pay frequency</Text>
          <TextInput 
            style={styles.input} 
            value={value.payFrequency || 'Monthly'} 
            onChangeText={(t) => set({ payFrequency: t })} 
            placeholder="Monthly"
            placeholderTextColor="#8A8A8A"
          />
        </View>

        {/* Income Amount Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Income amount</Text>
          <TextInput 
            style={styles.input} 
            value={String(value.income?.amount || '0')} 
            onChangeText={(t) => setIncome({ amount: Number(t) || 0 })} 
            keyboardType="numeric" 
            placeholder="0"
            placeholderTextColor="#8A8A8A"
          />
        </View>

        {/* Circular Element */}
        <View style={styles.circle} />

        {/* Bottom Button */}
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 52,
    fontWeight: '900',
    color: '#0ECF8E',
    fontFamily: 'FredokaOne_400Regular',
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 30,
  },
  question: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 40,
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0ECF8E',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333333',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#0ECF8E',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: '#0ECF8E',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 40,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StepIncome;