import { io } from "socket.io-client";
import { updateBoard } from "./board";
import { environment } from "./environment/environment";
import "./scss/styles.scss";

window.addEventListener('DOMContentLoaded', (event) => {
  const socket = io(environment.socket);

  socket.on('board', function(b) {
    updateBoard(b);
  });
});

