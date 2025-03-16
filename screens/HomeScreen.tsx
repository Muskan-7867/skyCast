import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import useLocation from '@/hooks/useLocation';
import { Feather } from '@expo/vector-icons';
import { fetchWeatherByCoords } from '@/hooks/useWeather';

interface HomeScreenProps {
  onNavigate: (weatherData: any) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { latitude, longitude, error } = useLocation();

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherByCoords(latitude, longitude)
        .then((data) => {
          if (data.cod === 200) {
            onNavigate(data);
          } else {
            console.error('Failed to fetch weather data:', data.message);
          }
        })
        .catch((error) => {
          console.error('Weather API Error:', error);
        });
    }
  }, [latitude, longitude, onNavigate]);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Feather name="map-pin" size={80} color="#fff" />
      </View>
      <Text style={styles.title}>Use Location</Text>
      <Text style={styles.desc}>
        When you click on the use location button, your location will be used to
        get your position and display the weather.
      </Text>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
   
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
  },
  iconWrapper: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  desc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default HomeScreen;