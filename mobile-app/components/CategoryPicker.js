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
      <Picker.Item label="Alle categorieën" value="" />
      {categories.map((category) => (
        <Picker.Item key={category} label={category} value={category} />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  picker: {
    height: 'auto',
    width: '50%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default CategoryPicker;