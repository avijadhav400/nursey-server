import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { getHealth } from "./controllers/health.js";
import { deletePlant, getPlantId, getPlants, postPlant, putPlant } from "./controllers/plant.js";
import { handlePageNotFound } from "./controllers/errors.js";

const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000

const dbConnection = async () => {
 const conn = mongoose.connect(process.env.MONGO_URL)
  if(conn){
    console.log(`Mongodb connected 🚀`);
  }
  else{
    console.log(`Mongodb not connect ❌`);
  }
}
dbConnection()


app.get("/health", getHealth)

app.post("/plant", postPlant);

app.get("/plants", getPlants);

app.get("/plant/:id", getPlantId);

app.put("/plant/:id", putPlant);

app.delete("/plant/:id", deletePlant);

app.use("*", handlePageNotFound);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
