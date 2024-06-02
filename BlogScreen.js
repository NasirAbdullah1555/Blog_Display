import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import blogPosts from './blogPosts.json';

const BlogScreen = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setPosts(blogPosts);
    setFilteredPosts(blogPosts); 
  }, []);

  useEffect(() => {
    
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts); 
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const toggleSeeMore = (postId) => {
    setFilteredPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, isExpanded: !post.isExpanded };
        } else {
          return post;
        }
      });
    });
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {item.isExpanded ? (
          <>
            <Text style={styles.content}>{item.content}</Text>
            <TouchableOpacity onPress={() => toggleSeeMore(item.id)}>
              <Text style={styles.seeMore}>See Less</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.content}>{item.content.substring(0, 100)}</Text>
            <TouchableOpacity onPress={() => toggleSeeMore(item.id)}>
              <Text style={styles.seeMore}>See More</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchInput: {
    height: 40,
    marginTop:20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  postContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  seeMore: {
    color: 'blue',
    marginTop: 5,
  },
});

export default BlogScreen;
