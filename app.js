const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const chat = require("./src/utils/chat");
dotenv.config();

//express
const express = require("express");
const app = express();

//socket.io
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//MongoAtlas
const MongoStore = require("connect-mongo");
const advanceOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

app.use(cookieParser());
let mongoUrl = process.env.MONGO_URL;

app.use(
  session({
		store: MongoStore.create({ 
			mongoUrl: mongoUrl,
			mongoOptions: advanceOptions   
		}),
		secret: "coderhouse",
    resave: true,
    saveUninitialized: true,
    rolling: true,
		cookie: { maxAge: 60000 } 
  })
);

//routes
const router = require("./src/routes")

//plantilla
app.set('views', './src/views');
app.set('view engine', 'ejs');

//middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

//io.on
io.on('connection', async function(socket) {
	console.log('Se ha conectado un cliente!');
	const messages = await chat.showMessage();  
  socket.emit('messages', messages);
	io.sockets.emit('productos');
  socket.on ('new-message', async function (data){
    try {
      chat.saveMessage(data);
      const messages = await chat.showMessage();      
      io.sockets.emit('messages', messages);
    } catch (err) {
      console.log(err);
    }    
  });
});

httpServer.listen(8080, function() {
  console.log('Servidor corriendo en http://localhost:8080');
})