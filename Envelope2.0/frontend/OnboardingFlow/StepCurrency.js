import React, { useState } from 'react';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StepCurrency = ({ value, onChange, onNext, onBack }) => {
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  const set = (patch) => onChange({ ...value, ...patch });

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ];

  const getSuggestedSavingsAmounts = () => {
    const income = value.income?.amount || 0;
    if (income === 0) {
      return [
        { value: 50, label: '50' },
        { value: 100, label: '100' },
        { value: 150, label: '150' },
        { value: 'custom', label: 'Custom' }
      ];
    }
    
    // Calculate suggested amounts based on income (10%, 15%, 20% of monthly income)
    const monthlyIncome = value.payFrequency === 'annually' || value.payFrequency === 'yearly' 
      ? income / 12 
      : income;
    
    const suggested1 = Math.round(monthlyIncome * 0.1);
    const suggested2 = Math.round(monthlyIncome * 0.15);
    const suggested3 = Math.round(monthlyIncome * 0.2);
    
    return [
      { value: suggested1, label: suggested1.toString() },
      { value: suggested2, label: suggested2.toString() },
      { value: suggested3, label: suggested3.toString() },
      { value: 'custom', label: 'Custom' }
    ];
  };

  const savingsAmounts = getSuggestedSavingsAmounts();

  const getCurrencySymbol = () => {
    const selectedCurrency = currencies.find(c => c.code === value.currency);
    return selectedCurrency ? selectedCurrency.symbol : '$';
  };

  const getSavingsLabel = (amount) => {
    if (amount === 'custom') return 'Custom';
    return `${getCurrencySymbol()}${amount}`;
  };

  const handleCurrencySelect = (currency) => {
    set({ 
      currency: currency.code,
      currencySymbol: currency.symbol,
      currencyName: currency.name 
    });
  };

  const handleSavingsSelect = (amount) => {
    if (amount === 'custom') {
      setShowCustomModal(true);
    } else {
      set({ savingsAmount: amount });
    }
  };

  const handleCustomAmountSubmit = () => {
    const numericAmount = parseFloat(customAmount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      set({ savingsAmount: numericAmount });
      setShowCustomModal(false);
      setCustomAmount('');
    }
  };

  const handleNext = () => {
    if (!value.currency || !value.savingsAmount) {
      // Show error or alert
      return;
    }
    onNext();
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <MaterialIcons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Greeting and User Name */}
        <Text style={styles.greeting}>HELLO!</Text>
        <Text style={styles.userName}>{value.name || 'Kameron Johnson'}</Text>
        
        {/* Question */}
        <Text style={styles.question}>
          How much would you like to save?
        </Text>

        {/* Currency Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Currency</Text>
          <View style={styles.buttonGrid}>
            {currencies.map((currency, index) => (
              <TouchableOpacity
                key={currency.code}
                style={[
                  styles.currencyButton,
                  value.currency === currency.code && styles.selectedButton
                ]}
                onPress={() => handleCurrencySelect(currency)}
              >
                <Text style={[
                  styles.currencyButtonText,
                  value.currency === currency.code && styles.selectedButtonText
                ]}>
                  {currency.code}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Savings Amount Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Amount</Text>
          <View style={styles.buttonGrid}>
            {savingsAmounts.map((amount, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.amountButton,
                  amount.value === 'custom' && styles.customButton,
                  value.savingsAmount === amount.value && styles.selectedAmountButton
                ]}
                onPress={() => handleSavingsSelect(amount.value)}
              >
                <Text style={[
                  styles.amountButtonText,
                  amount.value === 'custom' && styles.customButtonText,
                  value.savingsAmount === amount.value && styles.selectedAmountButtonText
                ]}>
                  {getSavingsLabel(amount.value)}
                </Text>
                {amount.value === 'custom' && (
                  <MaterialIcons name="keyboard-arrow-down" size={20} color="#666666" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Circular Element */}
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

      {/* Custom Amount Modal */}
      <Modal
        visible={showCustomModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Custom Amount</Text>
            <TextInput
              style={styles.modalInput}
              value={customAmount}
              onChangeText={setCustomAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              autoFocus={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowCustomModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleCustomAmountSubmit}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 34,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
  },
  question: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 30,
    lineHeight: 18,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  currencyButton: {
    width: '48%',
    backgroundColor: '#E8F5E8',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedButton: {
    backgroundColor: '#0ECF8E',
  },
  currencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
  amountButton: {
    width: '48%',
    backgroundColor: '#E8F5E8',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  customButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#0ECF8E',
  },
  selectedAmountButton: {
    backgroundColor: '#0ECF8E',
  },
  amountButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  customButtonText: {
    color: '#666666',
  },
  selectedAmountButtonText: {
    color: '#FFFFFF',
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#0ECF8E',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  confirmButton: {
    backgroundColor: '#0ECF8E',
  },
  cancelButtonText: {
    color: '#666666',
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default StepCurrency; 