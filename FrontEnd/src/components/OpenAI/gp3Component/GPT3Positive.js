import React, { useState } from 'react';
import axios from 'axios';

const GPT3PositiveFunc = ({ apiKey, onUpdateInputValue }) => {

  const smileIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
</svg>

  const generateText = () => {
    const mainInputElement = document.getElementById('main-input-element');
    const inputText = mainInputElement ? mainInputElement.value : '';

    axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Make this sentence sound more optimistic and authentic but only in 10 words or less: ${inputText}`, //this is the prompt + whatevers in input
      max_tokens: 1000
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const gptResponse = response.data.choices[0].text.replaceAll("\"", "").trim();
      console.log(gptResponse); //this logs it to console completed
      onUpdateInputValue(gptResponse); //update input value in timeline AKa corrects tweet typed
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <span id="smile-icon-ai" onClick={generateText}>{smileIcon}</span>
      {/* <button onClick={generateText}>Generate GPT Response</button> */}
    </div>
  );
};

export default GPT3PositiveFunc;


