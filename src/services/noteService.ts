import { Note } from "../types/note";
import axios from "axios";

export interface FetchNotesResponse {
  results: Note[];
  page: number;
  total_resalts: number;
  total_pages: number;
}

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(
  query: string,
  page: number = 1
): Promise<FetchNotesResponse> {
  const config = {
    params: { query, page },
    headers: { Authorization: `Bearer${TOKEN}` },
  };

  const response = await axios.get<FetchNotesResponse>(BASE_URL, config);
  return response.data;
}
