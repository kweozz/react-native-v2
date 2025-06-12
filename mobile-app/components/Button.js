import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style, textStyle, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.buttonPressed,
      ]}
    >
      {children}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#222020',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonPressed: {
    backgroundColor: '#444', // iets lichter bij indrukken
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Golos-Bold',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default Button;

