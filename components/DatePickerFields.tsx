import React, { useState } from "react";
import { Platform, TouchableOpacity, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../constants/colors";

interface Props {
  date: Date | null;
  onChange: (date: Date | null) => void;
  minimumDate?: Date;
}

/**
 * Cross-platform date picker component for React Native.
 *
 * This component provides a unified date selection UI that works on both
 * **mobile (iOS/Android)** and **web**:
 *
 * - On **web**, it renders a native HTML `<input type="date">`.
 * - On **mobile**, it uses `@react-native-community/datetimepicker`
 *   with a modal-like UX triggered by a pressable field.
 *
 * The component accepts an optional minimum date (default: today) and
 * returns the selected value through the `onChange` callback.
 *
 * Props:
 * @param {Date | null} date
 *        Currently selected date, or `null` if none.
 *
 * @param {(date: Date | null) => void} onChange
 *        Callback fired when the user selects a date. Receives either
 *        a `Date` object or `null` if the input is cleared (web only).
 *
 * @param {Date} [minimumDate=new Date()]
 *        The earliest allowed date. Applied internally to both
 *        the web input and the native mobile picker.
 *
 * @returns JSX.Element
 *          A platform-appropriate date picker UI component.
 */
export default function DatePickerField({
  date,
  onChange,
  minimumDate = new Date(),
}: Props) {
  const [showPicker, setShowPicker] = useState(false);

  // Format YYYY-MM-DD
  const formatISODate = (d: Date) => d.toISOString().split("T")[0];

  if (Platform.OS === "web") {
    // -------- Web Version ----------
    return (
      <input
        type="date"
        style={{
          padding: 10,
          borderRadius: 8,
          borderWidth: 0,
          width: "10%",
          minWidth: 100,
          marginBottom: 10,
          marginTop: 10,
          backgroundColor: Colors.darkerWhite,
        }}
        min={formatISODate(minimumDate)}
        value={date ? formatISODate(date) : ""}
        onChange={(e) => {
          if (!e.target.value) return onChange(null);
          onChange(new Date(e.target.value));
        }}
      />
    );
  }

  // -------- Mobile (iOS/Android) ----------
  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={{
          padding: 10,
          backgroundColor: "#eee",
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text>
          {date ? date.toLocaleDateString("fr-FR") : "Choisir une date"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date ?? new Date()}
          mode="date"
          display="spinner"
          minimumDate={minimumDate}
          onChange={(event, selected) => {
            setShowPicker(false);
            if (selected) onChange(selected);
          }}
        />
      )}
    </View>
  );
}
