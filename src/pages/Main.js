import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps'
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

function Main() {
    const [currentRegion, setCurrentRegion] = useState(null);

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

    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                style={styles.map}>
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Buscar locais próximos...'
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}              
                    />

                <TouchableOpacity style={styles.loadButton}>
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
    }
})


export default Main;