import React, { useState } from 'react';
import axios from 'axios';

const GPT3Component = ({ apiKey, onUpdateInputValue }) => {

  const pencilIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>

  const generateText = () => {
    const mainInputElement = document.getElementById('main-input-element');
    const inputText = mainInputElement ? mainInputElement.value : '';

    axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Make this gramatically correct: ${inputText}`, //this is the prompt + whatevers in input
      max_tokens: 1000
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const gptResponse = response.data.choices[0].text.replaceAll("\"", "");
      console.log(gptResponse); //this logs it to console completed
      onUpdateInputValue(gptResponse); //update input value in timeline AKa corrects tweet typed
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <span id="pencil-icon-ai" onClick={generateText}>{pencilIcon}</span>
      {/* <button onClick={generateText}>Generate GPT Response</button> */}
    </div>
  );
};

export default GPT3Component;




//the code before i touched it -8:30 sunday

// import React, { useState } from 'react';
// import axios from 'axios';

// const GPT3Component = ({ apiKey }) => {
// const [generatedText, setGeneratedText] = useState('');
// const [inputText, setInputText] = useState('');

// //const apiKey = process.env.REACT_APP_OPENAI_API_KEY
// //<GPT3Component apiKey={apiKey} />


// function generateText() {
//     axios.post('https://api.openai.com/v1/completions', {
//       model: 'gpt-3.5-turbo-instruct',
//       prompt: 'give me a funny joke that is tech related.',
//       max_tokens: 1000
//     }, {
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   }


// return (
// <div>
// <h2>GPT-3 Text Generation</h2>
// <textarea
// value={inputText}
// onChange={(e) => setInputText(e.target.value)}
// placeholder="Enter text to generate"
// rows={5}
// cols={50}
// />
// <br />
// <button onClick={generateText}>Generate Text</button>
// <br />
// {generatedText && (
// <div>
// <h3>Generated Text:</h3>
// <p>{generatedText}</p>
// </div>
// )}
// </div>
// );
// };

// export default GPT3Component;
