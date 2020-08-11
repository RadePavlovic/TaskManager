const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=> {
    console.log("Connected to MongoDb successfully");    
}).catch((err)=> {
    console.log("Error while attempting to connect to database");
    console.log(err);
    
    
})

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);
module.exports={
    mongoose
}

