import { io } from "socket.io-client";
import { updateBoard } from "./board";
import { environment } from "./environment/environment";
import { Install } from "./install";
import { ExecuteCommandParams } from "./models/execute-command-params";
import "./scss/styles.scss";

let server = environment.socket || localStorage.getItem('server');

if (!server) {
  server = prompt(JSON.parse(`"Cuál es la dirección del servidor"`));
  localStorage.setItem("server", server);
}

if (server) {
  window.addEventListener('DOMContentLoaded', (event) => {
    new Install(document.querySelector('#install'));
  
    const socket = io(server);

    socket.on("connect_error", () => {
      localStorage.removeItem('server');
      location.reload();
    });
  
    socket.on('board', function(b) {
      updateBoard(b);
    });
  
    window.addEventListener("execute-command", (e: CustomEvent<ExecuteCommandParams>) => {
      socket.emit("execute", e.detail);
    });
  });
} else {
  alert("Falta el servidor");
}


