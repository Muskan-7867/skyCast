import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface WeatherCardProps {
  city: string;
  temp: number;
  description: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ city, temp, description }) => {
  return (
    <View style={styles.card}>
      <LottieView
        source={require('@/assets/weather.json')} // Ensure the correct path to Lottie file
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4facfe', // Add a solid background color instead of gradient
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    width: 250,
  },
  animation: {
    width: 120,
    height: 120,
  },
  city: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
});
