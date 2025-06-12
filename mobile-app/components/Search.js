import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = ({ value, onChange }) => (
  <View style={styles.container}>
     {/* search icon van de react library */}
    <Icon name="search" size={22} color="#888" style={styles.icon} /> 
    <TextInput
      style={styles.input}
      placeholder="Search tea's..."
      value={value}
      onChangeText={onChange}
      placeholderTextColor="#888"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 10,
    width: 'auto',
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#222020',
    backgroundColor: '#fff',
  },
});

export default Search;