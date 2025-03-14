import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
    const [error, setError] = useState("");
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            setError("Permission to access location was not granted");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        if (location?.coords) {
            const { latitude, longitude } = location.coords;
            console.log("Latitude and Longitude:", latitude, longitude);
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);

            let response = await Location.reverseGeocodeAsync({ latitude, longitude });
            console.log("User Location:", response);
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    return { latitude, longitude, error };
};

export default useLocation;
