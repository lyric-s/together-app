import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Modal,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles/components/MobileSearchBarStyle";
import { Colors } from "@/constants/colors";

interface SearchFilters {
  category: string | null;
  zipCode: string | null;
  date: Date | null;
}

interface Props {
  onSearch: (text: string, filters: SearchFilters) => void;
  category_list: string[];
  default_city?: string;
}

interface City {
  code: string;
  nom: string;
  codesPostaux: string[];
}

export default function MobileSearchBar({
  onSearch,
  category_list,
  default_city,
}: Props) {
  const [searchText, setSearchText] = useState("");

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCityName, setSelectedCityName] = useState<string | null>(default_city ?? null);
  const [selectedZipCode, setSelectedZipCode] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // UI State
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Autocomplete State
  const [citySuggestions, setCitySuggestions] = useState<City[]>([]);
  const [cityInputText, setCityInputText] = useState(default_city ?? "");

  const fetchCitySuggestions = async (text: string) => {
    if (/^\d{5}$/.test(text)) {
        setSelectedZipCode(text);
    } else if (text.length < 5) {
        setSelectedZipCode(null);
    }

    if (!text || text.length < 2) {
      setCitySuggestions([]);
      return;
    }
    
    try {
      const isZip = /^\d+$/.test(text);
      const param = isZip ? `codePostal=${text}` : `nom=${encodeURIComponent(text)}`;
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?${param}&fields=nom,codesPostaux&boost=population&limit=5`
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setCitySuggestions(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCitySuggestions([]);
    }
  };

  const handleSelectCity = (item: City) => {
    setSelectedCityName(item.nom);
    const cp = item.codesPostaux && item.codesPostaux.length > 0 ? item.codesPostaux[0] : "";
    setSelectedZipCode(cp);
    setCityInputText(`${item.nom} (${cp})`);
    setCitySuggestions([]);
  };

  const applySearch = () => {
    console.log("Application des filtres :", { 
        text: searchText, 
        cat: selectedCategory, 
        zip: selectedZipCode,
        date: selectedDate 
    });

    setFiltersOpen(false);
    onSearch(searchText, {
      category: selectedCategory,
      zipCode: selectedZipCode,
      date: selectedDate,
    });
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedCityName(null);
    setSelectedZipCode(null);
    setSelectedDate(null);
    setCityInputText("");
    setCitySuggestions([]);
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
        setShowDatePicker(false);
    }
    if (date) {
        setSelectedDate(date);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.searchBar}>
        <TouchableOpacity
          onPress={() => setFiltersOpen(true)}
          style={styles.iconButton}
        >
          <Image source={require("../assets/images/setting.png")} style={styles.icon} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Rechercher une mission..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={applySearch}
        />

        <TouchableOpacity onPress={applySearch} style={styles.iconButton}>
          <Image source={require("../assets/images/loupe2.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* ACTIVE FILTERS CHIPS */}
      <View style={styles.activeFiltersContainer}>
        {(selectedCityName || selectedZipCode) && (
          <View style={styles.filterTag}>
            <Text style={styles.filterText}>
               {selectedCityName ? selectedCityName : "Zone"} {selectedZipCode ? `(${selectedZipCode})` : ""}
            </Text>
          </View>
        )}
        {selectedCategory && (
            <View style={styles.filterTag}>
                <Text style={styles.filterText}>{selectedCategory}</Text>
            </View>
        )}
        {selectedDate && (
          <View style={styles.filterTag}>
            <Text style={styles.filterText}>
              Dès le {selectedDate.toLocaleDateString("fr-FR")}
            </Text>
          </View>
        )}
      </View>

      {/* FILTERS PANEL */}
      <Modal visible={filtersOpen} animationType="slide" presentationStyle="pageSheet">
        <View style={internalStyles.modalContainer}>
            <View style={internalStyles.modalHeader}>
                <Text style={internalStyles.modalTitle}>Filtres</Text>
                <TouchableOpacity onPress={() => setFiltersOpen(false)}>
                    <Text style={{fontSize: 20, padding: 10}}>✕</Text>
                </TouchableOpacity>
            </View>

          {/* 1. City / Zip Code Filter */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <ScrollView 
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
            >
              <Text style={styles.filterTitle}>Ville ou Code Postal</Text>
              <TextInput
                style={[styles.filterInput, { borderWidth: 1, borderColor: Colors.grayBorder, padding: 10, borderRadius: 8 }]}
                placeholder="Ex: Paris ou 75001"
                value={cityInputText}
                onChangeText={(text) => {
                  setCityInputText(text);
                  fetchCitySuggestions(text);
                  if(selectedZipCode) setSelectedZipCode(null);
                }}
              />

              {citySuggestions.length > 0 && (
                <View style={internalStyles.suggestionsContainer}>
                  {citySuggestions.map((item) => (
                    <TouchableOpacity
                      key={item.code}
                      style={internalStyles.suggestionItem}
                      onPress={() => handleSelectCity(item)}
                    >
                      <Text>{item.nom} {item.codesPostaux?.[0] ? `(${item.codesPostaux[0]})` : ""}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* 2. Category Filter */}
              <Text style={styles.filterTitle}>Catégorie</Text>
              <View style={styles.categoryList}>
                {category_list.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      selectedCategory === cat && styles.categoryButtonSelected,
                    ]}
                    onPress={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  >
                    <Text style={styles.categoryText}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* 3. Date Filter */}
              <Text style={styles.filterTitle}>Date de début</Text>
              
              <TouchableOpacity 
                onPress={toggleDatePicker}
                style={internalStyles.dateButton}
              >
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {selectedDate ? selectedDate.toLocaleDateString('fr-FR') : "📅 Sélectionner une date"}
                </Text>
              </TouchableOpacity>

              {/* Gestion Spécifique iOS vs Android pour le Picker */}
              {showDatePicker && (
                <View style={internalStyles.datePickerContainer}>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                    themeVariant="light"
                    style={Platform.OS === 'ios' ? { width: '100%' } : undefined} 
                  />
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity 
                        onPress={() => setShowDatePicker(false)}
                        style={{alignItems: 'center', padding: 10}}
                      >
                          <Text style={{color: 'blue'}}>Masquer le calendrier</Text>
                      </TouchableOpacity>
                  )}
                </View>
              )}
              {/* Action Buttons */}
              <View style={{flexDirection: 'row', gap: 10, marginTop: 30}}>
                <TouchableOpacity
                  style={[styles.resetButton, {flex: 1, backgroundColor: Colors.whiteLittleGray}]}
                  onPress={resetFilters}
                >
                  <Text style={[styles.resetButtonText, {color: 'black'}]}>Effacer</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.resetButton, {flex: 1, backgroundColor: 'black'}]}
                  onPress={applySearch}
                >
                  <Text style={[styles.resetButtonText, {color: 'white'}]}>Voir les résultats</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

// Styles internes pour le Modal DatePicker iOS
const internalStyles = StyleSheet.create({
  dateButton: {
    backgroundColor: Colors.darkerWhite, 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayToWhite
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  suggestionsContainer: {
    marginTop: 5,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grayToWhite,
    borderRadius: 8,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  datePickerContainer: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});