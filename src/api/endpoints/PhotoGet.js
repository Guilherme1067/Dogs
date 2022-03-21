import React, { useState } from 'react'

const PhotoGet = () => {
    const [id,setId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`https://dogsapi.origamid.dev/json/api/photo/${id}`).then(response => {
            console.log(response)
            return response.json();
        }).then(json => console.log(json))
    }

  return (
    <form onSubmit={handleSubmit}>
        <input value={id} onChange={({target}) => setId(target.value)} type="text"/>
        <button>Enviar</button>
    </form>
  )
}

export default PhotoGet