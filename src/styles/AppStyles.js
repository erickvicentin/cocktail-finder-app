import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    paddingTop: 150,
    alignItems: "center",
  },
  searchBarModal: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '85%',
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  modalSearchIcon: {
    marginRight: 10,
  },
  modalInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingBottom: 10,
    borderBottomColor: "rgba(255,255,255,0.5)",
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "white",
    fontSize: 16,
    height: 40,
  },
  iconButton: {
    padding: 5,
    marginLeft: 5,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
  }
});

export default styles;
