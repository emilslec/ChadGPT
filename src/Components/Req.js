import { useState } from 'react'
import Text from "./Text"

const Req = ()=> {
  const [reqs, updateReqs] = useState("")
  const [resp, updateResp] = useState("")

    const TheReq = () =>{
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String("process.env.key")
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": reqs}],
        'temperature': 1,
        'max_tokens': 200,
      })
    };
    fetch('https://api.openai.com/v1/chat/completions', requestOptions)
        .then(response => response.json())
        .then(data => {
          updateResp(data.choices[0].message.content)
          console.log(data.choices[0].message.content)
      }).catch(err => {
        console.log("Ran out of tokens for today! Try tomorrow!");
      });
    }
    return (
      <div>
        <input type="text" onChange={(e) =>updateReqs(e.target.value)} ></input>
        <button onClick={TheReq} value="Submit"
        >Sūtīt</button>
        <Text text={resp}/>
      </div>
    )
  }

export default Req
