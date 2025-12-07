import { Colors } from '@/constants/colors';
import { styles } from '@/styles/pages/ChangeMissionCSS';
import { FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Benevole } from '@/types/ProfileUser';

type Props = {
    visible: boolean;
    onClose: () => void;
    title: string;
    search: string;
    setSearch: (value: string) => void;
    benevoles: Benevole[];
    setBenevoles: (value: Benevole[]) => void;
};

export default function ListeBenevolesModal({
    visible,
    onClose,
    title,
    search,
    setSearch,
    benevoles,
    setBenevoles,
}: Props) {
    // Research function
    const filteredBenevoles = benevoles.filter(b =>
        (b.lastname + ' ' + b.firstname).toLowerCase().includes(search.toLowerCase())
    );

    // Delete function
    const removeBenevole = (id: string) => {
        setBenevoles(benevoles.filter(b => b.id !== id));
    };

    const renderItem = ({ item }: { item: Benevole }) => (
        <View style={styles.itemContainer}>
        <Text style={styles.benevoleText}>{item.lastname} {item.firstname}</Text>
        <TouchableOpacity
            style={styles.croixCircle}
            onPress={() => removeBenevole(item.id)}
        >
            <Text style={styles.croixText}>×</Text>
        </TouchableOpacity>
        </View>
    );

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.title}>{title} - Liste des bénévoles</Text>
                <TouchableOpacity onPress={onClose}>
                <Text style={[styles.croixText, { fontSize: 50, color: Colors.red }]}>×</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.searchBar, { flexDirection: 'row', alignItems: 'center'}]}>
                <Image
                    source={require('@/assets/images/loupe.png')}
                    style={styles.icon}
                />
                <TextInput
                    placeholder="Recherche un bénévole"
                    value={search}
                    onChangeText={setSearch}
                    style={{ flex: 1, fontSize: 16, padding: 0, margin: 0, borderWidth: 0, outlineWidth: 0 }}
                />
            </View>

            <FlatList
                data={filteredBenevoles}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                style={{ marginBottom: 20 }}
            />

            <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.buttonBackgroundViolet, marginHorizontal: 50}]}
                onPress={onClose}
            >
                <Text style={styles.buttonText}>Envoyer un mail aux bénévoles</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    );
    }
