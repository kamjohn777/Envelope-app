import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  // If a current user exists, notify parent immediately
  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        const parsed = JSON.parse(userData);
        onAuthSuccess(parsed);
      }
    })();
  }, [onAuthSuccess]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        onAuthSuccess(user);
      } else {
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          Alert.alert('Error', 'Incorrect password. Please try again.');
        } else {
          Alert.alert('Error', 'User not found. Please sign up first.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        Alert.alert('Error', 'User already exists. Please login instead.');
        setIsSignupMode(false);
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
      onAuthSuccess(newUser);
    } catch (error) {
      Alert.alert('Error', 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MaterialIcons name="account-balance-wallet" size={80} color="#295642" />
          <Text style={styles.title}>
            {isSignupMode ? 'Create Account' : 'Welcome Back'}
          </Text>
          <Text style={styles.subtitle}>
            {isSignupMode 
              ? 'Join the envelope savings community' 
              : 'Sign in to your envelope account'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.mainButton, isLoading && styles.mainButtonDisabled]}
            onPress={isSignupMode ? handleSignup : handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.mainButtonText}>
              {isLoading 
                ? (isSignupMode ? 'Creating Account...' : 'Signing In...') 
                : (isSignupMode ? 'Create Account' : 'Sign In')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isSignupMode ? 'Already have an account? ' : "Don't have an account? "}
          </Text>
          <TouchableOpacity onPress={() => setIsSignupMode(!isSignupMode)}>
            <Text style={styles.toggleLink}>
              {isSignupMode ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#295642', marginTop: 20, marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
  form: { marginBottom: 30 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, marginBottom: 16, paddingHorizontal: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 3 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#333' },
  mainButton: { backgroundColor: '#295642', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  mainButtonDisabled: { backgroundColor: '#95A5A6' },
  mainButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  toggleContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  toggleText: { color: '#666', fontSize: 14 },
  toggleLink: { color: '#295642', fontSize: 14, fontWeight: 'bold' },
});

export default LoginScreen; 