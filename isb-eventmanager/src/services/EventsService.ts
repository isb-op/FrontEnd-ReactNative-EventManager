import api from "./api";
import { EventResponse, InsertEventRequest } from "../types/types";

export const listAllEvents = async (): Promise<EventResponse[]> => {
  const { data } = await api.get<EventResponse[]>("/events");
  return data;
};
export const createEvent = async (
  newEvent: InsertEventRequest
): Promise<EventResponse> => {
  const { data } = await api.post<EventResponse>("/events", newEvent);
  return data;
};

export const getEventById = async (idEvent: number): Promise<EventResponse> => {
  const { data } = await api.get<EventResponse>(`/events/${idEvent}`);
  return data;
};

export const getEventsByUserId = async (
  userId: number
): Promise<EventResponse[]> => {
  const { data } = await api.get<EventResponse[]>(`/events-user/${userId}`);
  return data;
};

export const updateEvent = async (
  idEvent: number,
  updatedEvent: InsertEventRequest
): Promise<EventResponse> => {
  const { data } = await api.put<EventResponse>(
    `/events/${idEvent}`,
    updatedEvent
  );
  return data;
};

export const deleteEvent = async (idEvent: number): Promise<void> => {
  await api.delete(`/events/${idEvent}`);
};
