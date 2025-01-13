import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import axios, { AxiosError } from 'axios';

interface Activity {
  id: string;
  name: string;
  price: string;
  image: string;
  provider: string;
}

export default function BookActivity() {
  const [activities, setActivities] = useState<Activity[]>([
    // Default activities for initial display
    {
      id: '1',
      name: 'Cooking Class with Natali',
      price: '4500 LKR',
      image: 'https://your-image-link.com/cooking.jpg',
      provider: 'Natali',
    },
    {
      id: '2',
      name: 'Boat Ride in Colombo',
      price: '1000 LKR',
      image: 'https://your-image-link.com/boat.jpg',
      provider: 'John',
    },
    {
      id: '3',
      name: 'Pottery Workshop',
      price: '5000 LKR',
      image: 'https://your-image-link.com/pottery.jpg',
      provider: 'Anna',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchActivities = async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get<Activity[]>('http://192.168.8.191:5000/activities', {
        params: { search: query },
      });
      setActivities(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error:', error.message);
      } else {
        console.error('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const renderActivity = ({ item }: { item: Activity }) => (
    <Link
      href={{
        pathname: '/activity-details',
        params: { activity: JSON.stringify(item) },
      }}
      style={styles.activityCard}
    >
      <Image
        source={item.image ? { uri: item.image } : require('../../assets/images/background-image.jpeg')}
        style={styles.activityImage}
      />
      <View style={styles.activityInfo}>
        <Text style={styles.activityName}>{item.name}</Text>
        <Text style={styles.activityPrice}>{item.price}</Text>
      </View>
    </Link>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search activities..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          fetchActivities(text);
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList<Activity>
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={renderActivity}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: '#333',
  },
  list: {
    paddingBottom: 20,
  },
  activityCard: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  activityImage: {
    width: 100,
    height: 100,
  },
  activityInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activityPrice: {
    fontSize: 16,
    color: '#666',
  },
});



