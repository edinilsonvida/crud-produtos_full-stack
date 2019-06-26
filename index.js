const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

mongoose.connect('mongodb://localhost/db_produto');
var db = mongoose.connection;

db.once('open', function () {
	console.log('A conexão com o MongoDB foi realizada com sucesso.');
});

db.on('error', function (err) {
	console.log(err);
});

var Produto = require('./models/Produto');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/produto/:id', function (req, res) {
	Produto.findById(req.params.id, function (err, produto) {
		res.render('produto',
			{
				produto: produto
			});
	});
});

app.get('/produto/edit/:id', function (req, res) {
	Produto.findById(req.params.id, function (err, produto) {
		res.render('edit_produto',
			{
				produto: produto
			});
	});
});

app.get('/', function (req, res) {
	Produto.find({}, function (err, produtos) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', {
				produtos: produtos
			});
		}
	});
});

app.get('/produtos', function (req, res) {
	res.render('add_produto', {
	});
});

app.post('/produtos', function (req, res) {
	var produto = new Produto();
	produto.nome = req.body.nome;
	produto.preco = req.body.preco;
	produto.categoria = req.body.categoria;
	produto.descricao = req.body.descricao;
	produto.fabricante = req.body.fabricante;
	produto.save(function (err) {
		if (err) {
			console.log(err);
		}
		else {
			{
				res.redirect('/');
			}
		}
	});
});

app.delete('/produto/:id', function (req, res) {
	var query = { _id: req.params.id }
	Produto.remove(query, function (err) {
		if (err) {
			console.log(err);
		}
		res.send('Produto excluído.');
	});
});

app.post('/produtos/edit/:id', function (req, res) {
	var produto = {};
	produto.nome = req.body.nome;
	produto.preco = req.body.preco;
	produto.categoria = req.body.categoria;
	produto.descricao = req.body.descricao;
	produto.fabricante = req.body.fabricante;

	var query = { _id: req.params.id }
	Produto.update(query, produto, function (err) {
		if (err) {
			console.log(err);
		}
		else {
			{
				res.redirect('/');
			}
		}
	});
});

app.listen(port);
console.log("O servidor está rodando na porta " + port + ".");
