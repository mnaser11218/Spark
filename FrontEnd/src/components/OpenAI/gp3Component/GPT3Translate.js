import React, { useState } from 'react';
import axios from 'axios';
import { TRUE } from 'sass';
import './GPT3Styling.css';


const GPT3Component = ({ apiKey, onUpdateInputValue }) => {
  const [showForm, setShowForm] = useState(false)
  const[language, setLanguage] = useState('')
  const[showLanguageInput, setShowLangInput] = useState(false)

  const pencilIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>

const globeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-globe2" viewBox="0 0 16 16">
<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/>
</svg>

  const generateText = () => {
    setShowForm(true)
    const mainInputElement = document.getElementById('main-input-element');
    const inputText = mainInputElement ? mainInputElement.value : '';

    axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Translate this to ${language}: ${inputText}`, //this is the prompt + whatevers in input
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
      setShowLangInput(false);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    
    <>
    <div>
      <span id="globe-icon-ai" onClick={()=> setShowLangInput(true)}>{globeIcon}</span>
      </div>
      <div>
         {showLanguageInput &&(
        <div> 
          <input 
          
          type='text' 
          value={language}
          onChange={(event => setLanguage(event.target.value))}
          placeholder='Enter Language (e.g., Spanish, French...)'
         
         />
         <button id='vishnu-button' onClick={generateText}>
        Submit Language
         </button>
          </div>)}
      </div>
      </>
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
