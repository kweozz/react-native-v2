import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.buttonPressed, // Apply pressed style
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#222020',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: '#5C5C5C', // Slightly lighter/different color when pressed
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;

