const express = require('express');
const cors = require('cors');
const app = express();
const mysql=require('mysql');
const config=require('./app/config');
const port = 8000;
const db=require('./app/db/mysql');
const comments=require('./app/comments');
const news=require('./app/news');


const connection=mysql.createConnection(config.db);


const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
};
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(express.json());

connection.connect((err=>{
    if(err){
        console.log(err);
        throw err;
    }

    console.log('mysql connected');

    app.use('/news', news(db(connection)));
    app.use('/comments', comments(db(connection)));


    app.listen(port, () => {
        console.log('Server started on port ' + port);
    });
}));