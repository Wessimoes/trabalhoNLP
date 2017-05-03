var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/tratamento', function (req, res, next) {
    let frase = req.body.pergunta;

    const chain = frase.split(' ');

    const agente = chain.shift();

    let tamanho = chain.length - 1;

    //entra nesse caso se for artigo a penultima palavra
    if (chain[tamanho - 1].length < 3) {
        chain.splice(tamanho - 1, 1);
    }

    let incognita = chain.splice(tamanho - 1, 1) + chain.pop();
    incognita = incognita.toLowerCase();
    console.log(incognita);

    const obj = JSON.parse(fs.readFileSync('./jsonVeiculos/veiculos.json', 'utf8'));

    if (obj[incognita]) {
        if (obj[incognita].find((element, index, array) => element == agente)) {
            console.log("achou agente");
        }
    }

    res.render('index', { title: 'tratamento' });
});

module.exports = router;
