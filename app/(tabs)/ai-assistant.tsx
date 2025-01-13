import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, FlatList, ScrollView } from 'react-native';
import MapView from 'react-native-maps'; // For map (use expo-map if required)

export default function AIAssistant() {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const exampleQuestions = [
    "Best places to eat in Matara",
    "3-day itinerary to Kandy",
    "Top attractions in Ella",
  ];

  const sendQuestion = async () => {
    setLoading(true);
    try {
      const result = await fetch('http://192.168.8.191:3000/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await result.json();
      setResponse(data.answer);
    } catch (error) {
      console.error('Error communicating with AI:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Background Map */}
      <MapView style={styles.map} />

      {/* Modal for AI Assistant */}
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openButtonText}>Open AI Assistant</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modal}>
          <ScrollView>
          <Text style={styles.header}>AI Assistant</Text>
          <FlatList
            data={exampleQuestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.exampleButton}
                onPress={() => setInput(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TextInput
            style={styles.input}
            placeholder="Ask any travel-related question..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendQuestion}
            disabled={loading}
          >
            <Text style={styles.sendButtonText}>
              {loading ? 'Loading...' : 'Send'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          {response && (
            <View style={styles.responseContainer}>
              <Text style={styles.responseText}>{response}</Text>
            </View>
          )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  openButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exampleButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});
