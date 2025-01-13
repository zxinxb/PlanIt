import React, { useState } from 'react';


import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

export default function CreateTravelPlan() {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSaveDates = () => {
    setDatePickerVisible(false);
    console.log('Dates Saved:', { startDate, endDate });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plan a New Trip</Text>
      <TextInput
        style={styles.input}
        placeholder="Where to? e.g., Colombo, Ella"
      />
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={styles.dateText}>
          Start Date: {startDate || 'Select Date'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={styles.dateText}>
          End Date: {endDate || 'Select Date'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Planning</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <Modal
        visible={isDatePickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDatePickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.datePicker}>
            <Text style={styles.modalTitle}>Select Dates</Text>
            <TextInput
              style={styles.dateInput}
              placeholder="Start Date (YYYY-MM-DD)"
              value={startDate}
              onChangeText={setStartDate}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="End Date (YYYY-MM-DD)"
              value={endDate}
              onChangeText={setEndDate}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveDates}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
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
  datePicker: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});