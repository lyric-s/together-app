import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


import { styles } from "../styles/components/MobileSearchBarStyle";

interface Props {
  onSearch: (text: string, filters: any) => void;
  category_list: string[];
  default_city?: string; // optionnel
}

/**
 * MobileSearchBar Component
 *
 * A customizable mobile search bar that allows users to:
 * - Enter a text query
 * - Apply optional filters (city with autocomplete, category, date ≥ today)
 * - Trigger a search action with the search icon
 * - Open a filter panel using the settings icon
 * - Reset all filters through a dedicated reset button
 *
 * Props:
 * - onSearch: (text: string, filters: { category?: string | null, city?: string | null, date?: Date | null }) => void
 *      Callback triggered when the user submits a search.
 *
 * - category_list: string[]
 *      List of available categories. Only one can be selected.
 *
 * - default_city?: string
 *      Optional initial city value that is automatically applied as a filter.
 *
 * Features:
 * - Autocompletion for French cities (API geo.api.gouv.fr)
 * - Single-choice category filter
 * - Date picker with restriction to today or future dates
 * - Display of active filters as colored tags
 * - Smooth open/close filter panel
 * - Reset button to clear all filters
 */
export default function MobileSearchBar({
  onSearch,
  category_list,
  default_city,
}: Props) {
  // Text search
  const [searchText, setSearchText] = useState("");

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(
    default_city ?? null
  );
  
  // UI: open filters
  const [filtersOpen, setFiltersOpen] = useState(false);

  // date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Autocompletion
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [cityInputText, setCityInputText] = useState(default_city ?? "");

  /**
  * Fetches French city name suggestions from the official geo.api.gouv.fr API.
  *
  * This function is triggered when the user types in the "city" filter field.
  * It sends a request to the government Geo API, searches communes matching
  * the typed text, and returns up to 10 results ordered by population relevance.
  *
  * If the input text is empty, suggestions are cleared.
  *
  * @param text The partial city name typed by the user.
  */
  const fetchCitySuggestions = async (text: string) => {
    if (!text) return setCitySuggestions([]);
    try {
        const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${text}&fields=nom&boost=population&limit=10`
        );
        const data = await response.json();
        setCitySuggestions(data.map((c: any) => c.nom));
        } catch (error) {
            console.error("Error fetching cities:", error);
    }
  };

  const applySearch = () => {
    onSearch(searchText, {
      category: selectedCategory,
      city: selectedCity,
      date: selectedDate,
    });
  };

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.searchBar}>
        {/* FILTERS BUTTON */}
        <TouchableOpacity
          onPress={() => setFiltersOpen(!filtersOpen)}
          style={styles.iconButton}
        >
          <Image
            source={require("../assets/images/setting.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* TEXT INPUT */}
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* SEARCH BUTTON */}
        <TouchableOpacity onPress={applySearch} style={styles.iconButton}>
          <Image
            source={require("../assets/images/loupe2.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* CURRENT FILTERS */}
      <View style={styles.activeFiltersContainer}>
        {selectedCity && (
          <View style={styles.filterTag}>
            <Text style={styles.filterText}>{selectedCity}</Text>
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
              {selectedDate.toLocaleDateString("fr-FR")}
            </Text>
          </View>
        )}
      </View>

      {/* FILTERS PANEL */}
      {filtersOpen && (
        <View style={styles.filtersPanel}>
          {/* City */}
          <Text style={styles.filterTitle}>Ville</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="Tape une ville..."
            value={cityInputText}
            onChangeText={(text) => {
            setCityInputText(text);
            setSelectedCity(null); // keep filter state in sync with edited text
            fetchCitySuggestions(text); // calling API pour autocompletion
            }}
          />

          {citySuggestions.length > 0 && (
            <FlatList
                data={citySuggestions}
                keyExtractor={(item, index) => `${item}-${index}`}
                style={styles.cityList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item} 
                        style={styles.cityItem}
                        onPress={() => {
                            setSelectedCity(item);     
                            setCityInputText(item);    
                            setCitySuggestions([]); 
                        }}
                        >
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
            />

          )}

          {/* Category */}
          <Text style={styles.filterTitle}>Catégorie</Text>
          <View style={styles.categoryList}>
            {category_list.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categoryButtonSelected,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date */}
          <Text style={styles.filterTitle}>Date</Text>

          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
            >
            <Text style={styles.datePickerText}>
                {selectedDate
                ? selectedDate.toLocaleDateString("fr-FR")
                : "Choisir une date"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
                value={selectedDate ?? new Date()}
                mode="date"
                display="spinner"
                minimumDate={new Date()}  
                onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setSelectedDate(date);
                }}
            />
          )}

          {/* Reset button */}
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
                setSelectedCategory(null);
                setSelectedCity(null);
                setSelectedDate(null);
                setCitySuggestions([]);
                setCityInputText(default_city ?? "");
            }}
            >
            <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
          </TouchableOpacity>


        </View>
      )}
    </View>
  );
}
