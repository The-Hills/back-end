import * as Pusher from "pusher";
import * as dotenv from "dotenv";

dotenv.config();

const pusher = new Pusher({
  appId: process.env.APPID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true,
});

// pusher.trigger()
