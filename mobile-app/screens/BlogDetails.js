import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const BlogDetails = ({ route, navigation }) => {
  const { blogId } = route.params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.webflow.com/v2/collections/67bcde1d3ccada6a40b85496/items/${blogId}`, {
      headers: {
        Authorization: 'Bearer d075944cfe6d8779aeae94bf6a17e25ee464b3cc35bc8e83dd7284c7fbf0e6dd'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.item) {
          setBlog({
            title: data.item.fieldData.name,
            description: data.item.fieldData['post-summary'],
            content: data.item.fieldData['post-content'] || '',
            date: new Date(data.item.createdOn).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' }),
            image: data.item.fieldData['main-image'] ? { uri: data.item.fieldData['main-image'].url } : null,
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [blogId]);

  useEffect(() => {
    if (blog) {
      navigation.setOptions({ title: blog.title });
    }
  }, [blog, navigation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!blog) {
    return (
      <View style={styles.center}>
        <Text>Blog niet gevonden.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {blog.image && <Image source={blog.image} style={styles.image} />}
      <Text style={styles.date}>{blog.date}</Text>
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.description}>{blog.description}</Text>
      <Text style={styles.content}>{blog.content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  date: { fontSize: 14, color: '#888', marginBottom: 5 },
  title: { fontSize: 28, fontFamily: 'Golos-Bold', marginBottom: 10, color: '#222020', textTransform: 'uppercase' },
  description: { fontSize: 16, color: '#666', marginBottom: 20 },
  content: { fontSize: 16, color: '#222020', lineHeight: 24 },
});

export default BlogDetails;