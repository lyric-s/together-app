/**
 * DashboardAdmin
 *
 * ✅ Branché sur le back-end :
 * - overview : /internal/admin/stats/overview
 * - volunteers-by-month : /internal/admin/stats/volunteers-by-month
 * - missions-by-month : /internal/admin/stats/missions-by-month
 *
 * via adminService.getDashboardStats()
 */

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";

import Sidebar from "@/components/SideBar";
import AdminLineChart from "@/components/AdminLineChart";
import styles from "@/styles/pages/DashboardAdminStyles";
import { adminService } from "@/services/adminService";
import {authService} from "@/services/authService";

/**
 * Type des données attendues pour alimenter le dashboard.
 * L'idée est que le back renvoie exactement ce format.
 */
type DashboardStats = {
    associationsCount: number;
    completedMissionsCount: number;
    usersCount: number;
    volunteersPerMonth: { month: string; value: number }[];
    missionsPerMonth: { month: string; value: number }[];
    pendingReportsCount: number;
    pendingAssociationsCount: number;
};

export default function DashboardAdmin() {
    const { width } = useWindowDimensions();
    const isMobile = width < 900;
    const router = useRouter();

    // State qui contient toutes les stats du dashboard
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError(null);

                // ⚠️ 7 mois comme tes mocks (tu peux mettre 12 si tu veux)
                await authService.login("admin@example.com", "password");
                const data = await adminService.getDashboardStats(7);

                if (isMounted) {
                    setStats(data);
                }
            } catch (e) {
                if (isMounted) {
                    setError("Impossible de charger les statistiques du tableau de bord.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadDashboard();

        return () => {
            isMounted = false;
        };
    }, []);

    // Navigation vers les pages de vérification / traitement
    const handleNavigateToReports = () => {
        router.push("/reportsverification");
    };

    const handleNavigateToAssociations = () => {
        router.push("/associationverification");
    };

    // Si les données ne sont pas encore chargées, on peut afficher un message
    if (loading || !stats) {
        return (
            <View style={styles.page}>
                <Sidebar
                    userType="admin"
                    userName="Bonjour, Mohamed"
                    onNavigate={() => {}}
                />
                <View
                    style={[
                        styles.mainBackground,
                        { justifyContent: "center", alignItems: "center" },
                    ]}
                >
                    {error ? (
                        <Text style={{ color: "red" }}>{error}</Text>
                    ) : (
                        <Text>Chargement du tableau de bord...</Text>
                    )}
                </View>
            </View>
        );
    }

    // On extrait les labels et valeurs à partir des tableaux renvoyés par l'api back
    const volunteerMonths = stats.volunteersPerMonth.map((p) => p.month);
    const volunteerValues = stats.volunteersPerMonth.map((p) => p.value);

    const missionMonths = stats.missionsPerMonth.map((p) => p.month);
    const missionValues = stats.missionsPerMonth.map((p) => p.value);

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
                    scrollEventThrottle={16}
                >
                    <View style={styles.contentWrapper}>
                        <Text style={styles.title}>Tableau de bord</Text>
                        <Text style={styles.subtitle}>
                            Vision globale sur les performances de l’application
                        </Text>

                        {/* KPIs du haut */}
                        <View style={[styles.kpiRow, isMobile && styles.column]}>
                            <KpiCard
                                icon={require("@/assets/images/hearticondahboard.png")}
                                label="Nombre d'association"
                                value={stats.associationsCount.toString()}
                            />
                            <KpiCard
                                icon={require("@/assets/images/CheckIconDashboard.png")}
                                label="Missions accomplies"
                                value={stats.completedMissionsCount.toLocaleString("fr-FR")}
                            />
                            <KpiCard
                                icon={require("@/assets/images/PersoniconDashboard.png")}
                                label="Nombre d'utilisateurs"
                                value={stats.usersCount.toLocaleString("fr-FR")}
                            />
                        </View>

                        {/* Graphiques mensuels */}
                        <View style={[styles.chartsRow, isMobile && styles.column]}>
                            <View style={styles.block}>
                                <Text style={styles.blockTitle}>
                                    Nouveaux bénévoles par mois
                                </Text>
                                <View style={[styles.chartCard, styles.chartOrange]}>
                                    <AdminLineChart
                                        labels={volunteerMonths}
                                        values={volunteerValues}
                                        lineColor="#FF7630"
                                    />
                                </View>
                            </View>

                            <View style={styles.block}>
                                <Text style={styles.blockTitle}>
                                    Missions terminées par mois
                                </Text>
                                <View style={[styles.chartCard, styles.chartPurple]}>
                                    <AdminLineChart
                                        labels={missionMonths}
                                        values={missionValues}
                                        lineColor="#3B5BFF"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Cartes du bas */}
                        <View style={[styles.bottomRow, isMobile && styles.column]}>
                            <View style={styles.block}>
                                <Text style={styles.blockTitle}>
                                    Signalements en attentes
                                </Text>
                                <PendingCard
                                    value={stats.pendingReportsCount.toString()}
                                    cardStyle={styles.pendingOrange}
                                    buttonStyle={styles.btnOrange}
                                    onPress={handleNavigateToReports}
                                />
                            </View>

                            <View style={styles.block}>
                                <Text style={styles.blockTitle}>
                                    Associations en attente de validation
                                </Text>
                                <PendingCard
                                    value={stats.pendingAssociationsCount.toString()}
                                    cardStyle={styles.pendingPurple}
                                    buttonStyle={styles.btnPurple}
                                    onPress={handleNavigateToAssociations}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

/**
 * Composant réutilisable pour afficher une carte KPI.
 * Il reçoit l'icône, le label et la valeur à afficher.
 */
function KpiCard({
                     icon,
                     label,
                     value,
                 }: {
    icon: any;
    label: string;
    value: string;
}) {
    return (
        <View style={styles.kpiCard}>
            <View style={styles.kpiIconWrap}>
                <Image source={icon} style={styles.kpiIcon} />
            </View>
            <View style={styles.kpiTextWrap}>
                <Text style={styles.kpiLabel}>{label}</Text>
                <Text style={styles.kpiValue}>{value}</Text>
            </View>
        </View>
    );
}

/**
 * Composant pour les cartes du bas (signalements / associations).
 * Il affiche une grande valeur et un bouton "traiter" qui déclenche une navigation.
 */
function PendingCard({
                         value,
                         cardStyle,
                         buttonStyle,
                         onPress,
                     }: {
    value: string;
    cardStyle: any;
    buttonStyle: any;
    onPress: () => void;
}) {
    return (
        <View style={[styles.pendingCard, cardStyle]}>
            <Text style={styles.pendingValue}>{value}</Text>

            <TouchableOpacity
                style={[styles.pendingBtn, buttonStyle]}
                onPress={onPress}
            >
                <Text style={styles.pendingBtnText}>traiter</Text>
            </TouchableOpacity>
        </View>
    );
}
