const { fileLoader } = require('ejs')
const{mongoose, Schema} = require('mongoose')
const connectionString = "mongodb+srv://lvirrey:Nc210859027@toonzk.0byxsso.mongodb.net/VideoGameCharacterDatabase"//THIS
mongoose.connect(connectionString,{useUnifiedTopology: true, useNewUrlParser: true})
const connection = mongoose.connection
connection.once('open', () =>{
    console.log('connection to: ' + connectionString)
})
const characters = new Schema(
    {
        character: String,
        skill: String,
        game: String,
        picture: fileLoader
    },
    {collection:'Characters'}
)
const userCollection = mongoose.model('characters', characters)//WAH

//NEEDS CRUD STUFF, C R

// this is not complete it still needs some touchups to send to the database correctly
exports.dalcharacter = {
    add: async (character, skill, game, picture) =>{
        charactList = await findALL()
        for(let i = 0; i < charactList.length; i++){
            if(charactList[i].character === character) return null;
        }
        addCharacter(character, skill, game, picture)
        return 1
    }
}