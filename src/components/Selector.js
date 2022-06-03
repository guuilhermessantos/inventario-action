import { useField } from "@unform/core";
import React, { useRef, useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, useWindowDimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
/**
 * Componente Picker criado para ser utilizado junto com unform - rockeseat
 * @param name  - nome do picker
 * @param children - componentes filhos - itens picker
 * @param settings.protocol - recuperar o valor que foi salvo do protocolo selecionado
 * @param placeholder - objeto placeholder que sera apresetando
 * @param items - itens que serap apresentados no picker
 *
 */
export default function Selector({
  name,
  settings,
  items,
  placeholder,
  ...rest
}) {
  const pickerRef = useRef(null);
  const [option, setOption] = useState(settings.protocol);
  const { fieldName, registerField } = useField(name);
  const windows = useWindowDimensions();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      path: "props.value",
    });
  }, [registerField]);

  return (
    <RNPickerSelect
      {...rest}
      placeholder={placeholder}
      ref={pickerRef}
      value={option}
      doneText="Selecionar"
      style={{
        ...pickerSelectStyles,
        inputIOS: {
          borderRadius: 15,
          backgroundColor: "#fff",
          padding: 15,
          width: windows.width * 0.85,
        },
        inputAndroid: {
          borderRadius: 15,
          backgroundColor: "#fff",
          padding: 15,
          width: windows.width * 0.85,
        },
        iconContainer: {
          top: Platform.OS == "ios" ? 10 : 15,
          right: 12,
        },
      }}
      onValueChange={(value) => setOption(value)}
      items={items}
      useNativeAndroidPickerStyle={false} //android only
      Icon={() => {
        return <Ionicons name="md-arrow-down" size={24} color="gray" />;
      }}
    />
  );
}
const pickerSelectStyles = StyleSheet.create({
  placeholder: {
    color: "#000",
  },
});
