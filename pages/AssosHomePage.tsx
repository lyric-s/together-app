import {
  View,
  Text,
  ScrollView,
  ImageSourcePropType ,
} from "react-native";
import MissionAdminAssosCard from "@/components/MissionAdminAssosCard";
import { styles } from "@/styles/pages/AssosHomePageStyle"


/**
 * Represents a single notification item.
 *
 * @property id - Unique identifier of the notification
 * @property message - Text content displayed to the user
 * @property type - Notification category (info, warning, success)
 * @property date - Date when the notification was generated
 */
type Notification = {
  id: string;
  message: string;
  date: Date;
};

/**
 * Represents a group of notifications displayed under the same date section.
 *
 * @property title - Section title (e.g. "Today", "Yesterday", or formatted date)
 * @property data - List of notifications belonging to this section
 */
type NotificationSection = {
  title: string;
  data: Notification[];
};


/**
 * AssosHomePage
 *
 * Association home page layout composed of two main sections:
 *
 * - Left column (35%):
 *   Displays upcoming missions using MissionAdminAssosCard components.
 *
 * - Right column (65%):
 *   Displays notifications grouped by date (Today, Yesterday, or specific date).
 *
 * Notifications are dynamically grouped into sections based on their date.
 * The layout is optimized for desktop usage with scrollable columns.
 */
export default function AssosHomePage() {
  // ---- MOCK DATA  ---- //TODO
  const notifications: Notification[] = [
  {
    id: "1",
    message: "Une nouvelle candidature a été reçue.",
    date: new Date(),
  },
  {
    id: "2",
    message: "Mission “Collecte alimentaire” publiée.",
    date: new Date(),
  },
  {
    id: "3",
    message: "Attention : mission sans bénévoles.",
    date: new Date("2025-12-12"),
  },
  {
    id: "4",
    message: "Mission terminée avec succès.",
    date: new Date("2025-11-12"),
  },
];

  const upcomingMissions = [
    {
    id_mission: 1,
    name: "Distribution repas d'hiver",
    date_start: "2025-12-01",
    date_end: "2025-12-31",
    skills: "logistique, cuisine, accueil",
    description: "Distribution quotidienne de repas chauds aux personnes sans-abri pendant la période hivernale.",
    capacity_min: 5,
    capacity_max: 20,
    id_location: 1,
    id_categ: 1,
    id_asso: 1,
    location: undefined,
    category: undefined,
    association: {
      id_asso: 1,
      id_user: 101,
      name: "Croix Rouge Française",
      address: "10 Rue de la République",
      country: "France",
      phone_number: "+33123456789",
      zip_code: "75001",
      rna_code: "W751234567",
      company_name: "Croix Rouge",
      description: "Aide humanitaire et sociale d'urgence.",
      user: undefined
    }
  },
  {
    id_mission: 2,
    name: "Collecte vestimentaire",
    date_start: "2025-11-15",
    date_end: "2025-12-15",
    skills: "tri, logistique, transport",
    description: "Collecte et tri de vêtements chauds pour redistribution aux plus démunis.",
    capacity_min: 8,
    capacity_max: 15,
    id_location: 2,
    id_categ: 2,
    id_asso: 2,
    location: undefined,
    category: undefined,
    association: {
      id_asso: 2,
      id_user: 102,
      name: "Secours Populaire Français",
      address: "28 Rue de la Solidarité",
      country: "France",
      phone_number: "+33198765432",
      zip_code: "75010",
      rna_code: "W752345678",
      company_name: "Secours Populaire",
      description: "Aide aux populations vulnérables.",
      user: undefined
    }
  },
  {
    id_mission: 3,
    name: "Ateliers insertion",
    date_start: "2025-10-01",
    date_end: "2026-03-31",
    skills: "animation, coaching, administratif",
    description: "Accompagnement vers l'insertion professionnelle et sociale des personnes en précarité.",
    capacity_min: 3,
    capacity_max: 10,
    id_location: 3,
    id_categ: 3,
    id_asso: 3,
    location: undefined,
    category: undefined,
    association: {
      id_asso: 3,
      id_user: 103,
      name: "Emmaüs France",
      address: "5 Avenue de l'Égalité",
      country: "France",
      phone_number: "+33145678901",
      zip_code: "75020",
      rna_code: "W753456789",
      company_name: "Emmaüs",
      description: "Réinsertion sociale et recyclage solidaire.",
      user: undefined
    }
  }
  ];

  //Returns the display title for a notification section based on its date.
  const getSectionTitle = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  if (isSameDay(date, today)) return "Aujourd’hui";
  if (isSameDay(date, yesterday)) return "Hier";

  return date.toLocaleDateString("fr-FR");
  };
  
  //Returns the corresponding style object based on notification type.
  const notificationSections = Object.values(
  notifications.reduce<Record<string, NotificationSection>>((acc, notif) => {
    const title = getSectionTitle(notif.date);

    if (!acc[title]) {
      acc[title] = { title, data: [] };
    }

    acc[title].data.push(notif);
    return acc;
  }, {})
  );


  return (
    <View style={styles.container}>
      
      {/* LEFT COLUMN – MISSIONS (35%) */}
      <View style={styles.leftColumn}>
        <Text style={styles.pageTitle}>Accueil</Text>
        <Text style={styles.columnTitle}>Missions à venir</Text>

        <ScrollView showsVerticalScrollIndicator={true}>
          {upcomingMissions.map((mission) => (
            <MissionAdminAssosCard
              key={mission.id_mission} 
              mission={mission}              
            />
          ))}
        </ScrollView>
      </View>

      {/* RIGHT COLUMN – NOTIFICATIONS (65%) */}
      <View style={styles.rightColumn}>
        <Text style={styles.columnTitle}>Notifications</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {notificationSections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>

              {section.data.map((notif) => (
                <View
                  key={notif.id}
                  style={[styles.notificationCard, styles.notifInfo]}
                >
                  <Text style={styles.notificationText}>
                    {notif.message}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
