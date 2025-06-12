import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
//picker in een view component als workaround omdat je geen styles kunt toepassen op de picker zelf
// dit zorgt ervoor dat de picker een afgeronde border heeft en een achtergrondkleur
const SortPicker = ({ sortOption, onSortChange }) => (
  <View style={styles.pickerWrapper}> 
    <Picker
      selectedValue={sortOption}
      onValueChange={onSortChange}
      style={styles.picker}
      itemStyle={styles.pickerItem}
    >
      <Picker.Item label="price " value="price-asc" style={styles.pickerItem} />
      <Picker.Item label="Prijs aflopend" value="price-desc" style={styles.pickerItem} />
      <Picker.Item label="Naam A-Z" value="name-asc" style={styles.pickerItem} />
      <Picker.Item label="Naam Z-A" value="name-desc" style={styles.pickerItem} />
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  pickerWrapper: {
       backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    overflow: 'hidden', // zorgt dat de picker afgerond lijkt
    marginBottom: 20,
    borderWidth: 2,
    borderStyle: 'solid', // zorgt voor een zichtbare rand
    width: 'auto',
    marginHorizontal: 10,
  },
  picker: {
    width: '100%',
    color: '#222020',
    // fontSize: 16, // werkt niet op Android
    // fontFamily: 'Golos-Regular', // werkt niet op Android  
    // Op Android werkt fontSize niet in de Picker, dus we gebruiken alleen kleur
    // Op iOS werkt fontFamily soms, maar niet altijd, dus we laten het weg
    // fontFamily werkt meestal niet!
  },
  pickerItem: {
    fontSize: 16,
    color: '#222020',
    // fontFamily werkt alleen soms op iOS
  },
});

export default SortPicker;