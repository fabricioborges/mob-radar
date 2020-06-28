import { StyleSheet } from 'react-native';

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

export default styles;