import { Colors } from '@/constants/colors';
import { Volunteer } from '@/models/volunteer.model';
import { styles } from '@/styles/pages/ChangeMissionCSS';
import { FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { associationService } from '@/services/associationService';

type Props = {
    visible: boolean;
    onClose: () => void;
    title: string;
    search: string;
    setSearch: (value: string) => void;
    benevoles: Volunteer[]; // list of volunteers
    setBenevoles: (value: Volunteer[]) => void;
    missionId: number; // <-- new prop to know which mission
};

export default function ListeBenevolesModal({
    visible,
    onClose,
    title,
    search,
    setSearch,
    benevoles,
    setBenevoles,
    missionId,
}: Props) {
    // ---------------------
    // FILTER VOLUNTEERS BY SEARCH
    // ---------------------
    const filteredBenevoles = benevoles.filter(b =>
        (b.last_name + ' ' + b.first_name).toLowerCase().includes(search.toLowerCase())
    );

    // ---------------------
    // REJECT VOLUNTEER ENGAGEMENT VIA API
    // ---------------------
    const removeBenevole = async (volunteerId: number) => {
        Alert.prompt(
            'Motif du rejet',
            'Entrez la raison du rejet pour ce bénévole',
            async (rejectionReason) => {
                if (!rejectionReason) return;

                try {
                    // Call backend to reject engagement
                    await associationService.rejectEngagement(volunteerId, missionId, rejectionReason);

                    // Update local state
                    setBenevoles(benevoles.filter(b => b.id_volunteer !== volunteerId));
                    console.log(`Volunteer ${volunteerId} removed successfully`);
                } catch (error) {
                    console.error('Error rejecting volunteer:', error);
                    Alert.alert('Erreur', 'Impossible de supprimer ce bénévole.');
                }
            },
            'plain-text'
        );
    };

    const renderItem = ({ item }: { item: Volunteer }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.benevoleText}>{item.last_name} {item.first_name}</Text>
            <TouchableOpacity
                style={styles.croixCircle}
                onPress={() => removeBenevole(item.id_volunteer)}
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
                        keyExtractor={item => item.id_volunteer.toString()}
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
