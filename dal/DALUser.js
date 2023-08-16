const{mongoose, Schema} = require('mongoose')
const connectionString = "mongodb+srv://lvirrey:Nc210859027@toonzk.0byxsso.mongodb.net/VideoGameCharacterDatabase"//THIS
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
async function find(username){
    return await userCollection.findOne({username: username}).exec()
}
async function findAll(){
    return await userCollection.find({}).exec()
}

//this might need more stuff later, I have no clue?
exports.daluser = {
    register: async (username, password) =>{
        userList = await findAll()
        for(let i = 0; i < userList.length; i++){
            if (userList[i].username.toLowerCase() === username.toLowerCase()){
                return null
            }
        }
        addUser(username, password)
        return 1
    },
    findUser: async (username) =>{
        return find(username)
    }
}