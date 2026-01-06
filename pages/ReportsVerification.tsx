/**
 * ReportsVerification
 *
 * Admin page used to view and manage reports sent by users.
 * It displays:
 * - three summary boxes (pending / accepted / rejected),
 * - a search bar with basic filters (type + status),
 * - a table listing each report with its status and a "Voir" action.
 *
 * For now, the data is mocked locally (MOCK_REPORTS generated from BASE_REPORTS).
 * Later, this component should be connected to the backend (PostgreSQL "reports"
 * table + joins on users / missions / associations).
 */

import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";

import Sidebar from "@/components/SideBar";
import reportStyles from "@/styles/pages/ReportsVerificationStyles";

/**
 * ReportState
 *
 * Front alias for the PostgreSQL enum "statut_traitement" of the reports table:
 * - 'pending'  => report not processed yet
 * - 'accepted' => report processed and validated
 * - 'rejected' => report processed but rejected / closed
 */
type ReportState = "pending" | "accepted" | "rejected";

/**
 * ReportType
 *
 * Type of the element being reported:
 * - Mission
 * - Utilisateur
 * - Association
 *
 * In the database, this corresponds to a column like "type_signalement"
 * (for example).
 */
type ReportType = "Mission" | "Utilisateur" | "Association";

/**
 * Report
 *
 * Representation of a single report row as used in the UI.
 * This is close to what will eventually be returned by the backend API.
 *
 * Notes:
 * - `id`            : primary key of the report (e.g. reports.id_report)
 * - `type`          : type of report (mission / user / association)
 * - `target`        : name or identifier of the reported target
 * - `reason`        : reason / description of the report
 * - `dateReporting` : formatted date of creation
 * - `state`         : current processing state (enum)
 * - `reporterName`  : display name of the user who created the report
 * - `reportedName`  : display name of the reported user / mission / association
 */
type Report = {
    id: number;
    type: ReportType;
    target: string;
    reason: string;
    dateReporting: string;
    state: ReportState;
    reporterName: string;
    reportedName: string;
};

/**
 * BASE_REPORTS
 *
 * Small list of "templates" for reports.
 * We reuse these entries to generate a bigger mock dataset
 * so that the table can be scrolled like a real page with data.
 */
const BASE_REPORTS: Omit<Report, "id">[] = [
    {
        type: "Mission",
        target: "Aide aux devoirs",
        reason: "Contenu frauduleux",
        dateReporting: "17/10/2025",
        state: "accepted",
        reporterName: "Alexandre Dupont",
        reportedName: "Association Aide aux devoirs",
    },
    {
        type: "Utilisateur",
        target: "@Alex dupont12",
        reason: "Comportement inapproprié",
        dateReporting: "17/10/2025",
        state: "pending",
        reporterName: "Julie Martin",
        reportedName: "Alexandre Dupont",
    },
    {
        type: "Association",
        target: "Solidarité jeune",
        reason: "Spam",
        dateReporting: "17/10/2025",
        state: "rejected",
        reporterName: "Alexandre Dupont",
        reportedName: "Solidarité jeune",
    },
    {
        type: "Mission",
        target: "Atelier informatique",
        reason: "Informations trompeuses",
        dateReporting: "18/10/2025",
        state: "pending",
        reporterName: "Sarah Lemaire",
        reportedName: "Association Numérique pour tous",
    },
    {
        type: "Utilisateur",
        target: "@Jeanne34",
        reason: "Harcèlement",
        dateReporting: "18/10/2025",
        state: "accepted",
        reporterName: "Mohamed Ali",
        reportedName: "Jeanne Robert",
    },
    {
        type: "Association",
        target: "Aide alimentaire 92",
        reason: "Contenu inapproprié",
        dateReporting: "19/10/2025",
        state: "accepted",
        reporterName: "Clara Bernard",
        reportedName: "Aide alimentaire 92",
    },
];

/**
 * MOCK_REPORTS
 *
 * Generated array of ~24 reports for demo purposes.
 * We repeat BASE_REPORTS several times and only change the `id`.
 *
 * TODO (future): replace this by data coming from the backend
 * (e.g. GET /api/admin/reports with pagination + filters).
 */
