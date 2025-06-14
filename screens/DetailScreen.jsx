import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailScreen = ({ navigation, route }) => {
  const item = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const renderGalleryItem = ({ item: galleryItem, index }) => (
    <TouchableOpacity
      style={{
        marginRight: 10,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: selectedImageIndex === index ? 2 : 0,
        borderColor: COLORS.primary,
      }}
      onPress={() => setSelectedImageIndex(index)}
    >
      <Image source={galleryItem} style={{ width: 50, height: 50 }} resizeMode="cover" />
    </TouchableOpacity>
  );

  const renderAmenityItem = ({ item: amenity }) => (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text style={{ color: COLORS.primary, fontSize: 11, fontWeight: '500' }}>{amenity}</Text>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: COLORS.white, paddingBottom: 20 }}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)" />

      <ImageBackground
        style={{
          height: 350,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
          overflow: 'hidden',
        }}
        source={
          item.gallery && item.gallery.length > 0
            ? item.gallery[selectedImageIndex]
            : item.image
        }
      >
        <View
          style={{
            marginTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            justifyContent: 'space-between',
          }}
        >
          <Icon name="arrow-back-ios" size={24} color={COLORS.white} onPress={navigation.goBack} />
          <View style={{ flexDirection: 'row' }}>
            {item.featured && (
              <Icon name="star" size={24} color={COLORS.orange} style={{ marginRight: 8 }} />
            )}
            <Icon name="bookmark-border" size={24} color={COLORS.white} />
          </View>
        </View>

        {item.category && (
          <View
            style={{
              position: 'absolute',
              bottom: 15,
              left: 20,
              backgroundColor: 'rgba(0,0,0,0.7)',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 11, fontWeight: 'bold' }}>
              {item.category}
            </Text>
          </View>
        )}
      </ImageBackground>

      <View
        style={{
          position: 'absolute',
          top: 320,
          right: 20,
          height: 50,
          width: 50,
          backgroundColor: COLORS.primary,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name="place" color={COLORS.white} size={24} />
      </View>

      <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.dark }}>{item.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Icon name="location-on" size={14} color={COLORS.grey} />
          <Text style={{ fontSize: 13, color: COLORS.grey, marginLeft: 5 }}>{item.location}</Text>
        </View>

        {item.distance && (
          <Text style={{ fontSize: 11, color: COLORS.primary, marginTop: 3 }}>{item.distance}</Text>
        )}

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  name="star"
                  size={16}
                  color={index < Math.floor(item.rating || 4) ? COLORS.orange : COLORS.grey}
                />
              ))}
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 6 }}>
              {item.rating || '4.0'}
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: COLORS.grey }}>{item.reviews || 365} reviews</Text>
        </View>

        {item.gallery?.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Gallery</Text>
            <FlatList
              data={item.gallery}
              renderItem={renderGalleryItem}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>About</Text>
          <Text style={{ lineHeight: 20, color: COLORS.grey, fontSize: 13 }}>{item.details}</Text>
        </View>

        {item.amenities?.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Amenities</Text>
            <FlatList
              data={item.amenities}
              renderItem={renderAmenityItem}
              keyExtractor={(amenity, index) => index.toString()}
              numColumns={3}
              scrollEnabled={false}
            />
          </View>
        )}

        {item.roomTypes?.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Room Types</Text>
            {item.roomTypes.map((roomType, index) => (
              <Text key={index} style={{ fontSize: 12, color: COLORS.grey, marginBottom: 3 }}>
                • {roomType}
              </Text>
            ))}
          </View>
        )}

        {(item.checkIn || item.checkOut) && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Check-in Info</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {item.checkIn && (
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: COLORS.dark }}>Check-in</Text>
                  <Text style={{ fontSize: 12, color: COLORS.grey, marginTop: 3 }}>{item.checkIn}</Text>
                </View>
              )}
              {item.checkOut && (
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: COLORS.dark }}>Check-out</Text>
                  <Text style={{ fontSize: 12, color: COLORS.grey, marginTop: 3 }}>{item.checkOut}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View
          style={{
            marginTop: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Price per night</Text>
          <View
            style={{
              height: 40,
              alignItems: 'center',
              paddingLeft: 15,
              flex: 1,
              backgroundColor: COLORS.secondary,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              flexDirection: 'row',
              marginLeft: 30,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>
              ${item.price}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: '500', color: COLORS.grey, marginLeft: 6 }}>
              +breakfast
            </Text>
          </View>
        </View>

        {/* ✅ Booking Button */}
        <TouchableOpacity
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
            backgroundColor: COLORS.primary,
            borderRadius: 12,
          }}
          onPress={() =>
            navigation.navigate('Booking', {
              hotelName: item.name,
              hotelAddress: item.location,
            })
          }
        >
          <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: 'bold' }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
