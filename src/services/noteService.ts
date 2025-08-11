import { Note } from "../types/note";
import axios from "axios";

export interface FetchNotesResponse {
  results: Note[];
  page: number;
  perPage: number;
  total_results: number;
  total_pages: number;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(
  query: string,
  page: number = 1,
  perPage: number = 12
): Promise<FetchNotesResponse> {
  const config = {
    params: { query, page, perPage },
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const response = await axios.get<FetchNotesResponse>(BASE_URL, config);
  return response.data;
}

export async function createNote(content: string): Promise<Note> {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.post<Note>(BASE_URL, { content }, config);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.delete<Note>(`${BASE_URL}/${id}`, config);
  return response.data;
}