const MOCK_REPORTS: Report[] = Array.from({ length: 24 }).map((_, index) => ({
    id: index + 1,
    ...BASE_REPORTS[index % BASE_REPORTS.length],
}));

/**
 * ReportsVerification component
 *
 * Main container for the "Signalement" admin view.
 * Contains:
 * - Sidebar (left)
 * - Central area with header, summary cards, filters and table.
 */
export default function ReportsVerification() {
    /**
     * reports
     *
     * Local copy of the reports list so we can update state
     * (e.g. mark a report as treated) without touching the mock constant.
     */
    const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);

    /**
     * selectedReport
     *
     * Report currently opened in the detail popup.
     * If null, the popup is hidden.
     */
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    /**
     * search
     *
     * Controlled value of the search input.
     * Used to filter reports across several fields (name, type, reason, date...).
     */
    const [search, setSearch] = useState("");

    /**
     * selectedType
     *
     * Currently selected type filter.
     * It cycles through: null -> Mission -> Utilisateur -> Association -> null...
     */
    const [selectedType, setSelectedType] = useState<ReportType | null>(null);

    /**
     * selectedState
     *
     * Currently selected status filter.
     * It cycles through: null -> pending -> accepted -> rejected -> null...
     */
    const [selectedState, setSelectedState] = useState<ReportState | null>(null);

    /**
     * counts
     *
     * Precomputed counts of each report state, used in the three summary cards.
     * useMemo is used here to avoid recomputing on every render.
     */
    const counts = useMemo(() => {
        let pending = 0;
        let accepted = 0;
        let rejected = 0;

        reports.forEach((r) => {
            if (r.state === "pending") pending += 1;
            else if (r.state === "accepted") accepted += 1;
            else if (r.state === "rejected") rejected += 1;
        });

        return { pending, accepted, rejected };
    }, [reports]);

    /**
     * filteredReports
     *
     * Result of applying:
     * - the text search (search),
     * - the type filter (selectedType),
     * - the status filter (selectedState),
     * to the reports list.
     *
     * This mimics what the backend will eventually do with SQL WHERE clauses.
     */
    const filteredReports = useMemo(
        () =>
            reports.filter((r) => {
                // Global text search on several fields
                const matchesSearch =
                    search.trim().length === 0 ||
                    [
                        r.reporterName,
                        r.reportedName,
                        r.type,
                        r.target,
                        r.reason,
                        r.dateReporting,
                    ]
                        .join(" ")
                        .toLowerCase()
                        .includes(search.toLowerCase());

                // Filter by type
                const matchesType =
                    selectedType === null || r.type === selectedType;

                // Filter by processing state
                const matchesState =
                    selectedState === null || r.state === selectedState;

                return matchesSearch && matchesType && matchesState;
            }),
        [reports, search, selectedType, selectedState]
    );

    /**
     * getTypeFilterLabel
     *
     * Returns the label displayed in the "Type" filter button.
     * If no type is selected, we display the generic label "Type".
     */
    const getTypeFilterLabel = () => selectedType ?? "Type";

    /**
     * getStateFilterLabel
     *
     * Returns the label displayed in the "Statut" filter button.
     * Values are translated to French for the UI.
     */
    const getStateFilterLabel = () => {
        if (!selectedState) return "Statut";
        if (selectedState === "pending") return "Non traités";
        if (selectedState === "accepted") return "Acceptés";
        return "Rejetés";
    };

    /**
     * handleTypeFilterPress
     *
     * Called when the "Type" filter button is clicked.
     * Cycles through: null -> Mission -> Utilisateur -> Association -> null...
     */
    const handleTypeFilterPress = () => {
        const order: (ReportType | null)[] = [
            null,
            "Mission",
            "Utilisateur",
            "Association",
        ];
        const currentIndex = order.indexOf(selectedType);
        const nextIndex = (currentIndex + 1) % order.length;
        setSelectedType(order[nextIndex]);
    };

    /**
     * handleStateFilterPress
     *
     * Called when the "Statut" filter button is clicked.
     * Cycles through: null -> pending -> accepted -> rejected -> null...
     */
    const handleStateFilterPress = () => {
        const order: (ReportState | null)[] = [
            null,
            "pending",
            "accepted",
            "rejected",
        ];
        const currentIndex = order.indexOf(selectedState);
        const nextIndex = (currentIndex + 1) % order.length;
        setSelectedState(order[nextIndex]);
    };

    /**
     * handleResetFilters
     *
     * Resets all filters to their initial state:
     * - clears the search text,
     * - clears the type filter,
     * - clears the status filter.
     */
    const handleResetFilters = () => {
        setSearch("");
        setSelectedType(null);
        setSelectedState(null);
    };

    /**
     * getStatusLabel
     *
     * Utility function returning the French label to display
     * for a given ReportState.
     */
    const getStatusLabel = (state: ReportState) => {
        if (state === "pending") return "non traité";
        if (state === "accepted") return "accepté";
        return "rejeté";
    };

    /**
     * handleOpenDetails
     *
     * Opens the detail popup for a given report.
     */
    const handleOpenDetails = (report: Report) => {
        setSelectedReport(report);
    };

    /**
     * handleCloseDetails
     *
     * Closes the detail popup.
     */
    const handleCloseDetails = () => {
        setSelectedReport(null);
    };

    /**
     * Mark report as ACCEPTED
     */
    const handleMarkAsAccepted = () => {
        if (!selectedReport) return;

        const updatedReports: Report[] = reports.map((r): Report =>
            r.id === selectedReport.id
                ? { ...r, state: "accepted" }
                : r
        );

        setReports(updatedReports);
        setSelectedReport({ ...selectedReport, state: "accepted" });
    };

    /**
     * Mark report as REJECTED
     */
    const handleMarkAsRejected = () => {
        if (!selectedReport) return;

        const updatedReports: Report[] = reports.map((r): Report =>
            r.id === selectedReport.id
                ? { ...r, state: "rejected" }
                : r
        );

        setReports(updatedReports);
        setSelectedReport({ ...selectedReport, state: "rejected" });
    };

    return (
        <View style={reportStyles.page}>
            {/* Left sidebar (navigation) */}
            <Sidebar
                userType="admin"
                userName="Bonjour, Mohamed"
                onNavigate={() => {}}
            />

            {/* Right main area */}
            <View style={reportStyles.mainBackground}>
                <ScrollView
                    style={reportStyles.mainScroll}
                    contentContainerStyle={reportStyles.scrollContent}
                    showsVerticalScrollIndicator
                >
                    <View style={reportStyles.contentWrapper}>
                        {/* Page header */}
                        <Text style={reportStyles.title}>Signalement</Text>
                        <Text style={reportStyles.subtitle}>
                            Liste et gestion des signalements reçus
                        </Text>

                        {/* Summary cards: pending, accepted, rejected */}
                        <View style={reportStyles.summaryRow}>
                            <View
                                style={[
                                    reportStyles.summaryCard,
                                    reportStyles.summaryCardOrange,
                                    reportStyles.summaryCardFixed,
                                ]}
                            >
                                <Text
                                    style={[
                                        reportStyles.summaryCardLabel,
                                        reportStyles.summaryLabelOrange,
                                    ]}
                                >
                                    Non traités
                                </Text>
                                <Text style={reportStyles.summaryCardValue}>
                                    {counts.pending}
                                </Text>
                            </View>

                            <View
                                style={[
                                    reportStyles.summaryCard,
                                    reportStyles.summaryCardPurple,
                                    reportStyles.summaryCardFixed,
                                ]}
                            >
                                <Text
                                    style={[
                                        reportStyles.summaryCardLabel,
                                        reportStyles.summaryLabelPurple,
                                    ]}
                                >
                                    Acceptés
                                </Text>
                                <Text style={reportStyles.summaryCardValue}>
                                    {counts.accepted}
                                </Text>
                            </View>

                            <View
                                style={[
                                    reportStyles.summaryCard,
                                    reportStyles.summaryCardGreen,
                                    reportStyles.summaryCardFixed,
                                ]}
                            >
                                <Text
                                    style={[
                                        reportStyles.summaryCardLabel,
                                        reportStyles.summaryLabelGreen,
                                    ]}
                                >
                                    Rejetés
                                </Text>
                                <Text style={reportStyles.summaryCardValue}>
                                    {counts.rejected}
                                </Text>
                            </View>
                        </View>

                        {/* Search bar and filters row */}
                        <View style={reportStyles.filtersRow}>
                            {/* Search input with magnifying glass icon */}
                            <View style={reportStyles.searchWrapper}>
                                <Image
                                    // Icon of the magnifying glass placed in assets/images
                                    source={require("../assets/images/loupe.png")}
                                    style={reportStyles.searchIcon}
                                />
                                <TextInput
                                    style={reportStyles.searchInput}
                                    placeholder="Rechercher un utilisateur, mission, association..."
                                    placeholderTextColor="#9CA3AF"
                                    value={search}
                                    onChangeText={setSearch}
                                />
                            </View>

                            {/* Type filter (cycles through the different types) */}
                            <TouchableOpacity
                                style={reportStyles.filterButton}
                                onPress={handleTypeFilterPress}
                            >
                                <Text style={reportStyles.filterButtonText}>
                                    {getTypeFilterLabel()}
                                </Text>
                            </TouchableOpacity>

                            {/* Status filter (cycles through pending/accepted/rejected) */}
                            <TouchableOpacity
                                style={reportStyles.filterButton}
                                onPress={handleStateFilterPress}
                            >
                                <Text style={reportStyles.filterButtonText}>
                                    {getStateFilterLabel()}
                                </Text>
                            </TouchableOpacity>

                            {/* Reset button to clear all filters */}
                            <TouchableOpacity
                                style={reportStyles.resetButton}
                                onPress={handleResetFilters}
                            >
                                <Text style={reportStyles.resetButtonText}>
                                    Réinitialiser
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Table header */}
                        <View style={reportStyles.tableHeaderRow}>
                            <Text
                                style={[
                                    reportStyles.headerCell,
                                    reportStyles.headerCellUser,
                                ]}
                            >
                                Utilisateur
                            </Text>
                            <Text
                                style={[
                                    reportStyles.headerCell,
                                    reportStyles.headerCellType,
                                ]}
                            >
                                Type
                            </Text>
                            <Text
                                style={[
                                    reportStyles.headerCell,
                                    reportStyles.headerCellTarget,
                                ]}
                            >
                                Cible
                            </Text>
                            <Text
                                style={[
                                    reportStyles.headerCell,
                                    reportStyles.headerCellReason,
                                ]}
                            >
                                Motif
                            </Text>
                            <Text
                                style={[
                                    reportStyles.headerCell,
                                    reportStyles.headerCellDate,
                                ]}
                            >
                                Date
                            </Text>
                            <Text
                                style={[
                                    reportStyles.headerCell,
                                    reportStyles.headerCellStatus,
                                ]}
                            >
                                Statut
                            </Text>
                            <Text
                                style={[
                                    reportStyles.headerCell,
                                    reportStyles.headerCellActions,
                                ]}
                            >
                                Actions
                            </Text>
                        </View>

                        {/* Table rows (one per report) */}
                        {filteredReports.map((report) => (
                            <View key={report.id} style={reportStyles.tableRow}>
                                <Text
                                    style={[
                                        reportStyles.cellText,
                                        reportStyles.cellUser,
                                    ]}
                                >
                                    {report.reporterName}
                                </Text>

                                <Text
                                    style={[
                                        reportStyles.cellText,
                                        reportStyles.cellType,
                                    ]}
                                >
                                    {report.type}
                                </Text>

                                <Text
                                    style={[
                                        reportStyles.cellText,
                                        reportStyles.cellTarget,
                                    ]}
                                    numberOfLines={1}
                                >
                                    {report.target}
                                </Text>

                                <Text
                                    style={[
                                        reportStyles.cellText,
                                        reportStyles.cellReason,
                                    ]}
                                    numberOfLines={1}
                                >
                                    {report.reason}
                                </Text>

                                <Text
                                    style={[
                                        reportStyles.cellText,
                                        reportStyles.cellDate,
                                    ]}
                                >
                                    {report.dateReporting}
                                </Text>

                                {/* Status badge with different colors depending on state */}
                                <View
                                    style={[
                                        reportStyles.statusBadge,
                                        report.state === "pending" &&
                                        reportStyles.statusBadgePending,
                                        report.state === "accepted" &&
                                        reportStyles.statusBadgeAccepted,
                                        report.state === "rejected" &&
                                        reportStyles.statusBadgeRejected,
                                    ]}
                                >
                                    <Text style={reportStyles.statusBadgeText}>
                                        {getStatusLabel(report.state)}
                                    </Text>
                                </View>

                                {/* Action cell ("Voir" button) */}
                                <View style={reportStyles.cellActions}>
                                    <TouchableOpacity
                                        style={reportStyles.actionButton}
                                        onPress={() => handleOpenDetails(report)}
                                    >
                                        <Text style={reportStyles.actionButtonText}>
                                            Voir
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* ----- Detail popup (modal) ----- */}
            {selectedReport && (
                <View style={reportStyles.modalOverlay}>
                    <View style={reportStyles.modalContainer}>
                        {/* Header */}
                        <View style={reportStyles.modalHeaderRow}>
                            <Text style={reportStyles.modalTitle}>
                                Détails du signalement
                            </Text>
                            <TouchableOpacity
                                onPress={handleCloseDetails}
                                style={reportStyles.modalCloseButton}
                            >
                                <Text style={reportStyles.modalCloseButtonText}>
                                    ×
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Content */}
                        <View style={reportStyles.modalContent}>
                            <View style={reportStyles.modalLine}>
                                <Text style={reportStyles.modalLabel}>
                                    Utilisateur
                                </Text>
                                <Text style={reportStyles.modalValue}>
                                    {selectedReport.reporterName}
                                </Text>
                            </View>

                            <View style={reportStyles.modalLine}>
                                <Text style={reportStyles.modalLabel}>Type</Text>
                                <Text style={reportStyles.modalValue}>
                                    {selectedReport.type}
                                </Text>
                            </View>

                            <View style={reportStyles.modalLine}>
                                <Text style={reportStyles.modalLabel}>
                                    Cible
                                </Text>
                                <Text style={reportStyles.modalValue}>
                                    {selectedReport.target}
                                </Text>
                            </View>

                            <View style={reportStyles.modalLine}>
                                <Text style={reportStyles.modalLabel}>Date</Text>
                                <Text style={reportStyles.modalValue}>
                                    {selectedReport.dateReporting}
                                </Text>
                            </View>

                            <View style={reportStyles.modalLine}>
                                <Text style={reportStyles.modalLabel}>
                                    Statut
                                </Text>
                                <View
                                    style={[
                                        reportStyles.statusBadge,
                                        selectedReport.state === "pending" &&
                                        reportStyles.statusBadgePending,
                                        selectedReport.state === "accepted" &&
                                        reportStyles.statusBadgeAccepted,
                                        selectedReport.state === "rejected" &&
                                        reportStyles.statusBadgeRejected,
                                    ]}
                                >
                                    <Text style={reportStyles.statusBadgeText}>
                                        {getStatusLabel(selectedReport.state)}
                                    </Text>
                                </View>
                            </View>

                            <View style={reportStyles.modalMotifBlock}>
                                <Text style={reportStyles.modalLabel}>Motif</Text>
                                <Text style={reportStyles.modalMotifTitle}>
                                    {selectedReport.reason}
                                </Text>
                                <Text style={reportStyles.modalMotifDescription}>
                                    Signalement concernant{" "}
                                    {selectedReport.type.toLowerCase()} "
                                    {selectedReport.target}" pour le motif&nbsp;:
                                    {" "}
                                    {selectedReport.reason}.
                                </Text>
                            </View>
                        </View>

                        {/* Footer buttons */}
                        <View style={reportStyles.modalButtonsRow}>
                            {/* ACCEPT */}
                            <TouchableOpacity
                                style={reportStyles.modalPrimaryButton}
                                onPress={handleMarkAsAccepted}
                            >
                                <Text style={reportStyles.modalPrimaryButtonText}>
                                    Marquer comme accepté
                                </Text>
                            </TouchableOpacity>

                            {/* REJECT */}
                            <TouchableOpacity
                                style={reportStyles.modalRejectButton}
                                onPress={handleMarkAsRejected}
                            >
                                <Text style={reportStyles.modalRejectButtonText}>
                                    Marquer comme rejeté
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}
