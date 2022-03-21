import React, { useState } from 'react'

const TokenPost = () => {
    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(response => response.json()).then(json => setToken(json.token))
    }

  return (
    <form onSubmit={handleSubmit}> 
        <input value={username} onChange={({target}) => setUserName(target.value)} placeholder='username'/>
        <input value={password} onChange={({target}) => setPassword(target.value)} placeholder='password'/>
        <button>Enviar</button>
        <p style={{wordBreak: 'break-all'}}>{token}</p>
    </form>
  )
}

export default TokenPost