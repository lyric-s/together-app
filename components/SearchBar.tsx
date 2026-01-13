import { View, TextInput, Text, TouchableOpacity, Image, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Colors } from "../constants/colors";
import { styles } from "../styles/components/SearchBarStyle";
import { SearchFilters } from "../types/search.types";

interface SearchBarProps {
  categories?: string[]; // Renommé pour la clarté (était filters_1)
  onSearch: (text: string, filters: SearchFilters) => void;
}

/**
 * Render a search bar with inputs for query text, category, postal code, and start date, plus controls to execute or reset the search.
 *
 * The component calls `onSearch` when the user submits a search or presses the search button, passing the current text and a `SearchFilters` object where empty fields are represented as `null` and a valid `dateText` is parsed to a `Date`.
 *
 * @param categories - Optional list of category labels displayed in the category picker; the picker shows a default "Catégorie..." option mapped to `null`.
 * @param onSearch - Callback invoked with `(text: string, filters: SearchFilters)` when a search is triggered. `filters` has the shape `{ category: string | null; zipCode: string | null; date: Date | null }`.
 * @returns The rendered search bar React element containing inputs and action buttons.
 */
export default function SearchBar({
    categories = [],    
    onSearch,
  }: SearchBarProps) {

  const [text, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("-");
  const [zipCode, setZipCode] = useState("");
  const [dateText, setDateText] = useState("");

  function resetAll() {
    setText("");
    setSelectedCategory("-");
    setZipCode("");
    setDateText("");
    onSearch("", { category: null, zipCode: null, date: null });
  }

  const handleSearch = () => {
    let dateObj: Date | null = null;
    if (dateText) {
      // Validate YYYY-MM-DD format explicitly
        const match = dateText.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (match) {
          const d = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
          if (!isNaN(d.getTime())) {
              dateObj = d;
          }
        }
    }

    onSearch(text, {
      category: selectedCategory === "-" ? null : selectedCategory,
      zipCode: zipCode.trim() === "" ? null : zipCode,
      date: dateObj
    });
  };

  return (
    <View style={styles.container}>
      
      <TextInput
        style={[styles.input, { flex: 2 }]}
        placeholder="Rechercher une mission..."
        placeholderTextColor={Colors.grayPlaceholder}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSearch}
      />

      <View style={[styles.input, styles.pickerContainer, { flex: 1.5, marginLeft: 10 }]}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(v) => setSelectedCategory(v)}
          style={styles.picker}
          dropdownIconColor={Colors.black}
        >
          <Picker.Item label="Catégorie..." value="-" color={Colors.grayPlaceholder} />
          {categories.map((f) => (
            <Picker.Item key={f} label={f} value={f} color={Colors.black} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={[styles.input, { flex: 1, marginLeft: 10 }]}
        placeholder="Code Postal"
        placeholderTextColor={Colors.grayPlaceholder}
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric"
        maxLength={5}
      />
      
      <TextInput
        style={[styles.input, { flex: 1, marginLeft: 10 }]}
        placeholder="Date début (AAAA-MM-JJ)"
        placeholderTextColor={Colors.grayPlaceholder}
        value={dateText}
        onChangeText={setDateText}
      />

      {/* Button Reset */}
      <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
        <Text style={styles.resetText}>X</Text>
      </TouchableOpacity>

      {/* Search button */}
      <TouchableOpacity onPress={handleSearch}>
        <Image
          source={require("../assets/images/loupe.png")}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
}