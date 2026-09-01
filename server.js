require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

const topicosRoutes = require('./routes/topicos');
const authRoutes = require('./routes/auth');
const noticiasRoutes = require('./routes/noticias');
const adminRoutes = require('./routes/admin');
const pagamentoRoutes = require('./routes/pagamento');
const conteudosRoutes = require('./routes/conteudos');
const { atualizarEventos } = require('./database/eventos');

app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 8 } // sessão dura 8 horas
}));

app.use('/api/topicos', topicosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pagamento', pagamentoRoutes);
app.use('/api/conteudos', conteudosRoutes);

// Mantém a lista de eventos sempre atualizada: eventos cuja data já passou são
// ocultados automaticamente pela consulta (routes/conteudos.js). Aqui recalculamos
// as datas dos eventos anuais para a próxima edição uma vez por mês (verificado
// diariamente) e também a cada inicialização do servidor.
let mesEventosAtualizado = -1;
function manterEventosAtualizados() {
  const mesAtual = new Date().getMonth();
  if (mesAtual !== mesEventosAtualizado) {
    mesEventosAtualizado = mesAtual;
    atualizarEventos();
  }
}
manterEventosAtualizados();
setInterval(manterEventosAtualizados, 24 * 60 * 60 * 1000); // verifica diariamente

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});