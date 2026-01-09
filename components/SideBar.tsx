import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import ProfilePicture from "./ProfilPicture";
import { getStyles } from "../styles/components/SideBarStyle";
import { usePathname } from "expo-router";

const MOBILE_BREAKPOINT = 900;

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
  const isSmallScreen = width < 900; 
  const [menuOpen, setMenuOpen] = React.useState(false);
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
 * Renders the application sidebar with responsive behavior and navigation controls.
 *
 * On wide screens the sidebar is shown permanently; on narrow screens it is toggled by a burger button
 * and appears as an overlay that does not resize main content. Selecting a navigation item on narrow
 * screens closes the sidebar. The sidebar shows an app title derived from the user type, a profile
 * row, and two sections of navigation items (GENERAL and SECURITE) with active-item highlighting.
 *
 * @param userType - One of "volunteer", "volunteer_guest", "association", or "admin"; determines available routes and the app title
 * @param userName - Display name shown in the profile row
 * @param onNavigate - Callback invoked with the destination route string when a navigation item is selected
 */
export default function Sidebar({ userType, userName, onNavigate }: SidebarProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < MOBILE_BREAKPOINT;
  const styles = getStyles(width);
  const pathname = usePathname();

  const [open, setOpen] = React.useState(!isMobile);

  // Resize
  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const appTitle =
    userType === "volunteer" || userType === "volunteer_guest"
      ? "Together"
      : userType === "association"
      ? "Together Association"
      : "Together Management";

  const sections = {
    volunteer_connected: [
      { icon: require("../assets/images/home.png"), label: "Accueil", route: "/home" },
      { icon: require("../assets/images/search.png"), label: "Recherche", route: "/search" },
      { icon: require("../assets/images/upcoming.png"), label: "Mission à venir", route: "/upcoming" },
      { icon: require("../assets/images/historical.png"), label: "Historiques", route: "/history" },
      { icon: require("../assets/images/user.png"), label: "Profil", route: "/profile" },
    ],
    volunteer_guest: [
      { icon: require("../assets/images/home.png"), label: "Accueil", route: "/home" },
      { icon: require("../assets/images/search.png"), label: "Recherche", route: "/search" },
    ],
    association: [
      { icon: require("../assets/images/home.png"), label: "Accueil", route: "/home" },
      { icon: require("../assets/images/plus.png"), label: "Créer une mission", route: "/mission_creation" },
      { icon: require("../assets/images/upcoming.png"), label: "Mission à venir", route: "/upcoming" },
      { icon: require("../assets/images/historical.png"), label: "Historiques", route: "/history" },
      { icon: require("../assets/images/user.png"), label: "Profil", route: "/profile" },
    ],
    admin: [
      { icon: require("../assets/images/dashboard.png"), label: "Tableau de bord", route: "/dashboard" },
      { icon: require("../assets/images/search.png"), label: "Recherche", route: "/search" },
      { icon: require("../assets/images/report.png"), label: "Signalement", route: "/report" },
      { icon: require("../assets/images/user.png"), label: "Profil", route: "/profile" },
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

  const isRouteActive = (route: string) => {
    if (route === "/") return pathname === "/";
    // Exact match or prefix match followed by "/"
    return pathname === route || pathname.startsWith(route + "/");
  };

  return (
    <>
      {/* BURGER BUTTON */}
      {isMobile && (
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          style={styles.burgerButton}
          accessibilityRole="button"
          accessibilityLabel={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <Text style={styles.burger}>☰</Text>
        </TouchableOpacity>      )}

      {/* SIDEBAR */}
      {open && (
        <View
          style={[
            styles.sidebar,
            isMobile && styles.reducedSideBar,
          ]}
        >
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

              <Text style={styles.sectionTitle}>GENERAL</Text>
              {generalItems.map((item, i) => (
                <SidebarButton
                  key={i}
                  icon={item.icon}
                  label={item.label}
                  active={isRouteActive(item.route)}
                  onPress={() => {
                    onNavigate(item.route);
                    if (isMobile) setOpen(false);
                  }}
                />
              ))}
            </View>

            <View>
              <Text style={styles.sectionTitle}>SECURITE</Text>
              {securityItems.map((item, i) => (
                <SidebarButton
                  key={i}
                  icon={item.icon}
                  label={item.label}
                  active={isRouteActive(item.route)}
                  onPress={() => {
                    onNavigate(item.route);
                    if (isMobile) setOpen(false);
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}