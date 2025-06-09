import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import Button from '../components/Button';

// Import local images
import whiteTeaImage from '../assets/white.webp';
import greenTeaImage from '../assets/green.jpeg';
import blackTeaImage from '../assets/black.webp';

const categories = [
  {
    id: '67d8627627222d6515eac4f1',
    name: 'White Tea',
    description: 'Teas that help you to find your inner calm and unwind.',
    image: whiteTeaImage, // Use imported image
  },
  {
    id: '67d864b242f2d5d651e4c0db',
    name: 'Green Tea',
    description: 'Refreshing teas to energize your day and boost your health.',
    image: greenTeaImage, // Use imported image
  },
  {
    id: '67d865b242f2d5d651e4c0dc',
    name: 'Black Tea',
    description: 'Rich and bold teas to awaken your senses and inspire focus.',
    image: blackTeaImage, // Use imported image
  },
];

const LandingPage = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog data from the API
    fetch('https://api.webflow.com/v2/collections/67bcde1d3ccada6a40b85496/items', {
      headers: {
        Authorization: 'Bearer d075944cfe6d8779aeae94bf6a17e25ee464b3cc35bc8e83dd7284c7fbf0e6dd',
        'accept-version': '1.0.0',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const mappedBlogs = data.items
            .map((item) => ({
              id: item._id,
              title: item.fieldData.name,
              summary: item.fieldData['post-summary'],
              date: item.createdOn, // Add the created date
              image: item.fieldData['main-image'] ? { uri: item.fieldData['main-image'].url } : null,
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (newest first)
            .slice(0, 3); // Get the latest 3 articles
          setBlogs(mappedBlogs);
        }
      })
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <ImageBackground
        source={require('../assets/hero.webp')} // Replace with your hero image path
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Text style={styles.heading}>Welcome to Teaflow</Text>
          <Text style={styles.subtitle}>
            Discover the finest selection of teas, carefully curated for every taste.
          </Text>
          <Button
            title="Shop Now"
            onPress={() => navigation.navigate('Shop')}
            style={styles.button}
          />
        </View>
      </ImageBackground>

      {/* Categories Carousel */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesHeading}>Choose Your Flow</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Shop', { selectedCategory: category.id })}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Blog Section */}
      <View style={styles.blogContainer}>
        <View style={styles.blogHeader}>
        <Text style={styles.blogHeading}>Journal</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Blog')}>
          <Text style={styles.blogLink}>Read all stories</Text>
        </TouchableOpacity>
        </View>
        {blogs.map((blog) => (
          <TouchableOpacity
            key={blog.id}
            style={styles.blogCard}
            onPress={() => navigation.navigate('BlogDetails', { blogId: blog.id })}
          >
            <Text style={styles.blogDate}>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
            <Text style={styles.blogTitle}>{blog.title}</Text>
            <View style={styles.divider} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  background: {
    height: 500,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a dark overlay for better text visibility
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 44,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 30,
    lineHeight: 24,
     fontFamily: 'Golos-Regular',
  },
  button: {
    backgroundColor: '#222020', 
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoriesContainer: {
    padding: 20,
  },
  categoriesHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
    color: '#222020',
  },
  carousel: {
    flexDirection: 'row',
  },
  categoryCard: {
    width: 200, // Fixed width for each card
    marginRight: 15, // Spacing between cards
  },
  categoryImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
  blogContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  blogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  blogHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#222020',
 
  },
  blogLink: {
    fontSize: 14,
    color: '#B8B7B7',
    textAlign: 'right',
  },
  blogCard: {
    marginBottom: 20,
  },
  blogDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222020',
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: '#B8B7B7',
    marginTop: 10,
  },
});

export default LandingPage;