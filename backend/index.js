import express, { response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";


const app = express();
//Middleware for parsing request body
app.use(express.json());

app.get('/',(request,response) =>{
    console.log(request)
    return response.status(234).send()
});

//Route for save a new Book
app.post('/books', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }


        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear  // Assuming publishYear is a required field
        };

        const book = await Book.create(newBook);
        // You might want to send a response back indicating success
       return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for Get all Books from database
app.get('/books/:id',async(request,response) => {
    try{
        const{ id } = request.params;

        const book = await Book.find({book});
        return response.status(200).json({
            count:books.length,
            data:books

        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to Database');
    app.listen(PORT,() =>{
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error)=>{
console.log(error);
});
