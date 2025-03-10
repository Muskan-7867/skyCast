import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { fetchWeather } from '@/hooks/useWeather';
import debounce from 'lodash/debounce';
import LottieView from 'lottie-react-native';
import { WeatherCard } from '@/components/WeatherCard';

export default function Index() {
  const { width } = useWindowDimensions();
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('London');
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(cityName);
      if (data.cod !== 200) throw new Error(data.message || 'Invalid city name');
      setWeather(data);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch weather data');
      console.error('Weather API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoadWeather = useCallback(debounce(loadWeather, 500), [city]);

  useEffect(() => {
    debouncedLoadWeather(city);
    return () => debouncedLoadWeather.cancel();
  }, [city, debouncedLoadWeather]);

  const handleSearch = () => {
    if (city.trim()) {
      loadWeather(city);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
   {loading ? (
        <LottieView source={require('@/assets/loading.json')} autoPlay loop style={styles.animation} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        weather && <WeatherCard city={weather.name} temp={weather.main.temp} description={weather.weather[0].description} />
      )}
         <View style={[styles.searchContainer, { width: width * 0.9 }]}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </KeyboardAvoidingView>
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
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 80,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      flex: 1,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginRight: 10,
    },
    error: {
      color: 'red',
      marginTop: 20,
      fontSize: 16,
      textAlign: 'center',
    },
    animation: {
      width: 150,
      height: 150,
    },
  });
  
