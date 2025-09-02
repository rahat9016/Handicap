import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./filterTypes";

const initialState: IInitialState = {
  sortBy: [],
  resourceTypes: [],
  languages: [],
  keywords: [],
  courseCategories: [],
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
    setKeywords: (state, action) => {
      state.keywords = action.payload;
    },
    setCourseCategories: (state, action) => {
      state.courseCategories = action.payload;
    },
    clearFilters: (state) => {
      state.sortBy = [];
      state.resourceTypes = [];
      state.languages = [];
      state.keywords = [];
      state.courseCategories = [];
    },
  },
});

export const { setSortBy, setResourceTypes, setLanguages,setKeywords, setCourseCategories, clearFilters } = filteringSlice.actions;
export default filteringSlice.reducer;
