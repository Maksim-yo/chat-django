import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  rooms: null,
  selectedRoom: null,
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
      state.selectedRoom = 1;
      state.is_init = true;
    },

    peerMessage: (state, { payload }) => {
      // payload

      const roomId = state.rooms.findIndex(
        (room) => room.chat_id === payload.chat_id
      );
      // console.log(current(state.selectedRoom));

      if (roomId !== -1) state.rooms[roomId].history.push(payload);
    },

    changeselectedRoom: (state, { payload }) => {
      state.selectedRoom = payload;
    },
  },
  extraReducers: (builder) => {},
});

export default chatSlice.reducer;
export const { setInitialRooms, peerMessage } = chatSlice.actions;
