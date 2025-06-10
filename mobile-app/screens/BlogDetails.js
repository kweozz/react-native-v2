import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Helper om HTML-tags te verwijderen
const stripHtml = (html) => {
  return html.replace(/<[^>]+>/g, '');
};

const BlogDetails = () => {
  const route = useRoute();
  const { blogId } = route.params;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.webflow.com/v2/collections/67bcde1d3ccada6a40b85496/items', {
      headers: {
        Authorization: 'Bearer d075944cfe6d8779aeae94bf6a17e25ee464b3cc35bc8e83dd7284c7fbf0e6dd',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.items.find((item) => item.id === blogId);
        if (found) {
          setBlog({
            title: found.fieldData.name,
            body: stripHtml(found.fieldData['post-body']),
            image: found.fieldData['main-image']
              ? { uri: found.fieldData['main-image'].url }
              : null,
            date: new Date(found.createdOn).toLocaleDateString(),
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fout bij ophalen blog:', err);
        setLoading(false);
      });
  }, [blogId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#222020" />
        <Text>Blog wordt geladen...</Text>
      </View>
    );
  }

  if (!blog) {
    return (
      <View style={styles.centered}>
        <Text>Blog niet gevonden.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.date}>{blog.date}</Text>
      {blog.image && <Image source={blog.image} style={styles.image} />}
      <Text style={styles.body}>{blog.body}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Golos-Bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    color: '#222020',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    fontFamily: 'Golos-Regular',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontFamily: 'Golos-Regular',
  },
});

export default BlogDetails;
