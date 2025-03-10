import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import LottieView from 'lottie-react-native';

interface WeatherCardProps {
  city: string;
  temp: number;
  description: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ city, temp, description }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.card, { width: width * 0.8 }]}>
      <LottieView
        source={require('@/assets/weather.json')} 
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
    backgroundColor: '#4facfe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  animation: {
    width: '40%',
    height: 120,
  },
  city: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
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
    textAlign: 'center',
  },
});
