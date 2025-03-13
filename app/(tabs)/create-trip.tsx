import React, { useState } from 'react';
import { Link } from 'expo-router'

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function CreateTrip({ navigation }: any) {
  const [isPopUpVisible, setPopUpVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setPopUpVisible(true)}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>

      {/* Pop-Up Modal */}
      <Modal
        visible={isPopUpVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPopUpVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.popUp}>
          <TouchableOpacity style={styles.optionButton}>
      <Link href="/create-trip/create-travel-plan" style={styles.optionButtonText}>
        Travel Plan
      </Link>
    </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => console.log('Guide clicked')}
            >
              <Text style={styles.optionText}>Guide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  createButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popUp: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
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
optionButtonText: {
    color: '#fff',
    fontSize: 16,
},
});