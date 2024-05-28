import { createSlice, current } from "@reduxjs/toolkit";
import { get_message_type } from "../../utils/message";
import { getMessageStringDate } from "../../utils/message";

const initialState = {
  rooms: null,
  selectedRoomId: null,
  is_init: false,
  findResult: null,
  selectedFindRoom: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setInitialRooms: (state, { payload }) => {
      console.log(payload);
      const user = payload.user;
      const init_message = payload.message;
      state.rooms = init_message.chats.map((chat) => {
        let peer = chat.peers.find((peer) => peer.email !== payload.user.email);
        chat.avatar = peer.avatar;
        chat.room_name = peer.nickname;
        chat.room_info = "‎ ";
        chat.room_email = peer.email;
        chat.room_created = true;
        chat.unread_count = 0;
        const messages = chat.history.map((message, index) => {
          message.type = get_message_type(message);
          message.status = message.is_read ? "read" : "unread";
          if (
            chat.unread_count === 0 &&
            message.status === "unread" &&
            message.peer_email !== user.email
          )
            chat.unread_count = chat.history.length - index;
          else if (message.status === "read") chat.unread_count = 0;

          message.time = getMessageStringDate(message.timestamp);
          delete message.is_read;
          return message;
        });
        // if (chat.unread_count > 0) {
        //   const unread_notifaction = {
        //     type: "UnreadNotifaction",
        //     message_hash: null,
        //   };
        //   messages.splice(
        //     messages.length - chat.unread_count,
        //     0,
        //     unread_notifaction
        //   );
        // }
        //   chat.unread_count =
        //     chat.history[0].status === "read" ? 0 : chat.history.length;

        return { ...chat, history: messages };
      });

      state.is_init = true;
    },

    peerMessage: (state, { payload }) => {
      const roomId = state.rooms.findIndex(
        (room) => room.chat_id === payload.chat_id
      );

      if (!payload?.type) payload.type = get_message_type(payload);
      payload.time = getMessageStringDate(payload.timestamp);
      if (state.selectedFindRoom) state.selectedFindRoom.history.push(payload);
      else if (roomId !== -1) {
        if (payload.peer_email === state.rooms[roomId].room_email)
          state.rooms[roomId].unread_count += 1;
        state.rooms[roomId].history.push(payload);
      }
    },

    setImageHeight: (state, { payload }) => {
      const roomIndex = state.rooms.findIndex(
        (room) => room.chat_id === payload.chat_id
      );
      const message_index = state.rooms[roomIndex].history.findIndex(
        (message) => message.message_hash === payload.message_hash
      );

      state.rooms[roomIndex].history[message_index].file.width = payload.width;
      state.rooms[roomIndex].history[message_index].file.height =
        payload.height;
    },

    setImage: (state, { payload }) => {
      const roomIndex = state.rooms.findIndex(
        (room) => room.chat_id === payload.chat_id
      );
      const message_index = state.rooms[roomIndex].history.findIndex(
        (message) => message.message_hash === payload.message_hash
      );

      state.rooms[roomIndex].history[message_index].file.image = payload.image;
    },

    changeselectedRoom: (state, { payload }) => {
      state.selectedFindRoom = null;
      state.selectedRoomId = payload;
    },

    changeMessageStatus: (state, { payload }) => {
      const room = state.rooms.findIndex(
        (room) => room.chat_id === payload.chat_id
      );
      const message_index = state.rooms[room].history.findIndex(
        (message) => message.message_hash === payload.message_hash
      );

      state.rooms[room].history[message_index].status = payload.status;
    },

    setChatScroller: (state, { payload }) => {
      const roomIndex = state.rooms.findIndex(
        (room) => room.chat_id === payload.chat_id
      );

      state.rooms[roomIndex].scrollHeight = payload.height;
    },

    changeFileStatus: (state, { payload }) => {
      const room = state.rooms.find((room) => room.chat_id === payload.chat_id);
      const message = room.history.find(
        (message) =>
          (message?.type === "File" || message?.type === "Image") &&
          message?.file?.id === payload.file_id
      );
      if (message.type === "File") message.file.file_status = "loaded";
      message.file.file_name = message.file.name;
      message.file.file_size = message.file.size;
      message.file.file_hash = payload.file_hash;
    },

    createFindRoom: (state, { payload }) => {
      state.selectedFindRoom = payload;
    },
    setFindRoomsResult: (state, { payload }) => {
      state.findResult = payload;
    },

    changeChatId: (state, { payload }) => {
      const room = state.rooms.findIndex(
        (room) => room.chat_id === payload.temp_id
      );
      state.rooms[room].is_temp = false;
      state.rooms[room].chat_id = payload.chat_id;
      state.rooms[room]?.history.forEach(function (message, i) {
        state.rooms[room].history[i].chat_id = payload.chat_id;
      });
      state.selectedRoomId = payload.chat_id;
    },

    markMessagesAsRead: (state, { payload }) => {
      const roomIndex = state.rooms.findIndex(
        (room) => room.chat_id === payload.chat_id
      );
      let unread_count = 0;
      for (let i = 0; i < state.rooms[roomIndex].history.length; i++) {
        for (let j = 0; j < payload.messages.length; j++) {
          if (
            state.rooms[roomIndex].history[i].message_hash ===
              payload.messages[j].message_hash &&
            state.rooms[roomIndex].history[i].status != "read"
          ) {
            state.rooms[roomIndex].history[i].status = "read";
            unread_count += 1;
          }
        }
      }
      if (state.rooms[roomIndex].unread_count > 0)
        state.rooms[roomIndex].unread_count -= unread_count;
    },

    setFindRoomsToRooms: (state) => {
      state.selectedFindRoom.room_created = true;
      state.rooms.push(state.selectedFindRoom);
      state.selectedRoomId = state.selectedFindRoom.chat_id;

      state.selectedFindRoom = null;
    },

    reset: (state) => {
      state.rooms = null;
      state.selectedFindRoom = null;
      state.findResult = null;
      state.selectedRoomId = null;
      state.is_init = null;
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
  changeMessageStatus,
  setFindRoomsResult,
  createFindRoom,
  changeChatId,
  setFindRoomsToRooms,
  setImageHeight,
  setImage,
  setChatScroller,
  markMessagesAsRead,
  reset,
} = chatSlice.actions;
