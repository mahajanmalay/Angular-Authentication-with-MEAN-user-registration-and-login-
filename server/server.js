express = require('express');
bodyParser = require('body-parser');
api = require('./routes/api');
cors = require('cors');

PORT = 3000 ;

app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/api',api);

app.get('/', function(req,res){
    res.send('Hello from server');
})

app.listen(PORT, function(){
    console.log("Server running on localhost:"+PORT)
})