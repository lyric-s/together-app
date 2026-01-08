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
      id: "m1",
      mission_title: "Collecte alimentaire",
      association_name: "Restos du Cœur",
      date: new Date("2025-12-15"),
      image: require("../assets/images/dogs_img.png") as ImageSourcePropType
    },
    {
      id: "m2",
      mission_title: "Nettoyage de parc",
      association_name: "Green City",
      date: new Date("2025-12-20"),
      image: require("../assets/images/dogs_img.png") as ImageSourcePropType
    },
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
              key={mission.id}
              mission_title={mission.mission_title}
              association_name={mission.association_name}
              date={mission.date}
              image={mission.image}
              onPressDetail={() => {}} //TODO
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
