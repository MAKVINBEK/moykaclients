import React, { useState, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AppText from "./AppText";
import Arrow from "../assets/images/svg/arrow.svg";

const defaultLabelExtractor = (item) =>
  item?.model ?? item?.marka ?? item?.kuzov ?? String(item?.id ?? "");

const Select = ({
  items = [],
  value = null,
  onValueChange = () => {},
  placeholder = "Выберите",
  labelExtractor = defaultLabelExtractor,
  loading = false,
  testID = "select",
}) => {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("");

  const selectedLabel = useMemo(() => {
    const found = (items || []).find((it) => it?.id === value);
    return found ? labelExtractor(found) : null;
  }, [items, value, labelExtractor]);

  const filtered = useMemo(() => {
    if (!filter) return items || [];
    const q = filter.toLowerCase();
    return (items || []).filter((it) =>
      (labelExtractor(it) || "").toLowerCase().includes(q)
    );
  }, [items, filter, labelExtractor]);

  const open = () => {
    setFilter("");
    setVisible(true);
  };
  const close = () => setVisible(false);

  const renderItem = ({ item }) => {
    const id = item.id ?? item.value ?? item;
    const label = labelExtractor(item);
    const selected = id === value;
    return (
      <TouchableOpacity
        style={[styles.option, selected && styles.optionSelected]}
        onPress={() => {
          onValueChange(id);
          close();
        }}
      >
        <AppText style={[styles.optionText, selected && styles.optionTextSelected]}>
          {label}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <TouchableOpacity
        testID={testID}
        style={styles.touch}
        activeOpacity={0.8}
        onPress={open}
      >
        <AppText style={[styles.touchText, !selectedLabel && styles.placeholder]}>
          {selectedLabel ?? placeholder}
        </AppText>
        <View style={styles.icon}>
          <Arrow />
        </View>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={close}
      >
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={close} />
            <View style={styles.modal}>
              <View style={styles.header}>
                <TextInput
                  style={styles.search}
                  placeholder="Поиск..."
                  value={filter}
                  onChangeText={setFilter}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={close} style={styles.headerClose}>
                  <Text style={styles.closeText}>Готово</Text>
                </TouchableOpacity>
              </View>

              {loading ? (
                <View style={{ padding: 20 }}>
                  <ActivityIndicator size="small" />
                </View>
              ) : (
                <FlatList
                  data={filtered}
                  keyExtractor={(it, idx) => String(it?.id ?? it ?? idx)}
                  renderItem={renderItem}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 40 }}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  touch: {
    backgroundColor: "#fff",
    height: 60,
    borderRadius: 100,
    paddingHorizontal: 16,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  touchText: {
    flex: 1,
    color: "#2B2929",
  },
  placeholder: {
    color: "#9AA0A6",
  },
  icon: {
    marginHorizontal:8,
    transform:[{rotate:"-90deg"}]
  },

  modalSafe: { flex: 1, backgroundColor: "transparent" },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modal: {
    maxHeight: "65%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    // elevation / shadow for Android
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  search: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
  },
  headerClose: {
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  closeText: {
    color: "#3083FF",
    fontWeight: "600",
  },

  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  optionSelected: {
    backgroundColor: "#EFF8FF",
  },
  optionText: {
    fontSize: 16,
    color: "#222",
  },
  optionTextSelected: {
    color: "#0B61FF",
    fontWeight: "600",
  },
});

export default Select;
