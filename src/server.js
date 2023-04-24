import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug"); //퍼그엔진 사용하기
app.set("views", __dirname + "/views"); //template가 어디있는지 설정해주기
app.use("/public", express.static(__dirname + "/public")); //public url로 유저에게 파일을 공유해주기
app.get("/", (req, res) => res.render("home"));
app.use("/", require("./routes/member.js"));
app.use("/", require("./routes/auth.js"));

app.get("/login", (req, res) => {
  res.render("login");
});

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

const handleListen = () => {
  console.log(`Listening on http: http://localhost:3000`);
};
httpServer.listen(3000, handleListen);
