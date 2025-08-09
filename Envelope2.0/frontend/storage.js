import AsyncStorage from '@react-native-async-storage/async-storage';

const ns = (key) => `envapp:${key}`;

export const storage = {
  async get(key, defaultValue = null) {
    try {
      const raw = await AsyncStorage.getItem(ns(key));
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  async set(key, value) {
    try {
      await AsyncStorage.setItem(ns(key), JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  async remove(key) {
    try {
      await AsyncStorage.removeItem(ns(key));
      return true;
    } catch {
      return false;
    }
  },
};

// Per-user key helpers
export const userKeys = (userId) => ({
  onboardingCompleted: `onboardingCompleted:${userId}`,
  profile: `profile:${userId}`,
  envelopes: `envelopes:${userId}`,
  transactions: `transactions:${userId}`,
});