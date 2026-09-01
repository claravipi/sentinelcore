const multer = require('multer');
const path = require('path');

// Define onde e como salvar o arquivo enviado
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // pasta onde a foto será salva
  },
  filename: (req, file, cb) => {
    // gera um nome único: timestamp + extensão original (.jpg, .png, etc)
    const nomeUnico = Date.now() + path.extname(file.originalname);
    cb(null, nomeUnico);
  }
});

// Filtra para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;