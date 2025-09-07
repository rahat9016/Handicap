import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./filterTypes";

const initialState: IInitialState = {
  sortBy: [],
  resourceTypes: [],
  languages: [],
  keywords: [],
  courseCategories: [],
  level: [],
  organizationIds: [],
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
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setOrganizationIds: (state, action) => {
      state.organizationIds = action.payload;
    },
    clearFilters: (state) => {
      state.sortBy = [];
      state.resourceTypes = [];
      state.languages = [];
      state.keywords = [];
      state.courseCategories = [];
      state.level = [];
    },
  },
});

export const {
  setSortBy,
  setResourceTypes,
  setLanguages,
  setKeywords,
  setCourseCategories,
  setOrganizationIds,
  setLevel,
  clearFilters,
} = filteringSlice.actions;
export default filteringSlice.reducer;
