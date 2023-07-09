import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi } from 'openai';
import Sentiment from 'sentiment';



dotenv.config();

console.log(process.env.OPENAI_API_KEY)

const configuration = new  Configuration({
    apikey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();


app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message:'hello World',
    })
})


app.post('/', async (req, res) => {
    try {
      const prompt = req.body.prompt;
      const enemy = req.body.enemy;
  
      let character;
  
      if (enemy === 1) {
        character = "You are a minotaur guard called sylosaur"; // Define the prompt for enemy === 1
      } else {
        character= "You are a chill surfer bro called benny"; // Define the prompt for enemy === 0
      }
  
      const response = await generateResponse(character, prompt);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });
  
  async function generateResponse(character, prompt) {
    const target = "you";
    const sentiment = new Sentiment();
    const Targetsentiment = sentiment.analyze(prompt, {extras: {target}})
    const sentimentScore = Targetsentiment.score;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${character} ${prompt}`,
      // Configure other parameters and instructions specific to the prompt
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  
  
    return {
      sentiment: sentimentScore,
      bot: response.data.choices[0].text
    };
  }
  

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));