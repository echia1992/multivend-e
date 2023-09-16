const app = require('./app');
const connectDatabase = require('./db/Database');


//catching database error exception

process.on('uncaughtException',(err) =>{
    console.log(`Error ${err.message}`);
    console.log('shutting down server for error handle uncaught exception');
});

//config
if (process.env.Node_ENV !== 'PRODUCTION'){
    require('dotenv').config({
        path: 'config/.env',
    });
}

//connection

connectDatabase ();
//create server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
//unhandled promise
process.on ('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down server for error handle uncaught exception');
    server.close(()=>{
        process.emit(1);
    })
})