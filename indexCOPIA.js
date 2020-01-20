const express = require('express');
const app = express();

const uuidv4 = require('uuid/v4')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



let books = {
  1: {
    id: '1',
    name: 'El Psicoanalista',
  },
  2: {
    id: '2',
    name: 'El principito',
  },
  3: {
    id: '3',
    name: 'Amor en los tiempos de colera',
  },
};



app.get('/books', (req, res) => {
  return res.send(Object.values(books))
});
app.get('/books/:bookId', (req, res) => {
  return res.send(books[req.params.bookId]);
});


app.post('/books', (req, res) => {
  const id = uuidv4();
  const book = {
    id,
    name: req.body.name
  };
  books[id] = book;
  return res.send(book);
});


app.put('/books/:bookId', (req, res) => {
	let id=req.params.bookId;
	if(id in books){
		name=req.body.name;
		books[id]['name']=name;
		return res.status(200).send('UPDATE');
	}
	else{
		return res.status(404).send('not found');
	}
});


app.delete('/books/:bookId', (req, res) => {
	let id=req.params.bookId;
	if(id in books){
		delete books[id];
		return res.status(200).send('DELETE');
	}
	else{
		return res.status(404).send('not found');
	}
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
}); 