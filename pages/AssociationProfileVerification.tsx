/**
 * DocumentsVerification
 *
 * Page d'administration permettant de :
 * - lister les documents envoyés par les associations,
 * - filtrer par statut de vérification (en attente / accepté / rejeté),
 * - rechercher une association par nom, code RNA ou nom de document,
 * - ouvrir un popup de détails pour accepter ou rejeter le document.
 */

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";

import Sidebar from "@/components/SideBar";
import styles from "@/styles/pages/AssociationProfileVerificationStyles";

import { adminService } from "@/services/adminService";

// --------------------
// Types UI (pour la page)
// --------------------
type StatutTraitement = "pending" | "accepted" | "rejected";

type AssociationDocument = {
    idDoc: number;
    docName: string;
    urlDoc: string | null;
    dateUpload: string; // déjà formaté pour affichage
    verifState: StatutTraitement;
    idAsso: number;
    assoName: string;
    rnaCode: string;
};

// --------------------
// Helpers
// --------------------
const mapApiStateToUiState = (
    state: "PENDING" | "APPROVED" | "REJECTED"
): StatutTraitement => {
    if (state === "PENDING") return "pending";
    if (state === "APPROVED") return "accepted";
    return "rejected";
};

const formatDateFR = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function DocumentsVerification() {
    const [documents, setDocuments] = useState<AssociationDocument[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<AssociationDocument | null>(
        null
    );
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

    const [search, setSearch] = useState("");
    const [selectedState, setSelectedState] =
        useState<StatutTraitement | null>("pending");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // --------------------
    // Load data (docs + associations) and join
    // --------------------
    const fetchDocuments = useCallback(async () => {
        try {
            setIsLoading(true);
            setErrorMsg(null);

            const [docsApi, assosApi] = await Promise.all([
                adminService.getAllDocuments(0, 100),
                adminService.getAllAssociationsInternal(),
            ]);

            const assoMap = new Map<
                number,
                { assoName: string; rnaCode: string }
            >(
                (assosApi || []).map((a: any) => [
                    a.id_asso,
                    { assoName: a.name, rnaCode: a.rna_code },
                ])
            );

            const joined: AssociationDocument[] = (docsApi || []).map((doc: any) => {
                const asso = assoMap.get(doc.id_asso);

                return {
                    idDoc: doc.id_doc,
                    docName: doc.doc_name,
                    urlDoc: doc.url_doc ?? null,
                    dateUpload: formatDateFR(doc.date_upload),
                    verifState: mapApiStateToUiState(doc.verif_state),
                    idAsso: doc.id_asso,
                    assoName: asso?.assoName ?? `Association #${doc.id_asso}`,
                    rnaCode: asso?.rnaCode ?? "—",
                };
            });

            setDocuments(joined);

            // si aucun doc sélectionné, on prend le premier (optionnel)
            if (!selectedDoc && joined.length > 0) {
                setSelectedDoc(joined[0]);
            }
        } catch (e: any) {
            console.error("Erreur chargement documents:", e);
            setErrorMsg(
                "Impossible de charger les documents. Vérifie ta connexion ou ton token admin."
            );
        } finally {
            setIsLoading(false);
        }
    }, [selectedDoc]);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    // --------------------
    // Counts
    // --------------------
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

    // --------------------
    // Filtered docs
    // --------------------
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

    // --------------------
    // Labels
    // --------------------
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

    // --------------------
    // UI handlers
    // --------------------
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

    const handleCloseModal = () => {
        setIsDetailOpen(false);
    };

    // --------------------
    // Approve/Reject (API + refetch)
    // --------------------
    const handleAccept = async () => {
        if (!selectedDoc) return;

        try {
            setIsLoading(true);
            await adminService.approveDocument(selectedDoc.idDoc);
            setIsDetailOpen(false);
            await fetchDocuments();
        } catch (e) {
            console.error("Erreur approve:", e);
            setErrorMsg("Erreur lors de la validation du document.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReject = async () => {
        if (!selectedDoc) return;

        try {
            setIsLoading(true);

            // Tu peux remplacer par un input plus tard
            const reason = "Document invalide ou illisible";

            await adminService.rejectDocument(selectedDoc.idDoc, reason);
            setIsDetailOpen(false);
            await fetchDocuments();
        } catch (e) {
            console.error("Erreur reject:", e);
            setErrorMsg("Erreur lors du rejet du document.");
        } finally {
            setIsLoading(false);
        }
    };

    // --------------------
    // Render
    // --------------------
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
                            Récépissés préfectoraux envoyés par les associations. Validez ou
                            rejetez les documents après vérification.
                        </Text>

                        {/* Loading / Error */}
                        {isLoading && (
                            <View style={{ marginTop: 12 }}>
                                <ActivityIndicator />
                            </View>
                        )}

                        {errorMsg && (
                            <Text style={{ marginTop: 12, color: "red" }}>{errorMsg}</Text>
                        )}

                        {/* Résumé */}
                        <View style={styles.summaryRow}>
                            <View
                                style={[styles.summaryCard, styles.summaryCardPending]}
                            >
                                <Text
                                    style={[styles.summaryLabel, styles.summaryLabelPending]}
                                >
                                    En attente
                                </Text>
                                <Text style={styles.summaryValue}>{counts.pending}</Text>
                            </View>

                            <View
                                style={[styles.summaryCard, styles.summaryCardAccepted]}
                            >
                                <Text
                                    style={[styles.summaryLabel, styles.summaryLabelAccepted]}
                                >
                                    Acceptés
                                </Text>
                                <Text style={styles.summaryValue}>{counts.accepted}</Text>
                            </View>

                            <View
                                style={[styles.summaryCard, styles.summaryCardRejected]}
                            >
                                <Text
                                    style={[styles.summaryLabel, styles.summaryLabelRejected]}
                                >
                                    Rejetés
                                </Text>
                                <Text style={styles.summaryValue}>{counts.rejected}</Text>
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
                                    <Text style={styles.resetButtonText}>Réinitialiser</Text>
                                </TouchableOpacity>
                            </View>

                            {/* header */}
                            <View style={styles.tableHeaderRow}>
                                <Text style={[styles.headerCell, styles.headerCellAsso]}>
                                    Association
                                </Text>
                                <Text style={[styles.headerCell, styles.headerCellRNA]}>
                                    Code RNA
                                </Text>
                                <Text style={[styles.headerCell, styles.headerCellDoc]}>
                                    Document
                                </Text>
                                <Text style={[styles.headerCell, styles.headerCellDate]}>
                                    Date d&apos;upload
                                </Text>
                                <Text style={[styles.headerCell, styles.headerCellStatus]}>
                                    Statut
                                </Text>
                                <Text style={[styles.headerCell, styles.headerCellActions]}>
                                    Actions
                                </Text>
                            </View>

                            {/* lignes */}
                            {filteredDocuments.map((doc) => (
                                <View key={doc.idDoc} style={styles.tableRow}>
                                    <Text
                                        style={[styles.cellText, styles.cellAsso]}
                                        numberOfLines={1}
                                    >
                                        {doc.assoName}
                                    </Text>

                                    <Text style={[styles.cellText, styles.cellRNA]}>
                                        {doc.rnaCode}
                                    </Text>

                                    <Text
                                        style={[styles.cellText, styles.cellDoc]}
                                        numberOfLines={1}
                                    >
                                        {doc.docName}
                                    </Text>

                                    <Text style={[styles.cellText, styles.cellDate]}>
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
                                            <Text style={styles.statusBadgeText}>
                                                {getStatusLabel(doc.verifState)}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.cellActions}>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => handleSelectDoc(doc)}
                                        >
                                            <Text style={styles.actionButtonText}>Voir</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}

                            {/* petit cas vide */}
                            {!isLoading && filteredDocuments.length === 0 && (
                                <Text style={{ marginTop: 16, color: "#6B7280" }}>
                                    Aucun document ne correspond aux filtres.
                                </Text>
                            )}
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
                            <Text style={styles.modalTitle}>Détails du document</Text>
                            <TouchableOpacity
                                onPress={handleCloseModal}
                                style={styles.modalCloseButton}
                            >
                                <Text style={styles.modalCloseButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>

                        {/* infos */}
                        <View style={styles.detailInfoBlock}>
                            <View style={styles.detailLine}>
                                <Text style={styles.detailLabel}>Association</Text>
                                <Text style={styles.detailValue} numberOfLines={1}>
                                    {selectedDoc.assoName}
                                </Text>
                            </View>

                            <View style={styles.detailLine}>
                                <Text style={styles.detailLabel}>Code RNA</Text>
                                <Text style={styles.detailValue}>{selectedDoc.rnaCode}</Text>
                            </View>

                            <View style={styles.detailLine}>
                                <Text style={styles.detailLabel}>Nom du fichier</Text>
                                <Text style={styles.detailValue} numberOfLines={1}>
                                    {selectedDoc.docName}
                                </Text>
                            </View>

                            <View style={styles.detailLine}>
                                <Text style={styles.detailLabel}>Date d&apos;upload</Text>
                                <Text style={styles.detailValue}>{selectedDoc.dateUpload}</Text>
                            </View>
                        </View>

                        {/* aperçu */}
                        <View style={styles.previewContainer}>
                            <View style={styles.previewPage}>
                                <Text style={styles.previewTitle}>Aperçu document</Text>
                                <Text style={styles.previewHint}>
                                    {selectedDoc.urlDoc
                                        ? "Un lien vers le PDF est disponible via urlDoc (à brancher dans un viewer)."
                                        : "(Le backend ne fournit pas encore d’URL exploitable pour l’aperçu.)"}
                                </Text>
                            </View>
                        </View>

                        {/* boutons */}
                        <View style={styles.modalButtonsRow}>
                            <TouchableOpacity
                                style={styles.rejectButton}
                                onPress={handleReject}
                                disabled={isLoading}
                            >
                                <Text style={styles.rejectButtonText}>Rejeter</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.acceptButton}
                                onPress={handleAccept}
                                disabled={isLoading}
                            >
                                <Text style={styles.acceptButtonText}>Accepter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}
