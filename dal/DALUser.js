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

async function findAll(){
    return await userCollection.find({}).exec()
}


exports.daluser = {
    register: async (username, password) =>{
        userList = await findAll()
        for(let i = 0; i < userList.length; i++){
            if (userList[i].username === username){
                return null
            }
        }
        addUser(username, password)
        return 1
    }
}