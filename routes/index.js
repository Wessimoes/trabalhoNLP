const express = require('express');
const router = express.Router();
const fs = require('fs');
const animais = JSON.parse(fs.readFileSync('./data/animais.json', 'utf8'));

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Trabalho NLP' });
});

router.post('/tratamento', function (req, res, next) {
    const frase = req.body.pergunta;
    const chain = frase.split(' ');
    let respostaFrase = false;
    
    if (frase.length === 0) {
        res.redirect('/');
    }

    if(chain[0].length < 3){
        chain.shift();
    }

    let vertice = chain.shift().toLowerCase(); 
    let galho;

    if(chain.length > 1){
        galho = chain.pop().toLowerCase();
    }

    if (animais[vertice] && animais["raizes"].includes(galho)){
        const e = animais[vertice];
        const um = animais[galho];


    if(e[0] >= um[0] && e[1] <= um[1]){
            respostaFrase = true;
            return res.render('resposta', { title: 'Tratamento', questao: frase, resposta: respostaFrase });
        }   
    }
    res.render('resposta', { title: 'Tratamento', questao: frase, resposta: respostaFrase });
});

module.exports = router;
