const express = require('express')
const crypto = require('crypto');
const mysql = require('mysql');
const app = express()
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'bookstoreuser',
	password: 'password',
	database: 'BookstoreDB'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/calculations', (req, res) => {
	response = "";
	for(let i = 0; i < 100; i++) {
		let randomCalc = Math.random() * 8 * 26;
		response += 'Berekening: ' + randomCalc + '<br>'; 
	}
	res.send(response)  
})

app.get('/json', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	array = [];
	for(let i = 0; i < 150; i++) {
		array[i] = simpleJSON;
	}
	res.send(array)  
})

app.get('/database/insert', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	let bookName = crypto.randomBytes(40).toString('hex');
	let price = Math.random() * 35;
	connection.query("INSERT INTO BooksTBL (BookName, AuthorID, BookPrice, BookIsAvailable) VALUES ('" + bookName + "', 5," 
			+ price + ", 1);", function (error, results, fields) {
		if (error) throw error;
		books = results;
		res.send(results)  
	});
})

app.get('/database/get', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	let bookName = crypto.randomBytes(40).toString('hex');
	let price = Math.random() * 35;
	connection.query("SELECT * FROM BooksTBL;", function (error, results, fields) {
		if (error) throw error;
		books = results;
		res.send(results)  
	});
})

app.listen(3000, () => console.log('App listening on port: 3000'))


var simpleJSON = {
	name: "Bob",
	age: 25,
	subjects: [
		'history',
		'geography',
		'math',
		'sports'
	],
	hobbies: [
		{

			languages: [
				'French',
				'Chinese',
				'German'
			],
			sports: ['fishing', 'tennis'],
			books: [
				{
					name: 'Harry Potter and the philosopher stone',
					author: 'J.K. Rowling',
					series: 'Harry Potter',
					publicationData: [
						{
							date: '26-06-1997',
							country: 'UK'
						},
						{
							date: '01-09-1998',
							country: 'US'
						}
					]
				}
			]
		}
	]
}

