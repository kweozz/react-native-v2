import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';


/* content containerstyle inplaatsvan style omdat de scrollview niet de hele scherm pakt */

const AboutScreen = () => (
  <ScrollView contentContainerStyle={styles.container}> 

    <Text style={styles.heading}>About Us</Text>
    <Image
      source={require('../assets/aboutusteaflow.png')} 
      style={styles.hero}
      resizeMode="cover"
      alt="Teaflow Hero Image"
    />
   
    <Text style={styles.intro}>
      At Teaflow, we believe in the power of tea to connect, inspire, and energize. Our mission is to bring you the finest selection of teas from around the world, carefully curated for every taste and moment.
    </Text>
     <View style={styles.story}>
    <Text style={styles.sectionTitle}>Our Story</Text>
    <Text style={styles.text}>
      For my exam mobile i build an app for for Teaflow. Teaflow is a company that specializes in high-quality, organic teas sourced from around the world. 
    </Text>
    </View>
    <View style={styles.contact}>
    <Text style={styles.sectionTitle}>Contact</Text>
    <Text style={styles.text}>
      Do you have questions or want to collaborate? Feel free to reach out to us!
      Email: r0771028@student.thomasmore.be
    </Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontFamily: 'Golos-Bold',
    fontSize: 44,
    marginTop: 64,
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 20,
    color: '#222020',
  },
  hero: {
    width: '100%',
    height: 200, 
    borderRadius: 10,
    marginBottom: 24,
  },
  intro: {
    fontSize: 18,
    fontFamily: 'Golos-Bold',
    color: '#fff',
    marginBottom: 24,
    lineHeight: 26,
    textTransform: 'uppercase',
    backgroundColor: '#222020',
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Golos-Bold',
    color: '#222020',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Golos-Regular',
    color: '#222020',
    marginBottom: 16,
    lineHeight: 24,
  },
  story: {
    backgroundColor: '#ccc',
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
  },
  contact: {
    borderColor: '#222020',
    borderWidth: 2,
    
    padding: 16,
    borderRadius: 10,
  },
});

export default AboutScreen;