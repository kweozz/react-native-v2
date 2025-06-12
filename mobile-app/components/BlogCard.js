import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const BlogCard = ({ blog, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(blog)}>
      {blog.image && <Image source={blog.image} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.title}>{blog.title}</Text>
        <Text style={styles.date}>{blog.date}</Text>
        <Text style={styles.description}>{blog.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  date: { fontSize: 14, color: '#888', marginBottom: 5 },
  title: {
    fontSize: 18,
    fontFamily: 'Golos-Bold',
    color: '#222020',
    textTransform: 'uppercase',
  },
  description: { 
    fontSize: 14, color: '#222020',
    marginBottom: 10,
    fontFamily: 'Golos-Regular',
    lineHeight: 20,
   },
});

export default BlogCard;
