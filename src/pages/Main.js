import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps'
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';
import { GOOGLE_API_KEY } from "react-native-dotenv";

function Main() {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [makers, setMakers] = useState([]);
    const [placeName, setPlaceName] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                });
            }
        }

        loadInitialPosition();
    }, []);

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }

    function getPlacesUrl(lat, long, radius, type, apiKey) {
        const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
        const location = `location=${lat},${long}&radius=${radius}`;
        const typeData = `&name=${type}`;
        const api = `&key=${apiKey}`;
        return `${baseUrl}${location}${typeData}${api}`;
    }

    async function getPlaces() {
        const { latitude, longitude } = currentRegion;
       
        const url = getPlacesUrl(latitude, longitude, 5000, placeName, GOOGLE_API_KEY);

        const result = await api.get(url);

        setMakers(result.data.results);
    }

    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                style={styles.map}>
                {makers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={
                            {
                                longitude: marker.geometry.location.lng,
                                latitude: marker.geometry.location.lat
                            }}>
                        <Image
                            style={styles.avatar}
                            source={marker.photos ? { uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${marker.photos[0].photo_reference}&sensor=false&maxheight=${marker.photos[0].height}&maxwidth=${marker.photos[0].width}&key=${GOOGLE_API_KEY}` } : { uri: marker.icon }} />
                        <Callout>
                            <View style={styles.callout}>
                                <Text style={styles.markerName}>{marker.name}</Text>
                                <Text style={styles.markerVicinity}>{marker.vicinity}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Buscar locais próximos...'
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={placeName}
                    onChangeText={setPlaceName} />
                <TouchableOpacity onPress={getPlaces} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#fff",
        color: '#333',
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#0ef065',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },

    callout: {
        width: 260
    },

    markerName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    markerVicinity: {
        color: '#666',
        marginTop: 5
    },

    markerTechs: {
        marginTop: 5
    }
})


export default Main;