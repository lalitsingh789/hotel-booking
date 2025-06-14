import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useBooking } from '../context/BookingContext';

const { width } = Dimensions.get('screen');

const BookingListScreen = () => {
  const { bookings } = useBooking();

  const renderBooking = ({ item }) => (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 4,
        width: width - 32,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      }}
    >
      {/* Hotel Name and Address */}
      <Text style={{ fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 4 }}>
        {item.hotelName || 'Hotel Name'}
      </Text>
      <Text style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
        {item.hotelAddress || 'Hotel Address'}
      </Text>

      {/* Booking Status */}
      <View style={{
        backgroundColor: '#dcfce7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 12
      }}>
        <Text style={{ 
          fontSize: 12, 
          color: '#166534',
          fontWeight: '600'
        }}>
          {item.status || 'Confirmed'}
        </Text>
      </View>

      {/* Check-in and Check-out Dates */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
        <Icon name="calendar-month-outline" size={20} color="#0ea5e9" />
        <Text style={{ fontSize: 14, color: '#334155', marginLeft: 8 }}>
          {item.checkIn} → {item.checkOut} ({item.nights ?? 1} nights)
        </Text>
      </View>

      {/* Guests */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
        <Icon name="account-group-outline" size={20} color="#0ea5e9" />
        <Text style={{ fontSize: 14, color: '#334155', marginLeft: 8 }}>
          Adults: {item.adults ?? 0} | Children: {item.children ?? 0}
        </Text>
      </View>

      {/* Room Type */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
        <Icon name="bed-outline" size={20} color="#0ea5e9" />
        <Text style={{ fontSize: 14, color: '#334155', marginLeft: 8 }}>
          Room Type: {item.room || 'N/A'}
        </Text>
      </View>

      {/* Total Price */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Icon name="cash-multiple" size={20} color="#16a34a" />
        <Text style={{ fontSize: 14, color: '#16a34a', fontWeight: 'bold', marginLeft: 8 }}>
          Total: ${item.total ?? 0}
        </Text>
      </View>

      {/* Booking Date */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
        <Icon name="clock-outline" size={16} color="#64748b" />
        <Text style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>
          Booked on: {item.bookingDate ? new Date(item.bookingDate).toLocaleDateString() : 'N/A'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
      {bookings.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="calendar-remove" size={80} color="#cbd5e1" />
          <Text style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            color: '#64748b',
            marginTop: 20,
            marginBottom: 10
          }}>
            No Bookings Yet
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: '#94a3b8',
            textAlign: 'center'
          }}>
            Your hotel bookings will appear here once you make a reservation.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={renderBooking}
          contentContainerStyle={{ padding: 16, paddingTop: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default BookingListScreen;
