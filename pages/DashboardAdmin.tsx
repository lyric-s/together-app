/**
 * DashboardAdmin
 *
 * This page renders the main administration dashboard of the Together platform.
 * It provides administrators with a global overview of the application's activity
 * and key performance indicators.
 *
 * The dashboard includes:
 * - A role-based sidebar for navigation.
 * - Key performance indicators (KPIs) displaying:
 *   - Total number of associations.
 *   - Total number of completed missions.
 *   - Total number of users.
 * - Two line charts showing monthly statistics:
 *   - New volunteers per month.
 *   - Missions completed per month.
 * - Two summary cards highlighting pending administrative actions:
 *   - Reports awaiting review.
 *   - Associations awaiting validation.
 *
 * The layout is responsive and adapts to screen size:
 * - On desktop screens, content is displayed in rows.
 * - On smaller screens (width < 900px), content stacks vertically.
 *
 * This component is intended for administrator use only.
 */

import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
} from "react-native";

import Sidebar from "@/components/SideBar";
import AdminLineChart from "@/components/AdminLineChart";
import styles from "@/styles/pages/DashboardAdminStyles";

export default function DashboardAdmin() {
    const { width } = useWindowDimensions();
    const isMobile = width < 900;

    const months = ["Jui", "Ao", "Se", "Oc", "No", "De", "Ja"];
    const volunteers = [20, 35, 30, 70, 25, 55, 60];
    const missions = [15, 28, 40, 78, 22, 50, 58];

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

                        <View style={[styles.kpiRow, isMobile && styles.column]}>
                            <KpiCard
                                icon={require("@/assets/images/gray_heart.png")}
                                label="Nombre d'association"
                                value="216"
                            />
                            <KpiCard
                                icon={require("@/assets/images/validate.png")}
                                label="Missions accomplies"
                                value="1,251"
                            />
                            <KpiCard
                                icon={require("@/assets/images/user2.png")}
                                label="Nombre d'utilisateurs"
                                value="20465"
                            />
                        </View>

                        <View style={[styles.chartsRow, isMobile && styles.column]}>
                            <View style={styles.block}>
                                <Text style={styles.blockTitle}>
                                    Nouveaux bénévoles par mois
                                </Text>
                                <View style={[styles.chartCard, styles.chartOrange]}>
                                    <AdminLineChart
                                        labels={months}
                                        values={volunteers}
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
                                        labels={months}
                                        values={missions}
                                        lineColor="#3B5BFF"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[styles.bottomRow, isMobile && styles.column]}>
                            <View style={styles.block}>
                                <Text style={styles.blockTitle}>
                                    Signalements en attentes
                                </Text>
                                <PendingCard
                                    value="16"
                                    cardStyle={styles.pendingOrange}
                                    buttonStyle={styles.btnOrange}
                                />
                            </View>

                            <View style={styles.block}>
                                <Text style={styles.blockTitle}>
                                    Associations en attente de validation
                                </Text>
                                <PendingCard
                                    value="3"
                                    cardStyle={styles.pendingPurple}
                                    buttonStyle={styles.btnPurple}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

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

function PendingCard({
                         value,
                         cardStyle,
                         buttonStyle,
                     }: {
    value: string;
    cardStyle: any;
    buttonStyle: any;
}) {
    return (
        <View style={[styles.pendingCard, cardStyle]}>
            <Text style={styles.pendingValue}>{value}</Text>

            <TouchableOpacity style={[styles.pendingBtn, buttonStyle]}>
                <Text style={styles.pendingBtnText}>traiter</Text>
            </TouchableOpacity>
        </View>
    );
}
