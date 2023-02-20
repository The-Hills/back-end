const socketioService = (io) => {
  io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);
    socket.emit("booking-request", (data) => {}),
      socket.emit("booking-update", (data) => {}),
      socket.emit("booking-completed", (data) => {});

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} disconnected`);
    });
  });
};

export default socketioService;
