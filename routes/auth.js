const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database/db');
const upload = require('../middleware/upload');

function inserirUsuario(dados, res) {
  const { nome, email, senhaHash, cargo, foto, isAdmin, tipoConta, empresaId } = dados;

  db.run(
    `INSERT INTO usuarios (nome, email, senha, cargo, foto, is_admin, tipo_conta, empresa_id, pago)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
    [nome, email, senhaHash, cargo, foto, isAdmin ? 1 : 0, tipoConta, empresaId],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ erro: 'Este e-mail já está cadastrado.' });
        }
        return res.status(500).json({ erro: err.message });
      }
      res.json({ sucesso: true, usuarioId: this.lastID });
    }
  );
}

router.post('/cadastro', upload.single('foto'), async (req, res) => {
  try {
    const { nome, email, senha, cargo, tipoConta, nomeEmpresa, codigoConvite } = req.body;

    if (!nome || !email || !senha || !cargo || !tipoConta) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const foto = req.file ? `/uploads/${req.file.filename}` : null;

    if (tipoConta === 'empresa_admin') {
      if (!nomeEmpresa) {
        return res.status(400).json({ erro: 'Informe o nome da empresa.' });
      }

      db.run(
        `INSERT INTO empresas (nome) VALUES (?)`,
        [nomeEmpresa],
        function (err) {
          if (err) {
            if (err.message.includes('UNIQUE')) {
              return res.status(400).json({ erro: 'Já existe uma empresa cadastrada com esse nome.' });
            }
            return res.status(500).json({ erro: err.message });
          }

          const empresaId = this.lastID;
          inserirUsuario(
            { nome, email, senhaHash, cargo, foto, isAdmin: true, tipoConta: 'empresa_admin', empresaId },
            res
          );
        }
      );
      return;
    }

    if (tipoConta === 'funcionario') {
      if (!codigoConvite) {
        return res.status(400).json({ erro: 'Informe o código de convite da empresa.' });
      }

      db.get(
        `SELECT * FROM empresas WHERE codigo_convite = ?`,
        [codigoConvite],
        (err, empresa) => {
          if (err) return res.status(500).json({ erro: err.message });
          if (!empresa) return res.status(400).json({ erro: 'Código de convite inválido.' });

          if (empresa.codigo_expira_em && new Date(empresa.codigo_expira_em) < new Date()) {
            return res.status(400).json({ erro: 'Este código de convite expirou.' });
          }

          db.get(
            `SELECT COUNT(*) as total FROM usuarios WHERE empresa_id = ? AND tipo_conta = 'funcionario'`,
            [empresa.id],
            (err, resultado) => {
              if (err) return res.status(500).json({ erro: err.message });

              if (resultado.total >= empresa.limite_funcionarios) {
                return res.status(400).json({ erro: 'O limite de vagas desta empresa foi atingido.' });
              }

              inserirUsuario(
                { nome, email, senhaHash, cargo, foto, isAdmin: false, tipoConta: 'funcionario', empresaId: empresa.id },
                res
              );
            }
          );
        }
      );
      return;
    }

    if (tipoConta === 'individual') {
      inserirUsuario(
        { nome, email, senhaHash, cargo, foto, isAdmin: false, tipoConta: 'individual', empresaId: null },
        res
      );
      return;
    }

    return res.status(400).json({ erro: 'Tipo de conta inválido.' });

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Preencha e-mail e senha.' });
    }

    db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], async (err, usuario) => {
      if (err) return res.status(500).json({ erro: err.message });

      if (!usuario) {
        return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
      }

      req.session.usuario = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
        foto: usuario.foto,
        isAdmin: usuario.is_admin === 1,
        tipoConta: usuario.tipo_conta,
        empresaId: usuario.empresa_id,
        pago: usuario.pago === 1
      };

      res.json({ sucesso: true, usuario: req.session.usuario });
    });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: 'Não autenticado' });
  }
  res.json(req.session.usuario);
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao sair.' });
    res.json({ sucesso: true });
  });
});

module.exports = router;