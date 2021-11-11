import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalType: "",
    modalProps: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { modalType, modalProps } = action.payload;
      state.modalType = modalType;
      state.modalProps = modalProps;
    },
    closeModal: (state) => {
      state.modalType = "";
      state.modalProps = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
