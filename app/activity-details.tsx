import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function ActivityDetails() {
  const { activity }: any = useRouter();

  return (
    <View style={styles.container}>
      <Image source={{ uri: activity.image }} style={styles.activityImage} />
      <Text style={styles.activityName}>{activity.name}</Text>
      <Text style={styles.activityPrice}>{activity.price}</Text>
      <Text style={styles.activityProvider}>Provided by: {activity.provider}</Text>
      <Text style={styles.sectionHeader}>Reviews</Text>
      <TextInput style={styles.input} placeholder="Write a review..." />

      <Text style={styles.sectionHeader}>Send a Message</Text>
      <TextInput style={styles.input} placeholder="Type your message..." />

      <Text style={styles.sectionHeader}>Book Activity</Text>
      <TextInput style={styles.input} placeholder="Select a date..." />

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Pay & Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  activityImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  activityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityPrice: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  activityProvider: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});