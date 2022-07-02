import { config } from "dotenv";
import { discord } from "./discord";
import { server } from "./server";

config();
discord();
server();
