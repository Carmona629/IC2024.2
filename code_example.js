const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir arquivos estáticos do diretório "icons"
app.use('/icons', express.static(path.join(__dirname, 'icons')));

// Servir arquivos estáticos do diretório "img"
app.use('/img', express.static(path.join(__dirname, 'img')));

// Rota para listar pastas
app.get('/folders', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    const dirPath = path.join(__dirname, 'img');
    fs.readdir(dirPath, (err, files) => {
        if (err) return res.status(500).json({ error: 'Erro ao ler diretório' });
        const folders = files.filter(file => fs.statSync(path.join(dirPath, file)).isDirectory());
        res.json(folders);
    });
});

// Rota para listar imagens em uma pasta específica
app.get('/images/:folder', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    const folderPath = path.join(__dirname, 'img', req.params.folder);
    fs.readdir(folderPath, (err, files) => {
        if (err) return res.status(500).json({ error: 'Erro ao ler diretório' });
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        res.json(images);
    });
});

// Servir o arquivo home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.listen(port, () => {
    console.log(Server is running on http://localhost:${port});
});