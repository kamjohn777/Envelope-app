import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

const LoadingScreen = ({ onLoadingComplete }) => {
  
  // State management for loading text and progress
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [currentStep, setCurrentStep] = useState(0);
  
  // Animation values for fade-in and scale effects
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  // Loading steps array - customized for envelope app
  const loadingSteps = [
    { text: 'Loading app...', duration: 800 },
    { text: 'Setting up envelopes...', duration: 1000 },
    { text: 'Preparing budget tools...', duration: 1200 },
    { text: 'Save like never before...', duration: 1200 },
    { text: 'Almost ready...', duration: 600 },
  ];

  // Use effect hook for loading progression
  useEffect(() => {
    // Start the fade-in and scale animations
    startAnimations();
    
    // Create a timer that runs every 800 milliseconds
    const loadingInterval = setInterval(() => {
      // If we haven't finished all loading steps yet
      if (currentStep < loadingSteps.length) {
        // Update the loading text to show the current step's message
        setLoadingText(loadingSteps[currentStep].text);
        // Move to the next step (currentStep + 1)
        setCurrentStep(prev => prev + 1);
      } else {
        // We've finished all steps, so stop the timer
        clearInterval(loadingInterval);
        // Wait 500ms then tell the parent component (App.js) that loading is complete
        setTimeout(() => {
          onLoadingComplete(); // This calls the function we passed from App.js
        }, 500);
      }
    }, 800); // Run this every 800 milliseconds

    // Cleanup function - this prevents memory leaks by clearing the timer if component unmounts
    return () => clearInterval(loadingInterval);
  }, [currentStep, onLoadingComplete]);

  // Animation function
  const startAnimations = () => {
    // Run fade and scale animations at the same time
    Animated.parallel([
      // Fade animation: from invisible (0) to visible (1) over 1 second
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Scale animation: from small (0.8) to normal size (1) over 1 second
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Render the UI
  return (
    <View style={styles.container}>
      {/* Animated container that fades in and scales up */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Logo/Icon Container */}
        <View style={styles.logoContainer}>
          <MaterialIcons name="account-balance-wallet" size={120} color="rgba(255, 255, 255, 0.9)" />
        </View>

        {/* Background Circles */}
        <View style={styles.circleContainer}>
          <View style={styles.circle1}></View>
          <View style={styles.circle2}></View>
          <View style={styles.circle3}></View>
        </View>

        {/* App Title */}
        <Text style={styles.title}>💰 Envelope Savings</Text>
        <Text style={styles.subtitle}>Your personal finance companion</Text>
        
        {/* Loading Indicator with Spinner */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color="rgba(255, 255, 255, 0.8)" 
            style={styles.spinner}
          />
          {/* This text changes based on our loadingText state */}
          <Text style={styles.loadingText}>{loadingText}</Text>
        </View>

        {/* Progress Dots - Shows which step we're on */}
        <View style={styles.progressContainer}>
          {loadingSteps.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.progressDot,
                // If this dot's index is less than currentStep, it's active (white)
                // Otherwise it's inactive (gray)
                index < currentStep ? styles.progressDotActive : styles.progressDotInactive
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#295642', 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    alignItems: 'center',
    padding: 20,
    width: width * 0.8,
    height: height * 0.9,
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
    height: height * 0.3,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  spinner: {
    marginBottom: 15,
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  progressDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  // Background Circles
  circleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle1: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: '-10%',
    left: '10%',
  },
  circle2: {
    position: 'absolute',
    width: width * 1,
    height: width * 1,
    borderRadius: width * 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: '15%',
    left: '-60%',
  },
  circle3: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    top: '-10%',
    left: '-30%',
  },
});

export default LoadingScreen; 