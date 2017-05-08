var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Trabalho NLP' });
});

router.post('/tratamento', function (req, res, next) {
    let frase = req.body.pergunta;

    if (frase.length === 0) {
        res.redirect('/');
    }

    const chain = frase.split(' ');

    const agente = chain.shift();

    let tamanho = chain.length - 1;

    let respostaFrase = false;

    //entra nesse caso se for artigo a penultima palavra
    if (chain[tamanho - 1].length < 3) {
        chain.splice(tamanho - 1, 1);
    }

    let incognita = chain.splice(tamanho - 1, 1) + chain.pop();
    incognita = incognita.toLowerCase();
    console.log(incognita);

    const obj = JSON.parse(fs.readFileSync('./jsonVeiculos/veiculos.json', 'utf8'));

    if (obj[incognita]) {
        if (obj[incognita].find((element, index, array) => element === agente)) {
            console.log("achou agente");
            respostaFrase = true;

        }
        return res.render('resposta', { title: 'Tratamento', questao: frase, resposta: respostaFrase });
    }

    res.render('resposta', { title: 'Tratamento', questao: frase, resposta: respostaFrase });
});

module.exports = router;
