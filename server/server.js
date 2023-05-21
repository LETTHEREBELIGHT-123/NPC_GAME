import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi } from 'openai';


dotenv.config();

console.log(process.env.OPENAI_API_KEY)

const configuration = new  Configuration({
    apikey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const bye = "nope, not yet, wait for the AI"

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message:'hello World',
    })
})

app.post('/', async(req, res)=> {
    try {
        const prompt = req.body.prompt;
        
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error){
        console.log(error);
        res.status(500).send({message:'Your Ai is not ready yet'})

    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));