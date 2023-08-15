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
//are you saying we need just create and read
function addChar (name, skill, game, pic)
{
    userCollection.create({character: name, skill: skill, game: game, picture: pic})
}

async function seeAllChar()
{
    return await userCollection.find({}).exec()
}

async function findCharByName(name)
{
    return await userCollection.find({name}).exec()//? not too sure reaserching now
}

function updateChar()
{
    //is this even going to be an opion on the character page ?
}

function deleteChar()
{
    //
}

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