/**
 * DocumentsVerification
 *
 * Page d'administration permettant de :
 * - lister les documents envoyés par les associations,
 * - filtrer par statut de vérification (en attente / accepté / rejeté),
 * - rechercher une association par nom, code RNA ou nom de document,
 * - ouvrir un popup de détails pour accepter ou rejeter le document.
 */

import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";

import Sidebar from "@/components/SideBar";
import styles from "@/styles/pages/AssociationProfileVerificationStyles";

type StatutTraitement = "pending" | "accepted" | "rejected";

type AssociationDocument = {
    idDoc: number;
    docName: string;
    urlDoc: string | null;
    dateUpload: string;
    verifState: StatutTraitement;
    idAsso: number;
    assoName: string;
    rnaCode: string;
};

const MOCK_DOCUMENTS: AssociationDocument[] = [
    {
        idDoc: 1,
        docName: "Récépissé préfectoral 2025.pdf",
        urlDoc: null,
        dateUpload: "05/10/2025 11:32",
        verifState: "pending",
        idAsso: 10,
        assoName: "Solidarité Jeune",
        rnaCode: "W751234567",
    },
    {
        idDoc: 2,
        docName: "Récépissé préfectoral 2024.pdf",
        urlDoc: null,
        dateUpload: "03/10/2025 09:18",
        verifState: "accepted",
        idAsso: 11,
        assoName: "Les Amis des Animaux",
        rnaCode: "W921234890",
    },
    {
        idDoc: 3,
        docName: "Justificatif association 2025.pdf",
        urlDoc: null,
        dateUpload: "01/10/2025 14:02",
        verifState: "rejected",
        idAsso: 12,
        assoName: "Mains Solidaires",
        rnaCode: "W331004200",
    },
    {
        idDoc: 4,
        docName: "Récépissé préfectoral 2025.pdf",
        urlDoc: null,
        dateUpload: "06/10/2025 16:47",
        verifState: "pending",
        idAsso: 13,
        assoName: "Education Pour Tous",
        rnaCode: "W751998877",
    },
];

