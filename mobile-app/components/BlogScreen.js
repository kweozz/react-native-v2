import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const BlogScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog data from the correct Webflow API endpoint
    fetch('https://api.webflow.com/v2/collections/67bcde1d3ccada6a40b85496/items', {
      headers: {
        Authorization: 'Bearer d075944cfe6d8779aeae94bf6a17e25ee464b3cc35bc8e83dd7284c7fbf0e6dd'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const mappedBlogs = data.items.map((item) => ({
            id: item._id, // Unique ID for the blog post
            title: item.fieldData.name, // Blog title
            description: item.fieldData['post-summary'], // Blog summary
            date: new Date(item.createdOn).toLocaleDateString(), // Format the date
            image: item.fieldData['main-image']
              ? { uri: item.fieldData['main-image'].url }
              : null, // Main image URL
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

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

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
        renderItem={renderItem}
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
  },
  heading: {
    marginTop: 64,
    fontSize: 44,
    fontWeight: 'bold',
    color: '#222020',
    textTransform: 'uppercase',
    marginBottom: 20,
    textAlign: 'left',
  },
  list: {
    paddingBottom: 20,
  },
  postContainer: {
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
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222020',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});

export default BlogScreen;