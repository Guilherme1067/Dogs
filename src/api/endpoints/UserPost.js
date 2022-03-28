import React, { useState } from 'react'

const UserPost = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('https://dogsapi.origamid.dev/json/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
                
            })
        }).then(response => {
            return response.json();
        }).then( json => {
        })
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={({target}) => setUsername(target.value)} placeholder="username" />
        <input type="text" value={password} onChange={({target}) => setPassword(target.value)} placeholder="password" />
        <input type="text" value={email} onChange={({target}) => setEmail(target.value)} placeholder="email" />

        <button>Enviar</button>
    </form>
  )
}

export default UserPost