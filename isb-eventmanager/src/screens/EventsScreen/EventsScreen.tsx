import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import {listAllEvents, createEvent, getEventById, getEventsByUserId, updateEvent, deleteEvent} from "../../services/EventsService";

import styles from "./EventsScreenStyles";
import { InsertEventRequest, EventResponse } from "../../types/types";
import api from "../../services/api";

const EventsScreen = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [newEvent, setNewEvent] = useState({
    eventTitle: "",
    eventDate: "",
    photoUrl: "",
    postalCode: "",
    number: "",
    complement: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
      Alert.alert("Erro", "Erro ao carregar eventos. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    try {
      const response = await api.post("/events", newEvent);
      setEvents([...events, response.data]);
      setShowModal(false);
      resetNewEvent();
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
    }
  };

  const handleEditEvent = async (id) => {
    try {
      const response = await api.put(`/events/${id}`, newEvent);
      setEvents(
        events.map((event) => (event.idEvent === id ? response.data : event))
      );
      setShowModal(false);
      resetNewEvent();
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao editar evento:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((event) => event.idEvent !== id));
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    }
  };

  const resetNewEvent = () => {
    setNewEvent({
      eventTitle: "",
      eventDate: "",
      photoUrl: "",
      postalCode: "",
      number: "",
      complement: "",
    });
  };

  const filteredEvents = events.filter(
    (event) =>
      event.idEvent.toString().includes(search) ||
      event.userId.toString().includes(search)
  );

  const renderEvent = ({ item }) => (
    <View style={styles.eventCard}>
      <Image source={{ uri: item.photoUrl }} style={styles.eventImage} />
      <Text style={styles.eventText}>
        <Text style={styles.bold}>Id Administrador:</Text> {item.userId}{"\n"}
        <Text style={styles.bold}>Administrador(a):</Text> {item.name}{"\n"}
        <Text style={styles.bold}>Id evento:</Text> {item.idEvent}{"\n"}
        <Text style={styles.bold}>Título:</Text> {item.eventTitle}{"\n"}
        <Text style={styles.bold}>Data:</Text> {item.eventDate}{"\n"}
        <Text style={styles.bold}>Endereço:</Text> {item.postalCode},{" "}
        {item.street}, {item.number}, {item.neighborhood}, {item.city} -{" "}
        {item.state}
      </Text>
      <View style={styles.eventActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setShowModal(true);
            setIsEditing(true);
            setNewEvent(item);
          }}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteEvent(item.idEvent)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar eventos..."
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
      >
        <Text style={styles.buttonText}>Adicionar Evento</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.idEvent.toString()}
        renderItem={renderEvent}
      />
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isEditing ? "Editar Evento" : "Adicionar Evento"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Título do Evento"
              value={newEvent.eventTitle}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, eventTitle: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Data do Evento"
              value={newEvent.eventDate}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, eventDate: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="URL da Imagem"
              value={newEvent.photoUrl}
              onChangeText={(text) =>
                setNewEvent({ ...newEvent, photoUrl: text })
              }
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() =>
                isEditing
                  ? handleEditEvent(newEvent.idEvent)
                  : handleAddEvent()
              }
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default EventsScreen;
