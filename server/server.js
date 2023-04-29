import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration,OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);


const app = express();

//setup middleware
app.use(cors()); //allow server to be called from frontend
app.use(express.json()); // allow json to be passed from frontend to backend

app.get('/',async(req,res)=>{
    res.status(200).send({
        message:"Hello from codex",
    })
});

app.post('/',async(req,res)=>{
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.7,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0, //not repeat similar sentence again
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
            } catch(error){
                console.log(error);
                res.status(500).send({error})
            }
        })


app.listen(5000,()=> console.log('Server is running on port http://localhost:5000'));