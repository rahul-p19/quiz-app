"use strict";
const app = require("express")();
app.get('/', (req, res) => {
    return res.send("Hello world from express server");
});
app.listen(3001, () => {
    console.log('listening on port 3001');
});
