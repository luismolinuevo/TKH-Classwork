import express, { response } from 'express';//about to import because in package.json type is set to module
import {Low} from "lowdb";
import {JSONFile} from "lowdb/node";

import morgan from "morgan";

import todoRouter from "./routes/todo.js";

export default async function() {
    // Configure lowdb to write to JSONFile. This will be our "database"
    const adapter = new JSONFile("db.json");
    const db = new Low(adapter);
    //Reads the database
    await db.read();
    //Checks if there is any data in the database. If not, we give default data.
    db.data = db.data || { todos: [] };
    //This writes to the database if there are any changes
    await db.write();
    //Instantiate our express application
    const app = express();
    //middlewares
    app.use(express.json());
    app.use(morgan('tiny'))
    app.use("/todo", function(req, res, next)  {
    if(req.query.admin === "true") {  //add ?admin=true to be able to add to do
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
    })
    app.use("/todo", todoRouter(db));

    return app;
};
