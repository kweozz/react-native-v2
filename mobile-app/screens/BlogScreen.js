import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BlogCard from '../components/BlogCard';

const BlogScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.webflow.com/v2/collections/67bcde1d3ccada6a40b85496/items', {
      headers: {
        Authorization: 'Bearer d075944cfe6d8779aeae94bf6a17e25ee464b3cc35bc8e83dd7284c7fbf0e6dd'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const mappedBlogs = data.items.map((item) => ({
            id: item.id, // <-- Gebruik 'id' i.p.v. '_id'
            title: item.fieldData.name,
            description: item.fieldData['post-summary'],
            date: new Date(item.createdOn).toLocaleDateString(),
            image: item.fieldData['main-image']
              ? { uri: item.fieldData['main-image'].url }
              : null,
            content: item.fieldData['post-body'], // <-- Correct veld
            slug: item.fieldData.slug,
          }));
          setBlogs(mappedBlogs);
        } else {
          console.error('No items found in the API response');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
        setLoading(false);
      });
  }, []);

  const handleBlogPress = (blog) => {
    navigation.navigate('BlogDetails', { blogId: blog.id });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading blogs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Journal</Text>
      <FlatList
        data={blogs}
        renderItem={({ item }) => (
          <BlogCard blog={item} onPress={handleBlogPress} />
        )}
        keyExtractor={(item) => item.id} 
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center', 
  },
  heading: {
    marginTop: 64,
    fontSize: 44,
    fontFamily: 'Golos-Bold',
    color: '#222020',
    textTransform: 'uppercase',
    marginBottom: 20,
    textAlign: 'left',
  },
  list: {
    paddingBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    fontFamily: 'Golos-Regular',

  },
});

export default BlogScreen;
