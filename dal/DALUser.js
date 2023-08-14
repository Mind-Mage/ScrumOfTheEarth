const{mongoose, Schema} = require('mongoose')
const connectionString = "mongodb://127.0.0.1:27017/VideoGameCharacters"
mongoose.connect(connectionString,{useUnifiedTopology: true, useNewUrlParser: true})
const connection = mongoose.connection
connection.once('open', () =>{
    console.log('connection to: ' + connectionString)
})
const users = new Schema(
    {
        username: String,
        password: String
    },
    {collection:'Users'}
)
const userCollection = mongoose.model('users', users)

function addUser(username, password){
    userCollection.create({username: username, password: password})
}



exports.dal = {
    register: async (username, password) =>{
        addUser(username, password)
        return 1
    }
}