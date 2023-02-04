import createServer from "./server.js";

const app = await createServer();

app.listen(8080, function() {
    console.log("App is listening at http://localhost:8080");
})