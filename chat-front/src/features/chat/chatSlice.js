import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  rooms: null,
  selectedRoomId: null,
  is_init: false,
  room: "ok",
  messages: null,
  peers: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setInitialRooms: (state, { payload }) => {
      state.rooms = payload.chats;
      console.log(payload.chats);
      state.is_init = true;
    },

    peerMessage: (state, { payload }) => {
      // payload
      const roomId = state.rooms.findIndex(
        (room) => room.chat_id === payload.chat_id
      );

      if (roomId !== -1) state.rooms[roomId].history.push(payload);
    },

    changeselectedRoom: (state, { payload }) => {
      state.selectedRoomId = payload;
    },

    changeFileStatus: (state, { payload }) => {
      const room = state.rooms.find((room) => room.chat_id === payload.chat_id);
      const message = room.history.find(
        (message) =>
          (message?.type === "File" || message?.type === "Image") &&
          message?.file?.id === payload.file_id
      );
      // Is it work?
      console.log(message);
      // delete message.file.id;
      message.file.hash = payload.file_hash;
      console.log(message);
    },
  },
  extraReducers: (builder) => {},
});

export default chatSlice.reducer;
export const {
  setInitialRooms,
  peerMessage,
  changeselectedRoom,
  changeFileStatus,
} = chatSlice.actions;
