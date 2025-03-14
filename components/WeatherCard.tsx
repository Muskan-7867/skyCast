import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import LottieView from 'lottie-react-native';

interface WeatherCardProps {
  city: string;
  temp: number;
  description: string;
  speed: number;
  humidity: number;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ city, temp, description, speed, humidity }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.card, { width: width * 0.85 }]}>
      <LottieView
        source={require('@/assets/weather.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.description}>{description}</Text>

      {/* Wind Speed and Humidity Row */}
      <View style={styles.row}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Wind</Text>
          <Text style={styles.value}>{speed} Km/h</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Humidity</Text>
          <Text style={styles.value}>{humidity}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    marginTop: 80,
  },
  animation: {
    width: 120,
    height: 120,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  temp: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  label: {
    fontSize: 14,
    color: '#ddd',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
});
