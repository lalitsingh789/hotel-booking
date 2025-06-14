import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { userStore } from '../utils/authData';

const ProfileScreen = ({ navigation }) => {
  const { fullName, email } = userStore;

  const handleLogout = () => {
    userStore.fullName = '';
    userStore.email = '';
    navigation.navigate('Login');
  };

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      padding: 30,
      backgroundColor: '#fff',
    }}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          marginBottom: 20,
        }}
      />
      <Text style={{
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
      }}>Profile</Text>

      <View style={{ alignSelf: 'stretch', paddingHorizontal: 10 }}>
        <Text style={{ color: 'gray', fontSize: 14, marginTop: 15 }}>Full Name</Text>
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#0D1B2A' }}>
          {fullName || 'N/A'}
        </Text>

        <Text style={{ color: 'gray', fontSize: 14, marginTop: 15 }}>Email</Text>
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#0D1B2A' }}>
          {email || 'N/A'}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginTop: 40,
          backgroundColor: '#0D1B2A',
          paddingVertical: 15,
          paddingHorizontal: 50,
          borderRadius: 30,
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
