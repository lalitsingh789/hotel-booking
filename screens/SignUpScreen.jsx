import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import Checkbox from 'expo-checkbox';
import { signupValidationSchema } from '../utils/validation';
import { userStore } from '../utils/authData'; // Import shared object

const SignupScreen = ({ navigation }) => {
  const handleSignup = (values) => {
    console.log('Registered:', values);
    userStore.fullName = values.fullName;
    userStore.email = values.email;
    userStore.password = values.password;

    Alert.alert('Success', 'User registered successfully');
    navigation.navigate('Login');
  };

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      }}
      validationSchema={signupValidationSchema}
      onSubmit={handleSignup}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5087/5087576.png' }}
            style={{ width: 120, height: 120, marginBottom: 30 }}
            resizeMode="contain"
          />

          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>Register</Text>
          <Text style={{ color: 'gray', marginBottom: 20 }}>Please register to continue</Text>

          <TextInput
            placeholder="Full Name"
            onChangeText={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            value={values.fullName}
            style={styles.input}
          />
          {touched.fullName && errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            style={styles.input}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            style={styles.input}
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            style={styles.input}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}

          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 20 }}>
            <Checkbox
              value={values.acceptTerms}
              onValueChange={() => setFieldValue('acceptTerms', !values.acceptTerms)}
              color={values.acceptTerms ? '#0D1B2A' : undefined}
              style={{ width: 18, height: 18, marginRight: 10 }}
            />
            <Text>I accept the Terms & Conditions</Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#0D1B2A',
              paddingVertical: 15,
              paddingHorizontal: 50,
              borderRadius: 30,
              marginBottom: 20,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={{ color: 'gray' }}>
            Already have an account?
            <Text style={{ color: '#0D1B2A', fontWeight: 'bold' }} onPress={() => navigation.navigate('Login')}>
              {' '}LOGIN
            </Text>
          </Text>
        </View>
      )}
    </Formik>
  );
};

const styles = {
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
};

export default SignupScreen;
