import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { userStore } from '../utils/authData'; // Import shared credentials

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password');
      return;
    }

    try {
      setLoading(true);

      // Check against stored credentials
      if (username === userStore.email && password === userStore.password) {
        Alert.alert('Login Success', 'You are now logged in');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5087/5087579.png' }}
        style={{ width: 120, height: 120, marginBottom: 30 }}
        resizeMode="contain"
      />

      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>Login</Text>
      <Text style={{ color: 'gray', marginBottom: 20 }}>Please sign in to continue</Text>

      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 10,
          marginBottom: 15
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 10,
          marginBottom: 15
        }}
      />

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 20,
      }}>
        <Checkbox
          value={rememberMe}
          onValueChange={() => setRememberMe(!rememberMe)}
          color={rememberMe ? '#0D1B2A' : undefined}
          style={{ marginRight: 8, width: 18, height: 18 }}
        />
        <Text style={{ fontSize: 16 }}>Remember me</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#0D1B2A',
          paddingVertical: 15,
          paddingHorizontal: 50,
          borderRadius: 30,
          marginBottom: 20
        }}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {loading ? 'Logging in...' : 'LOGIN'}
        </Text>
      </TouchableOpacity>

      <Text style={{ color: 'gray' }}>
        Don't have an account?
        <Text
          style={{ color: '#0D1B2A', fontWeight: 'bold' }}
          onPress={() => navigation.navigate('Signup')}
        >
          {' '}Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
