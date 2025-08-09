import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StepWelcome = ({ onNext }) => (
  <View style={styles.container}>
    <View style={styles.headline}>
      <Text style={[styles.emphasis]}>MASTER</Text>
      <Text style={styles.line}>your money</Text>
      <Text style={styles.line}>
        one <Text style={styles.emphasis}>envelope</Text>
      </Text>
      <Text style={styles.line}>at a time.</Text>
    </View>

    <Text style={styles.subtitle}>Let’s set up your personalized savings journey.</Text>

    <TouchableOpacity style={styles.cta} onPress={onNext} activeOpacity={0.8}>
      <MaterialIcons name="arrow-forward" size={28} color="#0ECF8E" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 100,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  headline: {
    marginTop: 34,
  },
  line: {
    fontSize: 40,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 42,
  },
  emphasis: {
    color: '#0ECF8E',
    fontSize: 48,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 12,
    color: '#8A8A8A',
    fontSize: 14,
  },
  cta: {
    marginTop: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#0ECF8E',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
});

export default StepWelcome;