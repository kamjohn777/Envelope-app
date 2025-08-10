import React from "react";
import {
  useFonts,
  FredokaOne_400Regular,
} from "@expo-google-fonts/fredoka-one";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const StepBasic = ({ value, onChange, onNext, onBack }) => {
  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const set = (patch) => onChange({ ...value, ...patch });

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <MaterialIcons name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.greeting}>HELLO!</Text>
        <Text style={styles.question}>What's your name?</Text>

        <TextInput
          style={styles.input}
          value={value.name}
          onChangeText={(t) => set({ name: t })}
          placeholder="Name Here"
          placeholderTextColor="#8A8A8A"
        />

        <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.cta}
            onPress={onNext}
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 80,
  },
  greeting: {
    fontSize: 52,
    fontWeight: "900",
    color: "#0ECF8E",
    fontFamily: "FredokaOne_400Regular",
    marginBottom: 0,
  },
  question: {
    fontSize: 30,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#0ECF8E",
    borderRadius: 18,
    padding: 9,
    fontSize: 18,
    color: "#333333",
    marginBottom: 10,
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

export default StepBasic;
