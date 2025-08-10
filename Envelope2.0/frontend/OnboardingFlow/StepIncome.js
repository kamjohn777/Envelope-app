import React, { useState } from 'react';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StepIncome = ({ value, onChange, onNext, onBack }) => {
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  // Input validation states
  const [payFrequencyError, setPayFrequencyError] = useState('');
  const [incomeError, setIncomeError] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  // Security: Input sanitization and validation
  const sanitizeInput = (input) => {
    // Remove any potential script tags, HTML, and dangerous characters
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[<>\"'&]/g, '')
      .trim();
  };

  // Security: Validate pay frequency input
  const validatePayFrequency = (input) => {
    const sanitized = sanitizeInput(input);
    
    // Only allow specific pay frequency values
    const allowedFrequencies = ['monthly', 'biweekly', 'weekly', 'annually', 'yearly'];
    const normalized = sanitized.toLowerCase();
    
    if (!allowedFrequencies.includes(normalized)) {
      setPayFrequencyError('Please enter: Monthly, Biweekly, Weekly, or Annually');
      return false;
    }
    
    setPayFrequencyError('');
    return true;
  };

  // Security: Validate income amount input
  const validateIncomeAmount = (input) => {
    const sanitized = sanitizeInput(input);
    
    // Only allow numbers, commas, and decimal points
    const numericRegex = /^[0-9,]*\.?[0-9]*$/;
    
    if (!numericRegex.test(sanitized)) {
      setIncomeError('Please enter only numbers (e.g., 5000 or 5,000)');
      return false;
    }
    
    // Convert to number and validate range
    const numericValue = parseFloat(sanitized.replace(/,/g, ''));
    
    if (isNaN(numericValue) || numericValue < 0) {
      setIncomeError('Please enter a valid positive number');
      return false;
    }
    
    if (numericValue > 999999999) {
      setIncomeError('Amount too large. Please enter a realistic income value');
      return false;
    }
    
    setIncomeError('');
    return true;
  };

  // Security: Handle pay frequency changes with validation
  const handlePayFrequencyChange = (text) => {
    // Allow free editing - just sanitize and store
    const sanitized = sanitizeInput(text);
    set({ payFrequency: sanitized });
    // Clear any previous errors when user starts typing
    if (payFrequencyError) {
      setPayFrequencyError('');
    }
  };

  // Security: Handle income amount changes with validation
  const handleIncomeAmountChange = (text) => {
    // Allow free editing - just sanitize and store
    const sanitized = sanitizeInput(text);
    setIncome({ amount: sanitized });
    // Clear any previous errors when user starts typing
    if (incomeError) {
      setIncomeError('');
    }
  };

  // Security: Validate all inputs before proceeding
  const handleNext = () => {
    const isPayFrequencyValid = validatePayFrequency(value.payFrequency || '');
    const isIncomeValid = validateIncomeAmount(String(value.income?.amount || ''));
    
    if (!isPayFrequencyValid || !isIncomeValid) {
      Alert.alert('Validation Error', 'Please fix the errors before continuing');
      return;
    }
    
    // Additional security check: ensure no suspicious patterns
    const suspiciousPatterns = [
      /javascript:/i,
      /data:text\/html/i,
      /vbscript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i
    ];
    
    const allInputs = JSON.stringify(value).toLowerCase();
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(allInputs));
    
    if (hasSuspiciousContent) {
      Alert.alert('Security Alert', 'Suspicious content detected. Please check your inputs.');
      return;
    }
    
    onNext();
  };

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
        <Text style={styles.userName}>{value.name || ''}</Text>
        
        {/* Income Question */}
        <Text style={styles.question}>
          What's your income (monthly preferred, or annual)?
        </Text>

        {/* Pay Frequency Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pay frequency</Text>
          <TextInput 
            style={[styles.input, payFrequencyError ? styles.inputError : null]} 
            value={value.payFrequency || ''} 
            onChangeText={handlePayFrequencyChange} 
            placeholder="Monthly"
            placeholderTextColor="#8A8A8A"
            maxLength={20}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {payFrequencyError ? (
            <Text style={styles.errorText}>{payFrequencyError}</Text>
          ) : null}
        </View>

        {/* Income Amount Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Income amount</Text>
          <TextInput 
            style={[styles.input, incomeError ? styles.inputError : null]} 
            value={String(value.income?.amount || '')} 
            onChangeText={handleIncomeAmountChange} 
            keyboardType="numeric" 
            placeholder="0"
            placeholderTextColor="#8A8A8A"
            maxLength={15}
            autoCorrect={false}
          />
          {incomeError ? (
            <Text style={styles.errorText}>{incomeError}</Text>
          ) : null}
        </View>

        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.cta}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <MaterialIcons name="arrow-forward" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
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
    marginBottom: 10,
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
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    color: '#333333',
  },
  inputError: {
    borderColor: '#FF4444',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  innerContainer: {
    marginTop: 16,
    borderColor: "#0ECF8E",
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 2,
  },
  cta: {
    marginTop: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: "#0ECF8E",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    backgroundColor: "#0ECF8E",
    position: "relative",
    top: -13,
    left: 3,
  },
});

export default StepIncome;