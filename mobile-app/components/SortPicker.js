import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SortPicker = ({ sortOption, onSortChange }) => (
  <View style={styles.container}>
    <Picker
      selectedValue={sortOption}
      onValueChange={onSortChange}
      style={styles.picker}
    >
      <Picker.Item label="Prijs oplopend" value="price-asc" />
      <Picker.Item label="Prijs aflopend" value="price-desc" />
      <Picker.Item label="Naam A-Z" value="name-asc" />
      <Picker.Item label="Naam Z-A" value="name-desc" />
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 20, paddingHorizontal: 10 },
  picker: {
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default SortPicker;