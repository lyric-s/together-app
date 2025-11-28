import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
// console.log(screenWidth); ca ma print 1400

// breakpoint at 900px = PC/tablette large
const isLargeScreen = screenWidth > 1000;

export const styles = StyleSheet.create({
  card: {
    width: isLargeScreen?"30%":"100%",
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: 12,
    marginHorizontal: 12,
    overflow: "hidden",
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
     
  },

  imageContainer: {
    width: "100%",
    height: 150,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },

  textContainer: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.black,
  },

  association: {
    fontSize: 14,
    color: Colors.black,
    marginTop: 2,
  },

  date: {
    fontSize: 13,
    color: Colors.black,
    marginTop: 4,
  },

  detailButton: {
    backgroundColor: Colors.brightOrange,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },

  detailButtonText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
});
