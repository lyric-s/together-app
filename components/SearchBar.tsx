import { View, TextInput, Text, TouchableOpacity, Image, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Colors } from "../constants/colors";
import { styles } from "../styles/components/SearchBarStyle";

// Interface harmonisée avec la version mobile
interface SearchFilters {
  category: string | null;
  zipCode: string | null;
  date: Date | null;
}

interface SearchBarProps {
  categories?: string[]; // Renommé pour la clarté (était filters_1)
  onSearch: (text: string, filters: SearchFilters) => void;
}

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
        const d = new Date(dateText);
        if (!isNaN(d.getTime())) {
            dateObj = d;
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

      <View style={[styles.input, styles.pickerContainer,, { flex: 1.5, marginLeft: 10 }]}>
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