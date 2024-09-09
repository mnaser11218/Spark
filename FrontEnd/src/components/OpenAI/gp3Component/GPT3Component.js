import React, { useState } from 'react';
import axios from 'axios';

const GPT3Component = ({ apiKey }) => {
const [generatedText, setGeneratedText] = useState('');
const [inputText, setInputText] = useState('');



function generateText() {
    axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo-instruct',  // Update to the latest model you intend to use
      prompt: 'give me five examples of boredom!',
      max_tokens: 100
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }


return (
<div>
<h2>GPT-3 Text Generation</h2>
<textarea
value={inputText}
onChange={(e) => setInputText(e.target.value)}
placeholder="Enter text to generate"
rows={5}
cols={50}
/>
<br />
<button onClick={generateText}>Generate Text</button>
<br />
{generatedText && (
<div>
<h3>Generated Text:</h3>
<p>{generatedText}</p>
</div>
)}
</div>
);
};

export default GPT3Component;