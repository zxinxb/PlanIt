import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { Link } from 'expo-router';

const activities = [
  {
    id: '1',
    name: 'Cook SMV with Natali',
    price: '50 USD',
    image: 'https://your-image-link.com/cook.jpg',
    provider: 'Natali',
  },
  {
    id: '2',
    name: 'Boat Ride in Colombo',
    price: '30 USD',
    image: 'https://your-image-link.com/boat.jpg',
    provider: 'John',
  },
  {
    id: '3',
    name: 'Pottery Workshop',
    price: '40 USD',
    image: 'https://your-image-link.com/pottery.jpg',
    provider: 'Anna',
  },
];

export default function BookActivity() {
  const renderActivity = ({ item }: any) => (
    <Link
      href={{
        pathname: '/activity-details',
        params: { activity: JSON.stringify(item) },
      }}
      style={styles.activityCard}
    >
      <Image source={require("../../assets/images/background-image.jpeg")} style={styles.activityImage} />
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
      />
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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