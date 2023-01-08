// create function to fetch data from chatgpt with axios and return the response by resolving a promise
const axios = require('axios');

//import dotenv
require('dotenv').config();

const getAnswerFromChatGPT = (question) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: 'https://api.openai.com/v1/completions',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + process.env.CHATGPT_API_KEY,
            },
            data: {
                "model": "text-davinci-002",
                "prompt": question,
                "max_tokens": 250,
            },
          };

        axios(options)
        .then((response) => {
            let answer = response.data?.choices[0]?.text;
            resolve(answer || "Sorry, I don't know the answer to that question.");
        })
        .catch((error) => {
            reject(error);
        });
    });
}

module.exports = {
    getAnswerFromChatGPT
};