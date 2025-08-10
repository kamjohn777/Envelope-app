import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StepWelcome from './StepWelcome';
import StepBasic from './StepBasic';
import StepIncome from './StepIncome';
import StepCurrency from './StepCurrency';
import StepEnvelopes from './StepEnvelopes';
import StepReview from './StepReview';
import { storage, userKeys } from '../storage';

const OnboardingFlow = ({ user, onDone }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ 
    name: user?.name || '', 
    currency: 'USD', 
    currencySymbol: '$',
    currencyName: 'US Dollar',
    payFrequency: 'monthly', 
    income: { amount: 0, cadence: 'monthly' },
    savingsAmount: 100
  });
  const [envelopes, setEnvelopes] = useState([
    { id: 'groceries', name: 'Groceries', color: '#FF6B6B', balance: 0 },
    { id: 'gas', name: 'Gas', color: '#4ECDC4', balance: 0 },
  ]);

  const saveAndFinish = async () => {
    const keys = userKeys(user.id);
    await storage.set(keys.profile, { ...profile, userId: user.id, updatedAt: new Date().toISOString() });
    await storage.set(keys.envelopes, envelopes.map(e => ({ ...e, userId: user.id, updatedAt: new Date().toISOString() })));
    await storage.set(keys.onboardingCompleted, true);
    onDone && onDone();
  };

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <View style={styles.container}>
      {step === 0 && <StepWelcome onNext={next} />}
      {step === 1 && <StepBasic value={profile} onChange={setProfile} onNext={next} onBack={back} />}
      {step === 2 && <StepIncome value={profile} onChange={setProfile} onNext={next} onBack={back} />}
      {step === 3 && <StepCurrency value={profile} onChange={setProfile} onNext={next} onBack={back} />}
      {step === 4 && <StepEnvelopes value={envelopes} onChange={setEnvelopes} onNext={next} onBack={back} />}
      {step === 5 && <StepReview profile={profile} envelopes={envelopes} onBack={back} onConfirm={saveAndFinish} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
});

export default OnboardingFlow;