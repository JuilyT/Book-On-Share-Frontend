import { SEARCH_TERM } from "./types";

export const searchTerm = term => {
    return {
      type: SEARCH_TERM,
      payload: term
    };
  };