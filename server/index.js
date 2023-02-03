const express = require("express");
const axios = require("axios");
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()

});

app.get("/", (req, res) => {
    res.send("Editor de artigo");
});

app.get("/api/getArticle", async (req, res) => {
    const id = req.query.id;
    try {
        const response = await axios.get("https://atual.network/a54c57df2f849fb08c90f9214902aa5a/packet.json");
        res.set("Content-Type", "application/json");
        res.send(response.data);
    } catch (error) {
        res.status(500).send("Erro ao obter o artigo");
    }
});

app.put("/api/updateArticle", (req, res) => {
    const id = req.query.id;
    res.send(`Artigo com ID ${id} atualizado`);
});

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
