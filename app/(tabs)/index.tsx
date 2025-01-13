
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import { Link } from "expo-router";

export default function HomePage({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>PlanIt</Text>
        <TouchableOpacity onPress={() => console.log('Search clicked')}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={require("../../assets/images/background-image.jpeg")}
            style={styles.heroImage}
            contentFit= "cover"
          />
          <Text style={styles.heroText}>Get inspired for your trip to Sri Lanka</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Link href="/create-trip/create-travel-plan" style={styles.exploreButtonText}>
              Create new trip plan
            </Link>
          </TouchableOpacity>
        </View>

        {/* Featured Guides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Guides from Users</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.card} onPress={() => console.log('Guide clicked')}>
              <Image source={require("../../assets/images/destination2.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>The UpCountry Travel Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => console.log('Guide clicked')}>
              <Image source={require("../../assets/images/destination7.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Pinnawala Adventures</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => console.log('Guide clicked')}>
              <Image source={require("../../assets/images/destination9.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Solo Travel Guide to Unawatuna</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => console.log('Guide clicked')}>
              <Image source={require("../../assets/images/destination10.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Fun Things to do in Hikkaduwa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => console.log('Guide clicked')}>
              <Image source={require("../../assets/images/destination11.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Sigiriya Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => console.log('Guide clicked')}>
              <Image source={require("../../assets/images/destination12.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Relax in Mirissa</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Popular Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Activities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('activity-details')}>
              <Image source={require("../../assets/images/activity6.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Cook a SL Meal with Natalie</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('activity-details')}>
              <Image source={require("../../assets/images/activity11.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Unawatuna Boat Ride by AdvenBud</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('activity-details')}>
              <Image source={require("../../assets/images/activity7.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Scuba Diving with Sun Dive SL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('activity-details')}>
              <Image source={require("../../assets/images/activity8.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Gampaha Hot Air Balloon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('activity-details')}>
              <Image source={require("../../assets/images/activity9.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>SpeedBay Go Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('activity-details')}>
              <Image source={require("../../assets/images/activity10.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Surf with Leo</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Popular Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('destination-details')}>
              <Image source={ require("../../assets/images/destination1.jpeg") } style={styles.cardImage} />
              <Text style={styles.cardText}>Colombo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('destination-details')}>
              <Image source={require("../../assets/images/destination8.jpeg") } style={styles.cardImage} />
              <Text style={styles.cardText}>Ella</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('destination-details')}>
              <Image source={require("../../assets/images/destination3.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Kandy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('destination-details')}>
              <Image source={require("../../assets/images/destination4.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Sigiriya</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('destination-details')}>
              <Image source={require("../../assets/images/destination5.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Matara</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('destination-details')}>
              <Image source={require("../../assets/images/destination6.jpeg")} style={styles.cardImage} />
              <Text style={styles.cardText}>Nuwara Eliya</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center vertically
    justifyContent: "space-between", // Space out elements
    paddingHorizontal: 16, // Horizontal padding
    paddingVertical: 12, // Vertical padding
    height: 80,
    backgroundColor: "#fff", // Background color for the header
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur
  },
  appName: {
    fontSize: 20, // Font size for the title
    fontWeight: "bold", // Bold text

  },
  searchIcon: {
    fontSize: 18,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    
  },
  heroText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  exploreButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginRight: 15,
    width: 120,
    alignItems: 'center',
  },
  cardImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  cardText: {
    marginTop: 5,
    textAlign: 'center',
  },
});




