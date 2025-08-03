import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const saveTasksToStorage = async (tasks) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", jsonValue);
    } catch (e) {
      console.error("Erro ao salvar tarefas:", e);
    }
  };

  const loadTasksFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("tasks");
      if (jsonValue != null) {
        setTasks(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Erro ao carregar tarefas:", e);
    }
  };
  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const handleGoNewTask = () => {
    navigation.navigate("NewTask", {
      onSave: (task) => setTasks((prev) => [...prev, task]),
    });
  };

  const handleSeeTask = (taskInfo) => {
    navigation.navigate("Task", {
      ...taskInfo,
      onDeleteTask: (id) => {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
        navigation.goBack();
      },
      onEditTask: (newTaskData) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === newTaskData.id ? { ...task, ...newTaskData } : task
          )
        );
        navigation.goBack();
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>To Do List</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleGoNewTask} title="Nova Tarefa" color="green" />
      </View>

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tarefas:</Text>
        <ScrollView contentContainerStyle={styles.tasksList}>
          {tasks.length > 0 ?  tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              onPress={() => handleSeeTask(task)}
              style={styles.taskItem}
            >
              <Text style={styles.taskText}>{task.task}</Text>
              <Text style={styles.taskTime}>
                {task.date} às {task.time}
              </Text>
            </TouchableOpacity>
          )) : <Text style={styles.sectionTitle}>Nenhuma Tarefa Criada!</Text> }
         
        </ScrollView>
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
  buttonContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  tasksWrapper: {
    flex: 1,
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  tasksList: {
    gap: 20,
  },
  taskItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  taskText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  taskTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
