import { StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
  },

  /* IMAGE */
  missionImage: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    marginBottom: 20,
  },

  /* ROWS */
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },

  /* VOLUNTEERS */
  volunteerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  volunteerText: {
    fontSize: 14,
    fontWeight: "500",
  },
  peopleIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  /* BOTTOM CARD */
  bottomCard: {
    marginTop: 20,
    backgroundColor: Colors.bottomBackground,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  associationName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },
  date: {
    fontSize: 14,
    color: Colors.black,
  },
  location: {
    fontSize: 14,
    fontStyle: "italic",
    color: Colors.black,
  },
  description: {
    fontSize: 14,
    color: Colors.black,
    marginTop: 6,
  },

  /* ACTIONS */
  actionsRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heartIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});
