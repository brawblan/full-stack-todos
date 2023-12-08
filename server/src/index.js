const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');

const BasicRoute = require('./controller/basic');
const TodosRoute = require('./routes/todos');

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: [process.env.HOST],
  })
);

app.get('/health', (req, res) => res.send('Health Check'));
app.use('/', BasicRoute);
app.use('/todos', TodosRoute);

server.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
