import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';


export default function TabsLayout() {
  const [isCreateTripModalVisible, setCreateTripModalVisible] = useState(false);

  const openCreateTripModal = () => setCreateTripModalVisible(true);
  const closeCreateTripModal = () => setCreateTripModalVisible(false);

  return (
    <>
      {/* Tabs Navigator */}
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/icons/home-2.png")} // Path to your custom icon
                style={{
                  width: size, // Dynamically set the size from the tabBarIcon props
                  height: size,
                  tintColor: color, // Use the color prop to tint the image dynamically
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="book-activity"
          options={{
            title: 'Activity',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/icons/calendar.png")} // Path to your custom icon
                style={{
                  width: size, // Dynamically set the size from the tabBarIcon props
                  height: size,
                  tintColor: color, // Use the color prop to tint the image dynamically
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create-trip"
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                style={styles.createTripButton}
                onPress={openCreateTripModal}
              >
                <Ionicons name="add-circle" size={45} color="#FF6347" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="user-account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/icons/frame.png")} // Path to your custom icon
                style={{
                  width: size, // Dynamically set the size from the tabBarIcon props
                  height: size,
                  tintColor: color, // Use the color prop to tint the image dynamically
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ai-assistant"
          options={{
            title: 'AI Assistant',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/icons/story.png")} // Path to your custom icon
                style={{
                  width: size, // Dynamically set the size from the tabBarIcon props
                  height: size,
                  tintColor: color, // Use the color prop to tint the image dynamically
                }}
              />
            ),
          }}
        />
      </Tabs>

      {/* Create Trip Modal */}
      <Modal
        visible={isCreateTripModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeCreateTripModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                closeCreateTripModal();
                console.log('Navigate to Create Travel Plan');
              }}
            >
              <Text style={styles.optionText}>Travel Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                closeCreateTripModal();
                console.log('Guide clicked');
              }}
            >
              <Text style={styles.optionText}>Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeCreateTripModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  createTripButton: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -10, // Raise the button slightly
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});