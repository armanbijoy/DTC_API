const express = require('express')
const conn = require('./DB/Connection')
const State = require('./Models/StateModel')
const AlbertaQuestionModel= require('./Models/AlbertaQuestionModel')
const cors = require('cors')

const app = express()


app.use(cors({origin: true, credentials: true}));
app.use(express.json())
app.get('/', (req,res)=>{
    res.send('Heloo DTC API')
})

app.get('/state', async (req,res)=>{
    try{
        const states = await State.find({})
        res.status(200).json(states)
    }
    catch(err)
    {
        
        res.status(500).json({message: err.message})
    }

})

app.get('/state/alberta/', async (req,res)=>{
    try{
        const albertaTest = await AlbertaQuestionModel.find({})
        res.status(200).json(albertaTest)
    }
    catch(err)
    {
        
        res.status(500).json({message: err.message})
    }

})

app.post('/state/create', async (req,res)=>{
    
    try{
        const state = await State.create(req.body)
        res.status(200).json(state) 

    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

app.post('/state/alberta/create', async (req,res)=>{
    
    try{
        const albertatest = await AlbertaQuestionModel.create(req.body)
        res.status(200).json(albertatest) 

    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})



if(conn)
{
    console.log('Database Connected')
}

app.listen(9000, ()=>{
    console.log('DTC API Running on 9000')
})