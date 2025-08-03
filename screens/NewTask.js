import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

const { height } = Dimensions.get("window");

export default function NewTask({ navigation, route }) {
  const { onSave } = route.params;

  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSave = () => {
    const newTask = {
      id: uuidv4(),
      task,
      date,
      time,
    };
    onSave(newTask);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nova Tarefa:</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a tarefa"
          value={task}
          onChangeText={setTask}
        />

        <Text style={styles.label}>Data</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 03-08-2025"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Horário</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 15:00"
          value={time}
          onChangeText={setTime}
        />

        <View style={styles.buttonContainer}>
          <Button title="Salvar" onPress={handleSave} color="green" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: height,
    width: "100%",
    flex: 1,
    backgroundColor: "#dcdee2",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
  form: {
    gap: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
});
