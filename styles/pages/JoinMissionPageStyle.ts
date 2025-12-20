import { StyleSheet, Platform, Dimensions } from "react-native";
import { Colors } from "@/constants/colors";

const isWeb = Platform.OS === "web";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  // WEB
  scrollContentWeb: {
    width: "80%",
  },

  webTopSection: {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 32,
},

webInfoColumn: {
  flex: 1,
  justifyContent: "flex-start",
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
    flexShrink: 1,
  },

  /* IMAGE */
  missionImage: {
    width: isWeb ? "60%" : "100%",
    height: 240,
    borderRadius: 14,
    marginBottom: 20,
  },

  /* ROWS */
  row: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 12,
  gap: 10,
  flexWrap: Platform.OS === "web" ? "wrap" : "nowrap",
},


  label: {
    fontSize: isWeb ? 19 : 16,
    fontWeight: "500",
    color: Colors.black,
  },

  /* VOLUNTEERS */
  volunteerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  volunteerText: {
    fontSize: isWeb ? 19 : 16,
    fontWeight: "500",
  },

  peopleIcon: {
    width: isWeb ? 32 : 24,
    height: isWeb ? 32 : 24,
    marginLeft: isWeb ? 15 : 6,
  },

  /* CARD */
  bottomCard: {
    marginTop: 20,
    backgroundColor: Colors.bottomBackground,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },

  description: {
    fontSize: isWeb ? 19 : 15,
    lineHeight: 22,
    color: Colors.black,
  },

  /* ACTIONS */
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: -24,
  },

  heartIcon: {
    width: 42,
    height: 42,
    marginTop: 98,
  },

  infoLine: {
    fontSize: isWeb ? 19 : 15,
    color: Colors.black,
  },

  infoLabel: {
    fontWeight: "600",
    fontSize : isWeb ? 19 : 15
  },
});
