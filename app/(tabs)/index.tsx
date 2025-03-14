import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, useWindowDimensions, KeyboardAvoidingView, Platform, ImageBackground, TouchableOpacity } from 'react-native';
import { fetchWeather } from '@/hooks/useWeather';
import debounce from 'lodash/debounce';
import LottieView from 'lottie-react-native';
import { WeatherCard } from '@/components/WeatherCard';
import HomeScreen from '@/screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Index = () => {
  const { width } = useWindowDimensions();
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showHome, setShowHome] = useState(true);

  // const [showSearchBar, setShowSearchBar] = useState(false);

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
    if (city.trim()) {
      debouncedLoadWeather(city);
    }
    return () => debouncedLoadWeather.cancel();
  }, [city, debouncedLoadWeather]);

  const handleSearch = () => {
    if (city.trim()) {
      loadWeather(city);
    }
  };

  const handleNavigate = (weatherData: any) => {
    if (weatherData) {
      setWeather(weatherData); 
      setShowHome(false); 
    } else {
      setShowHome(false); 
    }
  };

  return (
    <ImageBackground source={require('@/assets/images/bg.jpg')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        {showHome ? (
          <HomeScreen onNavigate={handleNavigate} />
        ) : (
          <>
            {/* Search Bar Moved Above Weather Card */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search city..."
                placeholderTextColor="#ccc"
                value={city}
                onChangeText={setCity}
                onSubmitEditing={() => loadWeather(city)}
              />
              <Icon name="search" size={20} color="#fff" style={styles.icon}  />
            </View>

            {loading ? (
              <LottieView source={require('@/assets/loading.json')} autoPlay loop style={styles.animation} />
            ) : error ? (
              <Text style={styles.error}>{error}</Text>
            ) : (
              weather && <WeatherCard city={weather.name} temp={weather.main.temp} description={weather.weather[0].description} speed={weather.wind.speed}  humidity={weather.main.humidity}/>
            )}
          </>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
    
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 45,
    width: '90%', // Responsive width
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#fff',
    
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
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

export default Index;