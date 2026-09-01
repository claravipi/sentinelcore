// A lógica dos eventos vive em database/eventos.js (lista, projeção de datas e
// atualização). Este script permite rodar a atualização manualmente:
//   node database/seedEventos.js
const { atualizarEventos } = require('./eventos');

atualizarEventos();
