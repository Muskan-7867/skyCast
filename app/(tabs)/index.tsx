import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator , TextInput, Button} from 'react-native';
import { fetchWeather } from '@/hooks/useWeather';
import debounce from 'lodash/debounce';
import LottieView from 'lottie-react-native';
import { WeatherCard } from '@/components/WeatherCard';

export default function index() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('London');
  const [error, setError] = useState<string | null>(null);

const loadWeather = async (cityName: string) => {
  setLoading(true);
  setError(null);
  try {
    const data = await fetchWeather(cityName);
    setWeather(data);
  } catch (error) {
    setError('Failed to fetch weather data');
      console.error(error);
    
  }
  finally {
    setLoading(false);
  }
}
const debouncedLoadWeather = useCallback(debounce(loadWeather, 500), []);

useEffect(() => {
  debouncedLoadWeather(city);
}, [city, debouncedLoadWeather]);

const handleSearch = () => {
  if (city.trim()) {
    loadWeather(city);
  }
};

  return (
    <View style={styles.container}>
       <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={handleSearch} />

      {loading ? (
        <LottieView
          source={require('@/assets/loading.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        weather && (
          <>
            <LottieView
              source={require('@/assets/weather.json')}
              autoPlay
              loop
              style={styles.weatherAnimation}
            />
            <WeatherCard
              city={weather.name}
              temp={weather.main.temp}
              description={weather.weather[0].description}
            />
          </>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  animation: {
    width: 200,
    height: 200,
  },
  weatherAnimation: {
    width: 150,
    height: 150,
  },
});
