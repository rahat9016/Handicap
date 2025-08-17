import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./filterTypes";

const initialState: IInitialState = {
  sortBy: [],
  resourceTypes: [],
  languages: []
};

const filteringSlice = createSlice({
  name: "filtering",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setResourceTypes: (state, action) => {
      state.resourceTypes = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    clearFilters: (state) => {
      state.sortBy = [];
      state.resourceTypes = [];
      state.languages = [];
    },
  },
});

export const { setSortBy, setResourceTypes, setLanguages, clearFilters } = filteringSlice.actions;
export default filteringSlice.reducer;
