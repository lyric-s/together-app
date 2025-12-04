import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, useWindowDimensions  } from "react-native";
import ProfilePicture from "./ProfilPicture";
import { getStyles } from "../styles/components/SideBarStyle"

type SidebarProps = {
  userType: "volunteer" | "volunteer_guest" | "association" | "admin";
  userName: string;
  onNavigate: (route: string) => void;
};

type SidebarButtonProps = {
  icon: any;
  label: string;
  onPress: () => void;
  active?: boolean;
};

/**
 * SidebarButton component for the sidebar menu.
 *
 * @param icon - Image source of the button icon
 * @param label - Text label displayed next to the icon
 * @param onPress - Callback executed when the button is pressed
 * @param active - Boolean indicating if the button is currently active (changes background color)
 *
 * Renders a horizontal button with an icon on the left and a label on the right.
 * When `active` is true, the background becomes bright orange to highlight selection.
 */
function SidebarButton({ icon, label, onPress, active=false }:SidebarButtonProps) {
  const { width } = useWindowDimensions();
  const styles = getStyles(width);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, active && styles.activeButton]}
    >
      <Image source={icon} style={styles.buttonIcon} />
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

/**
 * Sidebar component for web/desktop.
 *
 * @param userType - Type of the user ("volunteer", "volunteer_guest", "association", "admin")
 * @param userName - Display name of the user or association
 * @param onNavigate - Callback to navigate when a button is clicked; receives the route string
 * @param currentRoute - Current active route; used to highlight the active button
 *
 * Displays:
 * - App title based on user type
 * - Profile picture and user name
 * - Two sections: GENERAL (main navigation) and SECURITE (logout/settings)
 * - Buttons highlight in bright orange when active
 * - Designed for responsive width; scrollable if content overflows
 */

export default function Sidebar({ userType, userName, onNavigate }: SidebarProps) {
  const { width } = useWindowDimensions();
  const styles = getStyles(width);

  const appTitle =
    userType === "volunteer" || userType === "volunteer_guest"
      ? "Together"
      : userType === "association"
      ? "Together Association"
      : "Together Management";

    // to be changed later with the correct values
  const sections = {
    volunteer_connected: [
      { icon: require("../assets/images/home.png"), label: "Accueil", route: "home" },
      { icon: require("../assets/images/search.png"), label: "Recherche", route: "search" },
      { icon: require("../assets/images/upcoming.png"), label: "Mission à venir", route: "upcoming" },
      { icon: require("../assets/images/historical.png"), label: "Historiques", route: "history" },
      { icon: require("../assets/images/user.png"), label: "Profil", route: "profile" },
    ],
    volunteer_guest: [
      { icon: require("../assets/images/home.png"), label: "Accueil", route: "home" },
      { icon: require("../assets/images/search.png"), label: "Recherche", route: "search" },
    ],
    association: [
      { icon: require("../assets/images/home.png"), label: "Accueil", route: "home" },
      { icon: require("../assets/images/plus.png"), label: "Rechercher une mission", route: "search" },
      { icon: require("../assets/images/upcoming.png"), label: "Mission à venir", route: "upcoming" },
      { icon: require("../assets/images/historical.png"), label: "Historiques", route: "history" },
      { icon: require("../assets/images/user.png"), label: "Profil", route: "profile" },
    ],
    admin: [
      { icon: require("../assets/images/dashboard.png"), label: "Tableau de bord", route: "dashboard" },
      { icon: require("../assets/images/search.png"), label: "Recherche", route: "search" },
      { icon: require("../assets/images/report.png"), label: "Signalement", route: "report" },
      { icon: require("../assets/images/user.png"), label: "Profil", route: "profile" },
    ],
  };

  const generalItems =
    userType === "volunteer_guest"
      ? sections.volunteer_guest
      : userType === "volunteer"
      ? sections.volunteer_connected
      : userType === "association"
      ? sections.association
      : sections.admin;

  const securityItems = [
    { icon: require("../assets/images/logout.png"), label: "Déconnexion", route: "logout" },
    { icon: require("../assets/images/settings.png"), label: "Réglages", route: "settings" },
  ];

  const [currentRoute, setCurrentRoute] = React.useState<string | null>(null);

  return (
    <View style={styles.sidebar}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* HEADER */}
            <View>
                <View style={styles.titleRow}>
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>{appTitle}</Text>
                </View>

                {/* PROFIL */}
                <View style={styles.profileRow}>
                    <ProfilePicture
                        source={require("../assets/images/favicon.png")}
                        size={45}
                    />
                    <Text style={styles.userName}>{userName}</Text>
                </View>

                {/* GENERAL SECTION */}
                <Text style={styles.sectionTitle}>GENERAL</Text>
                {generalItems.map((item, i) => (
                <SidebarButton
                    key={i}
                    icon={item.icon}
                    label={item.label}
                    active={currentRoute === item.route}
                    onPress={() => {
                        onNavigate(item.route);
                        setCurrentRoute(item.route);
                    }}
                />
                ))}
            </View>

            {/* SECURITY SECTION */}
            <View>
                <Text style={styles.sectionTitle}>SECURITE</Text>
                {securityItems.map((item, i) => (
                <SidebarButton
                    key={i}
                    icon={item.icon}
                    label={item.label}
                    active={currentRoute === item.route}
                    onPress={() => {
                        onNavigate(item.route);
                        setCurrentRoute(item.route);
                    }}
                />
                ))}
            </View>
        </ScrollView>
      
    </View>
  );
}

