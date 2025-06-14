import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import hotels from '../consts/hotel';
import { useBooking } from '../context/BookingContext';

const { width } = Dimensions.get('screen');

const BottomNav = ({ navigation }) => {
  const { bookings } = useBooking();

  return (
    <View style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
      backgroundColor: '#FFF', flexDirection: 'row',
      justifyContent: 'space-around', alignItems: 'center',
      borderTopWidth: 1, borderTopColor: '#F2F2F7', shadowOpacity: 0.1,
      shadowRadius: 8, elevation: 10
    }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ alignItems: 'center' }}>
        <Icon name="home" size={28} color="#4A90E2" />
        <Text style={{ fontSize: 12, color: '#4A90E2', marginTop: 4, fontWeight: '600' }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('BookingList')} style={{ alignItems: 'center' }}>
        <Icon name="shopping-bag" size={28} color={bookings.length > 0 ? '#4A90E2' : '#8E8E93'} />
        <Text style={{ fontSize: 12, color: bookings.length > 0 ? '#4A90E2' : '#8E8E93', marginTop: 4 }}>Booking</Text>
        {bookings.length > 0 && (
          <View style={{
            position: 'absolute', top: -2, right: -10,
            backgroundColor: '#FF3B30', borderRadius: 8,
            width: 16, height: 16, justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {bookings.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ alignItems: 'center' }}>
        <Icon name="person-outline" size={28} color="#8E8E93" />
        <Text style={{ fontSize: 12, color: '#8E8E93', marginTop: 4 }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = React.useState('Hotel');
  const [showAllHotels, setShowAllHotels] = React.useState(false);

  const tabs = [
    { name: 'Hotel', icon: 'hotel' },
    { name: 'Flight', icon: 'flight' },
    { name: 'Place', icon: 'place' },
    { name: 'Food', icon: 'restaurant' }
  ];

  const TabButton = ({ tab }) => (
    <TouchableOpacity
      onPress={() => setSelectedTab(tab.name)}
      style={{
        flex: 1, paddingVertical: 16, borderRadius: 12, alignItems: 'center',
        backgroundColor: selectedTab === tab.name ? '#4A90E2' : 'transparent'
      }}>
      <Icon name={tab.icon} size={24} color={selectedTab === tab.name ? '#FFF' : '#8E8E93'} />
      <Text style={{
        fontSize: 12, fontWeight: '600', marginTop: 4,
        color: selectedTab === tab.name ? '#FFF' : '#8E8E93'
      }}>{tab.name}</Text>
    </TouchableOpacity>
  );

  const HotelCard = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', item)}
      style={{
        width: (width - 60) / 2,
        marginRight: index % 2 === 0 ? 20 : 0,
        marginBottom: 20,
        borderRadius: 16,
        backgroundColor: '#FFF',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5
      }}>
      <View style={{ position: 'relative' }}>
        <Image source={item.image} style={{
          width: '100%', height: 140,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16
        }} />
        <View style={{
          position: 'absolute', top: 12, right: 12,
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 20, paddingHorizontal: 8,
          paddingVertical: 4, flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={{ color: '#FFF', fontSize: 12, marginLeft: 2, fontWeight: '600' }}>4.9</Text>
        </View>
      </View>
      <View style={{ padding: 12 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1C1C1E',
          marginBottom: 4
        }}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Icon name="place" size={14} color="#8E8E93" />
          <Text style={{ fontSize: 12, color: '#8E8E93', marginLeft: 4 }}>{item.location}</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1C1C1E' }}>${item.price}/night</Text>
      </View>
    </TouchableOpacity>
  );

  const DealCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailScreen', item)}
      style={{
        marginHorizontal: 20, marginBottom: 20, borderRadius: 20, backgroundColor: '#FFF',
        shadowOpacity: 0.15, shadowRadius: 10, elevation: 8, overflow: 'hidden'
      }}>
      <View style={{ position: 'relative' }}>
        <Image source={item.image} style={{ width: '100%', height: 200 }} />
        <View style={{
          position: 'absolute', top: 16, left: 16, backgroundColor: '#FF6B6B',
          borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6
        }}>
          <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>25% OFF</Text>
        </View>
        <View style={{
          position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4, flexDirection: 'row', alignItems: 'center'
        }}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={{ color: '#FFF', fontSize: 12, marginLeft: 2, fontWeight: '600' }}>4.9</Text>
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 4 }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Icon name="place" size={16} color="#FFF" />
            <Text style={{ fontSize: 14, color: '#FFF', marginLeft: 4, opacity: 0.9 }}>{item.location}</Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}>${item.price}/night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const Header = () => (
    <View>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1C1C1E' }}>Where you{'\n'}wanna go?</Text>
          <TouchableOpacity style={{
            width: 44, height: 44, borderRadius: 22, backgroundColor: '#F2F2F7',
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Icon name="search" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        flexDirection: 'row', backgroundColor: '#F5F5F5', marginHorizontal: 20,
        marginTop: 25, borderRadius: 16, padding: 8
      }}>
        {tabs.map((tab, index) => <TabButton key={index} tab={tab} />)}
      </View>

      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20, marginTop: 30, marginBottom: 20
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1C1C1E' }}>Popular Hotels</Text>
        <TouchableOpacity onPress={() => setShowAllHotels(!showAllHotels)}>
          <Text style={{ fontSize: 14, color: '#4A90E2', fontWeight: '600' }}>
            {showAllHotels ? 'Show less' : 'See all'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20 }}>
        {(showAllHotels ? hotels : hotels.slice(0, 4)).map((hotel, index) =>
          <HotelCard key={index} item={hotel} index={index} />
        )}
      </View>

      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1E',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20
      }}>
        Hot Deals
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <FlatList
        data={hotels.slice(0, 5)}
        renderItem={({ item }) => <DealCard item={item} />}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;
