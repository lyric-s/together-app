import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Colors } from "../constants/colors";
import { styles } from "../styles/components/SearchBarStyle"

// -------- C17 Search bar
interface SearchBarProps {
  filters_1?: string[];
  filters_2?: string[];
  onSearch: (text: string, filter1: string, filter2?: string) => void;
}

/**
   * Renders a search bar with a text input, two optional filter pickers, a reset button, and a search trigger.
   *
   * The component initializes picker selections from the first entries of `filters_1` and `filters_2` (or "-" if absent).
   * Pressing the reset button clears the text, restores both pickers to their defaults, and invokes `onSearch` with an empty text and the default filters.
   * Pressing the search icon invokes `onSearch` with the current text and selected filter values.
   *
   * @param filters_1 - Optional list of values for the first picker; the first item is used as the default selection when present.
   * @param filters_2 - Optional list of values for the second picker; the first item is used as the default selection when present.
   * @param onSearch - Callback invoked to perform a search with signature `(text, filter1, filter2?)`. `filter2` may be `"-"` when no selection is made.
   * @returns The rendered search bar React element.
   */
  export default function SearchBar({
    filters_1 = [],    
    filters_2 = [],    
    onSearch,
  }: SearchBarProps) {

  const default1 = filters_1[0] ?? "-"; 
  const default2 = filters_2[0] ?? "-";

  const [text, setText] = useState("");
  const [selected1, setSelected1] = useState(default1);
  const [selected2, setSelected2] = useState(default2);

  function resetAll() {
    setText("");
    setSelected1(default1);
    setSelected2(default2);
    onSearch("", default1, default2);
  }
return (
  <View style={styles.container}>
    
    {/* Input */}
    <TextInput
      style={styles.input}
      placeholder="Rechercher..."
      placeholderTextColor={Colors.grayPlaceholder}
      value={text}
      onChangeText={(t) => setText(t)}
    />

    {/* Dropdown 1 */}
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={selected1}
        onValueChange={(v) => setSelected1(v)}
        style={styles.picker}
        dropdownIconColor={Colors.black}
      >
        <Picker.Item label="Choisir…" value="-" color={Colors.grayPlaceholder} />
        {filters_1.map((f) => (
          <Picker.Item key={f} label={f} value={f} color={Colors.black} />
        ))}
      </Picker>
    </View>

    {/* Dropdown 2 */}
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={selected2}
        onValueChange={(v) => setSelected2(v)}
        style={styles.picker}
        dropdownIconColor={Colors.black}
      >
        <Picker.Item label="Choisir…" value="-" color={Colors.grayPlaceholder} />
        {filters_2.map((f) => (
          <Picker.Item key={f} label={f} value={f} color={Colors.black} />
        ))}
      </Picker>
    </View>

     {/* Button Reset */}
    <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
      <Text style={styles.resetText}>Réinitialiser</Text>
    </TouchableOpacity>

    {/* Search button (magnifying glasses) */}
    <TouchableOpacity
      onPress={() => onSearch(text, selected1, selected2)}
    >
      <Image
        source={require("../assets/images/loupe.png")}
        style={styles.searchIcon}
      />
    </TouchableOpacity>
  </View>
);

  }


