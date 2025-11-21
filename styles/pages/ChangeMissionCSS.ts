import { StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 10,
    },
    label: {
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 10,
        color: "#333",
    },
    text: {
        fontSize: 14,
        marginBottom: 20,
        color: "#555",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        marginTop: 10,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 8,
        marginTop: 5,
        marginBottom: 20,
        fontSize: 14,
        width: '100%',
    },
    dropDownStyle: {
        backgroundColor: '#f0f0f0',  // fond gris clair pour la liste déroulante
        borderRadius: 8,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#666',
    },
    labelStyle: {
        fontSize: 14,
        color: '#333',
    },
    button: {
        backgroundColor: "#FF7630",
        padding: 8,
        marginTop: 20,
        borderRadius: 20,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    buttonAction: {
        backgroundColor: "#FF7630",
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        maxHeight: '80%' 
    },
    icon: {
        width: 28,
        height: 28,
        marginRight: 8,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 14,
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    benevoleText: {
        fontSize: 16,
    },
    croixCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        marginLeft: 50,
        borderColor: '#6A66B8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    croixText: {
        fontSize: 20,
        lineHeight: 18,
        color: '#6A66B8',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#767676',
    },
});