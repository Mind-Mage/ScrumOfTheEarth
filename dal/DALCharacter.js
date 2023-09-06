const { fileLoader } = require('ejs')
const{mongoose, Schema} = require('mongoose')
const connectionString = "Nothing"//Turned off my cluster - ZK
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
        //picture: fileLoader this was causing an error so it's commented for now, I don't think Schema is going to accept fileloader as a type
        picture: String,
    },
    {collection:'Characters'}
)
const userCollection = mongoose.model('characters', characters)

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
    return await userCollection.findOne({character: name}).exec()
}

exports.dalcharacter = {
    add: async (character, skill, game, picture) =>{
        charactList = await seeAllChar()
        for(let i = 0; i < charactList.length; i++){
            if(charactList[i].character === character){
                return null
            } 
        }
        addChar(character, skill, game, picture)
        return 1
    },
    findChar: async (character) =>{
        return findCharByName(character);
    },
    returnAll: async () =>{
        return seeAllChar()
    }
}