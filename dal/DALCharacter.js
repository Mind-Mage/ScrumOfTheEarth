const{mongoose, Schema} = require('mongoose')
const connectionString = "mongodb+srv://lvirrey:Nc210859027@toonzk.0byxsso.mongodb.net/VideoGameCharacterDatabase"//THIS
mongoose.connect(connectionString,{useUnifiedTopology: true, useNewUrlParser: true})
const connection = mongoose.connection
connection.once('open', () =>{
    console.log('connection to: ' + connectionString)
})
const characters = new Schema(
    {
        //hey, I was lazy and didn't set this. Can someone set the scheme up?
    },
    {collection:'Characters'}
)
const userCollection = mongoose.model('characters', characters)//WAH

//NEEDS CRUD STUFF, C R

exports.dalcharacter = {
    //PLACE STUFF HERE
}