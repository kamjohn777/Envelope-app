import React from 'react';
// import { useFonts, LuckiestGuy_400Regular } from 'expo-font';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// import { useFonts, LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';


const StepWelcome = ({ onNext }) => (
  
  // const [fontsLoaded] = useFonts({
  //   LuckiestGuy_400Regular,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

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

    {/* <view style={styles.ctaContainer}> */}
    <View style={styles.innerContainer}>
    <TouchableOpacity 
      style={styles.cta} 
      onPress={onNext} 
      activeOpacity={0.8}
    >
      <MaterialIcons name="arrow-forward" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  </View>
    {/* </view> */}
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
    fontSize: 47,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 55,
  },
  emphasis: {
    color: '#0ECF8E',
    fontSize: 52,
    fontWeight: '900',
    // fontFamily: 'LuckiestGuy_400Regular'
  },
  subtitle: {
    marginTop: 12,
    color: '#8A8A8A',
    fontSize: 14,
  },
  innerContainer: {
    marginTop: 16,
    borderColor: '#0ECF8E',
    width: 65,
    height: 65,
    borderRadius:100,
    borderWidth: 2,
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
    backgroundColor: '#0ECF8E',
    position: 'relative',
    top: -13,
    left: 3,
  },
});

export default StepWelcome;