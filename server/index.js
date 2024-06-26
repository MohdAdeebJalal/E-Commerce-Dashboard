import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
//importing the data
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js"
import AffiliateStat from "./models/AffiliateStat.js";

import { dataUser, dataProduct,dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL 
  //   {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
)
  .then(() => {
    app.listen(PORT, () =>
      console.log(` Connected Server running at Port ${PORT}`)
    );
    //Only insert data one time
      // Product.insertMany(dataProduct)
      // ProductStat.insertMany(dataProductStat)
    // User.insertMany(dataUser);
   
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
  })
  .catch((error) => console.log(`Connction Error ${error}`));
