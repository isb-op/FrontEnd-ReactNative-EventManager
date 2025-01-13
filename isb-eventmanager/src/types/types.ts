export interface EventResponse {
  userId: number;
  name: string;
  idEvent: number;
  eventTitle: string;
  eventDate: string;
  photoUrl: string;
  postalCode: string;
  street: string;
  neighborhood: string;
  city: string;
  number: number;
  complement: string;
  state: string;
}

export interface InsertEventRequest {
  eventTitle: string;
  eventDate: string;
  photoUrl: string;
  postalCode: string;
  number: number;
  complement: string;
}
