/**
 * DashboardAdmin
 *
 * Cette page affiche le tableau de bord administrateur de la plateforme Together.
 * Elle donne une vision globale de l'activité de l'application via :
 * - des indicateurs clés (KPI) en haut de la page ;
 * - deux graphiques mensuels (nouveaux bénévoles / missions terminées) ;
 * - deux cartes résumant les actions en attente (signalements / associations).
 *
 * Pour l'instant, les données sont mockées (locales). Le code est déjà structuré
 * pour être branché facilement sur le back-end plus tard.
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

/**
 * Fonction de récupération des stats.
 *
 * Pour l’instant, on renvoie des données mockées en dur.
 * TODO: plus tard, remplacer le contenu de cette fonction par un appel HTTP
 * vers l’API back.
 */
async function fetchDashboardStats(): Promise<DashboardStats> {
    // pause pour simuler un appel réseau
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
        associationsCount: 216,
        completedMissionsCount: 1251,
        usersCount: 20465,
        volunteersPerMonth: [
            { month: "Jui", value: 20 },
            { month: "Ao", value: 35 },
            { month: "Se", value: 30 },
            { month: "Oc", value: 70 },
            { month: "No", value: 25 },
            { month: "De", value: 55 },
            { month: "Ja", value: 60 },
        ],
        missionsPerMonth: [
            { month: "Jui", value: 15 },
            { month: "Ao", value: 28 },
            { month: "Se", value: 40 },
            { month: "Oc", value: 78 },
            { month: "No", value: 22 },
            { month: "De", value: 50 },
            { month: "Ja", value: 58 },
        ],
        pendingReportsCount: 16,
        pendingAssociationsCount: 3,
    };
}

export default function DashboardAdmin() {
    const { width } = useWindowDimensions();
    const isMobile = width < 900;
    const router = useRouter();

    // State qui contient toutes les stats du dashboard
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true); // permet d'afficher un état de chargement si besoin
    const [error, setError] = useState<string | null>(null); // en cas d'erreur d'appel API

    useEffect(() => {
        // Au montage de la page, on va chercher les données du dashboard
        fetchDashboardStats()
            .then((data) => {
                setStats(data);
            })
            .catch(() => {
                // TODO: gérer le message d'erreur de façon plus propre (toast, composant dédié)
                setError("Impossible de charger les statistiques du tableau de bord.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Navigation vers les pages de vérificationassoetreport / traitement
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
                        <Text style={styles.title}>Tableau de bords</Text>
                        <Text style={styles.subtitle}>
                            Vision globale sur les performances de l’application
                        </Text>

                        {/* KPIs du haut : chaque carte lit maintenant les valeurs depuis "stats" */}
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

                        {/* Graphiques mensuels : on passe les mois et valeurs calculés à partir des données du state */}
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

                        {/* Cartes du bas : les nombres viennent aussi du state (pendingReportsCount / pendingAssociationsCount) */}
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
