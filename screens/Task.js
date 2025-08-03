import React from "react";
import { View, Text, StyleSheet, Dimensions, Button, Alert } from "react-native";

const { height } = Dimensions.get("window");

export default function Task({ route, navigation }) {
  const { task, date, time, id, onDeleteTask, onEditTask } = route.params;

  const handleDeleteTask = () => {
    onDeleteTask(id);
  };

  const handleConfirmDelete = () => {
    Alert.alert("Excluir Tarefa", "Você deseja excluir essa tarefa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          handleDeleteTask();
        },
      },
    ]);
  };

  const handleEditTask = () => {
    navigation.navigate("EditTask", {
      taskInfo: { id, task, date, time },
      onSave: onEditTask, 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.taskText}>Tarefa: {task}</Text>
      <Text style={styles.timeDate}>Data: {date}</Text>
      <Text style={styles.timeDate}>Horário: {time}</Text>
      <View style={styles.actionsContainer}>
        <Button title="Excluir" onPress={handleConfirmDelete} color="red" />
        <Button title="Editar" onPress={handleEditTask} color="blue" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    minHeight: height,
    width: "100%",
    flex: 1,
    backgroundColor: "#dcdee2",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  taskText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  timeDate: {
    fontSize: 23,
    textAlign: "center",
    color: "black",
  },
  actionsContainer: {
    gap: 10,
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
