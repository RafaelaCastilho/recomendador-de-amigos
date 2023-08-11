// Importa o módulo express , cookie-parser e as rotas configuradas no index.js
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./src/routes/index');

// Cria a aplicação express
const app = express();

// Configuração dos middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Utiliza as rotas configuradas no arquivo index.js
app.use('/', router);

// Exporta a aplicação
module.exports = app;