import { Colors } from '@/constants/colors';
import { VolunteerWithStatus } from '@/models/volunteer.model';
import { styles } from '@/styles/pages/ChangeMissionCSS';
import { FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { associationService } from '@/services/associationService';
import { ProcessingStatus } from '@/models/enums';

type Props = {
    visible: boolean;
    onClose: () => void;
    title: string;
    search: string;
    setSearch: (value: string) => void;
    benevoles: VolunteerWithStatus[]; // list of volunteers
    setBenevoles: (value: VolunteerWithStatus[]) => void;
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
    const [rejectionReason, setRejectionReason] = useState('');
    const [volunteerIdToReject, setVolunteerIdToReject] = useState<number | null>(null);

    // ---------------------
    // FILTER VOLUNTEERS BY SEARCH
    // ---------------------
    const filteredBenevoles = benevoles.filter(b =>
        (b.last_name + ' ' + b.first_name).toLowerCase().includes(search.toLowerCase())
    );
    

    // ---------------------
    // TRIGGER REJECTION FLOW
    // ---------------------
    const openRejectionInput = (volunteerId: number) => {
        setVolunteerIdToReject(volunteerId);
        setRejectionReason('');
    };

    const confirmRejection = async () => {
        if (!volunteerIdToReject || !rejectionReason.trim()) {
            Alert.alert('Erreur', 'Veuillez saisir un motif.');
            return;
        }

        try {
            await associationService.rejectEngagement(volunteerIdToReject, missionId, rejectionReason);
            setBenevoles(benevoles.filter(b => b.id_volunteer !== volunteerIdToReject));
            setVolunteerIdToReject(null);
            setRejectionReason('');
        } catch (error) {
            console.error('Error rejecting volunteer:', error);
            Alert.alert('Erreur', 'Impossible de supprimer ce bénévole.');
        }
    };

    // ---------------------
    // ACCEPT VOLUNTEER ENGAGEMENT VIA API
    // ---------------------
    const acceptBenevole = async (volunteerId: number) => {
        try {
            await associationService.approveEngagement(volunteerId, missionId);

            // Mise à jour locale : on passe l’état à APPROVED
            setBenevoles(
            benevoles.map(b =>
                b.id_volunteer === volunteerId
                ? { ...b, state: ProcessingStatus.APPROVED }
                : b
            )
            );
        } catch (error) {
            console.error('Error approving volunteer:', error);
            Alert.alert('Erreur', "Impossible d'accepter ce bénévole.");
        }
    };


    const renderItem = ({ item }: { item: VolunteerWithStatus }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.benevoleText}>
            {item.last_name} {item.first_name}
            </Text>

            <View style={{ flexDirection: 'row', gap: 10 }}>
            {/* Bouton ACCEPTER */}
            {item.state === ProcessingStatus.PENDING && (
                <TouchableOpacity
                style={[
                    styles.croixCircle,
                    { backgroundColor: '#059669' },
                ]}
                onPress={() => acceptBenevole(item.id_volunteer)}
                >
                <Text style={styles.croixText}>✓</Text>
                </TouchableOpacity>
            )}

            {/* Bouton REFUSER */}
            <TouchableOpacity
                style={styles.croixCircle}
                onPress={() => openRejectionInput(item.id_volunteer)}
            >
                <Text style={styles.croixText}>×</Text>
            </TouchableOpacity>
            </View>
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
                    {/* Header */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.title}>{title} - Liste des bénévoles</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={[styles.croixText, { fontSize: 50, color: Colors.red }]}>×</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Saisie du motif de rejet (Overlay local) */}
                    {volunteerIdToReject !== null && (
                        <View style={{ backgroundColor: '#FEE2E2', padding: 15, borderRadius: 10, marginBottom: 15, borderWide: 1, borderColor: '#EF4444' }}>
                            <Text style={{ fontWeight: 'bold', color: '#B91C1C', marginBottom: 5 }}>Motif du rejet :</Text>
                            <TextInput
                                placeholder="Entrez la raison..."
                                value={rejectionReason}
                                onChangeText={setRejectionReason}
                                style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginBottom: 10, borderWidth: 1, borderColor: '#F87171' }}
                                autoFocus
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                                <TouchableOpacity onPress={() => setVolunteerIdToReject(null)} style={{ padding: 8 }}>
                                    <Text style={{ color: '#6B7280' }}>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={confirmRejection} style={{ backgroundColor: '#EF4444', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirmer le rejet</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

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
