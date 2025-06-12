import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CategoryPicker = ({ selectedCategory, onSelect, categories }) => (
  <View style={styles.container}>
    <Picker
      selectedValue={selectedCategory}
      onValueChange={onSelect}
      style={styles.picker}
    >
      <Picker.Item label ="All Categories" value="" />
      {categories.map((category) => (
        <Picker.Item key={category} label={category} value={category} />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    overflow: 'hidden', // zorgt dat de picker afgerond lijkt
    marginBottom: 10,
    borderWidth: 2,
    borderStyle: 'solid', // zorgt voor een zichtbare rand
    width: 'auto',
    marginHorizontal: 10,
  },

  picker: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },

});

export default CategoryPicker;