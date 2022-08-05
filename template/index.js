const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const moment = require('moment');
const global = require('./config/global.config')


let app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let httpServer = http.createServer(app)

console.log(`
Welcome to 
 ____                           __  __                      __     
/\\  _\`\\    __                  /\\ \\/\\ \\                    /\\ \\    
\\ \\ \\L\\ \\ /\\_\\     __          \\ \\ \\_\\ \\     __     __     \\_\\ \\   
 \\ \\  _ <'\\/\\ \\  /'_ \`\\  _______\\ \\  _  \\  /'__\`\\ /'__\`\\   /'_\` \\  
  \\ \\ \\L\\ \\\\ \\ \\/\\ \\L\\ \\/\\______\\\\ \\ \\ \\ \\/\\  __//\\ \\L\\.\\_/\\ \\L\\ \\ 
   \\ \\____/ \\ \\_\\ \\____ \\/______/ \\ \\_\\ \\_\\ \\____\\ \\__/.\\_\\ \\___,_\\
    \\/___/   \\/_/\\/___L\\ \\         \\/_/\\/_/\\/____/\\/__/\\/_/\\/__,_ /
                   /\\____/                                         
                   \\_/__/                      
                                     This is a project made by leganux.net (c) 2021-2022 
                                       
                  ______________________________________
           Read the docs at https://github.com/leganux/big-head                     

`)


app.use('/public', express.static(__dirname + '/public'));

app.use(morgan(function (tokens, req, res) {
    return [
        moment().format('YYYY-MM-DD hh:mm:ss'),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
    ].join('  ');
}))


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))


app.use('/', require('./viewEngine'))

app.get('*', async function (_req, res) {
    res.status(404).json({
        success: false,
        code: 404,
        error: 'Resource not found',
        message: 'Big-Head has been successful started',

    })
})

httpServer.listen(global.port, () => {
    console.log("http server start al port", global.port);
});
