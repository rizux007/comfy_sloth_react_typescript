import { createSlice } from "@reduxjs/toolkit";

interface initState {
  isSidebarOpen: boolean;
}

const initialState: initState = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});
export const { openSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
