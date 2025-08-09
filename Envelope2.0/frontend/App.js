import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import OnboardingFlow from './OnboardingFlow/OnboardingFlow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage, userKeys } from './storage';

export default function App() {
  const [isBootLoading, setIsBootLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [requiresOnboarding, setRequiresOnboarding] = useState(false);

  const checkUserAndOnboarding = async (user) => {
    setIsChecking(true);
    setCurrentUser(user);
    if (user) {
      const keys = userKeys(user.id);
      const completed = await storage.get(keys.onboardingCompleted, false);
      setRequiresOnboarding(!completed);
    } else {
      setRequiresOnboarding(false);
    }
    setIsChecking(false);
  };

  const handleLoadingComplete = async () => {
    setIsBootLoading(false);
    const data = await AsyncStorage.getItem('currentUser');
    const user = data ? JSON.parse(data) : null;
    await checkUserAndOnboarding(user);
  };

  const handleAuthSuccess = async (user) => {
    await checkUserAndOnboarding(user);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    setCurrentUser(null);
    setRequiresOnboarding(false);
  };

  const handleOnboardingDone = async () => {
    if (currentUser) {
      const keys = userKeys(currentUser.id);
      await storage.set(keys.onboardingCompleted, true);
      setRequiresOnboarding(false);
    }
  };

  if (isBootLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  if (isChecking) {
    return (
      <View style={styles.centered}> 
        <ActivityIndicator size={40} color="#295642" />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!currentUser) {
    return <LoginScreen onAuthSuccess={handleAuthSuccess} />;
  }

  if (requiresOnboarding) {
    return <OnboardingFlow user={currentUser} onDone={handleOnboardingDone} />;
  }

  return <HomeScreen user={currentUser} onLogout={handleLogout} />;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
});