export default function DocumentsVerification() {
    const [documents, setDocuments] =
        useState<AssociationDocument[]>(MOCK_DOCUMENTS);

    const [selectedDoc, setSelectedDoc] =
        useState<AssociationDocument | null>(MOCK_DOCUMENTS[0] ?? null);

    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

    const [search, setSearch] = useState("");
    const [selectedState, setSelectedState] =
        useState<StatutTraitement | null>("pending");

    const counts = useMemo(() => {
        let pending = 0;
        let accepted = 0;
        let rejected = 0;

        documents.forEach((d) => {
            if (d.verifState === "pending") pending += 1;
            else if (d.verifState === "accepted") accepted += 1;
            else if (d.verifState === "rejected") rejected += 1;
        });

        return { pending, accepted, rejected };
    }, [documents]);

    const filteredDocuments = useMemo(
        () =>
            documents.filter((doc) => {
                const matchesSearch =
                    search.trim().length === 0 ||
                    [doc.assoName, doc.rnaCode, doc.docName]
                        .join(" ")
                        .toLowerCase()
                        .includes(search.toLowerCase());

                const matchesState =
                    selectedState === null || doc.verifState === selectedState;

                return matchesSearch && matchesState;
            }),
        [documents, search, selectedState]
    );

    const getStatusLabel = (state: StatutTraitement) => {
        if (state === "pending") return "en attente";
        if (state === "accepted") return "accepté";
        return "rejeté";
    };

    const getStateFilterLabel = () => {
        if (!selectedState) return "Tous les statuts";
        if (selectedState === "pending") return "En attente";
        if (selectedState === "accepted") return "Acceptés";
        return "Rejetés";
    };

    const handleToggleStateFilter = () => {
        const order: (StatutTraitement | null)[] = [
            null,
            "pending",
            "accepted",
            "rejected",
        ];
        const currentIndex = order.indexOf(selectedState);
        const nextIndex = (currentIndex + 1) % order.length;
        setSelectedState(order[nextIndex]);
    };

    const handleResetFilters = () => {
        setSearch("");
        setSelectedState("pending");
    };

    const handleSelectDoc = (doc: AssociationDocument) => {
        setSelectedDoc(doc);
        setIsDetailOpen(true);
    };

    const updateDocumentState = (
        docId: number,
        newState: StatutTraitement
    ) => {
        const updatedDocuments: AssociationDocument[] = documents.map(
            (d): AssociationDocument =>
                d.idDoc === docId ? { ...d, verifState: newState } : d
        );

        setDocuments(updatedDocuments);

        if (selectedDoc && selectedDoc.idDoc === docId) {
            setSelectedDoc({ ...selectedDoc, verifState: newState });
        }
    };

    const handleAccept = () => {
        if (!selectedDoc) return;
        updateDocumentState(selectedDoc.idDoc, "accepted");
        setIsDetailOpen(false);
    };

    const handleReject = () => {
        if (!selectedDoc) return;
        updateDocumentState(selectedDoc.idDoc, "rejected");
        setIsDetailOpen(false);
    };

    const handleCloseModal = () => {
        setIsDetailOpen(false);
    };

    return (
        <View style={styles.page}>
            <Sidebar
                userType="admin"
                userName="Bonjour, Mohamed"
                onNavigate={() => {}}
            />

            <View style={styles.mainBackground}>
                <ScrollView
                    style={styles.mainScroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator
                >
                    <View style={styles.contentWrapper}>
                        <Text style={styles.title}>Vérification des documents</Text>
                        <Text style={styles.subtitle}>
                            Récépissés préfectoraux envoyés par les associations.
                            Validez ou rejetez les documents après vérification.
                        </Text>

                        {/* Résumé */}
                        <View style={styles.summaryRow}>
                            <View
                                style={[
                                    styles.summaryCard,
                                    styles.summaryCardPending,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.summaryLabel,
                                        styles.summaryLabelPending,
                                    ]}
                                >
                                    En attente
                                </Text>
                                <Text style={styles.summaryValue}>
                                    {counts.pending}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.summaryCard,
                                    styles.summaryCardAccepted,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.summaryLabel,
                                        styles.summaryLabelAccepted,
                                    ]}
                                >
                                    Acceptés
                                </Text>
                                <Text style={styles.summaryValue}>
                                    {counts.accepted}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.summaryCard,
                                    styles.summaryCardRejected,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.summaryLabel,
                                        styles.summaryLabelRejected,
                                    ]}
                                >
                                    Rejetés
                                </Text>
                                <Text style={styles.summaryValue}>
                                    {counts.rejected}
                                </Text>
                            </View>
                        </View>

                        {/* Filtres + tableau */}
                        <View style={styles.leftColumn}>
                            <View style={styles.filtersRow}>
                                <View style={styles.searchWrapper}>
                                    <TextInput
                                        style={styles.searchInput}
                                        placeholder="Rechercher une association, un code RNA ou un document..."
                                        placeholderTextColor="#9CA3AF"
                                        value={search}
                                        onChangeText={setSearch}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={styles.filterButton}
                                    onPress={handleToggleStateFilter}
                                >
                                    <Text style={styles.filterButtonText}>
                                        {getStateFilterLabel()}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.resetButton}
                                    onPress={handleResetFilters}
                                >
                                    <Text style={styles.resetButtonText}>
                                        Réinitialiser
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* header */}
                            <View style={styles.tableHeaderRow}>
                                <Text
                                    style={[
                                        styles.headerCell,
                                        styles.headerCellAsso,
                                    ]}
                                >
                                    Association
                                </Text>
                                <Text
                                    style={[
                                        styles.headerCell,
                                        styles.headerCellRNA,
                                    ]}
                                >
                                    Code RNA
                                </Text>
                                <Text
                                    style={[
                                        styles.headerCell,
                                        styles.headerCellDoc,
                                    ]}
                                >
                                    Document
                                </Text>
                                <Text
                                    style={[
                                        styles.headerCell,
                                        styles.headerCellDate,
                                    ]}
                                >
                                    Date d&apos;upload
                                </Text>
                                <Text
                                    style={[
                                        styles.headerCell,
                                        styles.headerCellStatus,
                                    ]}
                                >
                                    Statut
                                </Text>
                                <Text
                                    style={[
                                        styles.headerCell,
                                        styles.headerCellActions,
                                    ]}
                                >
                                    Actions
                                </Text>
                            </View>

                            {/* lignes */}
                            {filteredDocuments.map((doc) => (
                                <View key={doc.idDoc} style={styles.tableRow}>
                                    <Text
                                        style={[
                                            styles.cellText,
                                            styles.cellAsso,
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {doc.assoName}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.cellText,
                                            styles.cellRNA,
                                        ]}
                                    >
                                        {doc.rnaCode}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.cellText,
                                            styles.cellDoc,
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {doc.docName}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.cellText,
                                            styles.cellDate,
                                        ]}
                                    >
                                        {doc.dateUpload}
                                    </Text>

                                    <View style={styles.cellStatus}>
                                        <View
                                            style={[
                                                styles.statusBadge,
                                                doc.verifState === "pending" &&
                                                styles.statusBadgePending,
                                                doc.verifState === "accepted" &&
                                                styles.statusBadgeAccepted,
                                                doc.verifState === "rejected" &&
                                                styles.statusBadgeRejected,
                                            ]}
                                        >
                                            <Text
                                                style={styles.statusBadgeText}
                                            >
                                                {getStatusLabel(
                                                    doc.verifState
                                                )}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.cellActions}>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() =>
                                                handleSelectDoc(doc)
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.actionButtonText
                                                }
                                            >
                                                Voir
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* Popup détails */}
            {isDetailOpen && selectedDoc && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* header popup */}
                        <View style={styles.modalHeaderRow}>
                            <Text style={styles.modalTitle}>
                                Détails du document
                            </Text>
                            <TouchableOpacity
                                onPress={handleCloseModal}
                                style={styles.modalCloseButton}
                            >
                                <Text style={styles.modalCloseButtonText}>
                                    ×
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* infos */}
                        <View style={styles.detailInfoBlock}>
                            <View style={styles.detailLine}>
                                <Text style={styles.detailLabel}>
                                    Association
                                </Text>
                                <Text
                                    style={styles.detailValue}
                                    numberOfLines={1}
                                >
                                    {selectedDoc.assoName}
                                </Text>
                            </View>

                            <View style={styles.detailLine}>
                                <Text style={styles.detailLabel}>Code RNA</Text>
                                <Text style={styles.detailValue}>
                                    {selectedDoc.rnaCode}
                                </Text>
                            </View>

                            <View style={styles.detailLine}>
                                <Text style={styles.detailLabel}>
                                    Nom du fichier
                                </Text>
                                <Text
                                    style={styles.detailValue}
                                    numberOfLines={1}
                                >
                                    {selectedDoc.docName}
                                </Text>
                            </View>

                            <View style={styles.detailLine}>
                                <Text style={styles.detailLabel}>
                                    Date d&apos;upload
                                </Text>
                                <Text style={styles.detailValue}>
                                    {selectedDoc.dateUpload}
                                </Text>
                            </View>
                        </View>

                        {/* aperçu */}
                        <View style={styles.previewContainer}>
                            <View style={styles.previewPage}>
                                <Text style={styles.previewTitle}>
                                    Aperçu document
                                </Text>
                                <Text style={styles.previewHint}>
                                    (Ici, le backend fournira soit une
                                    miniature, soit un lien vers le PDF.)
                                </Text>
                            </View>
                        </View>

                        {/* boutons */}
                        <View style={styles.modalButtonsRow}>
                            <TouchableOpacity
                                style={styles.rejectButton}
                                onPress={handleReject}
                            >
                                <Text style={styles.rejectButtonText}>
                                    Rejeter
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.acceptButton}
                                onPress={handleAccept}
                            >
                                <Text style={styles.acceptButtonText}>
                                    Accepter
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}
