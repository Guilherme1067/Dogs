import React, { useState } from 'react'
import { COMMENT_POST } from '../../api';
import {ReactComponent as Enviar} from '../../assets/enviar.svg';
import useFetch from '../../hooks/useFetch';
import Error from '../Helper/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({id, setComments}) => {
    const [comment, setComment] = useState('');
    const {request, error} = useFetch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token')

        const {url, options} = COMMENT_POST({comment},id,token)
        const {response, json} = await request(url,options);
        if(response.ok) {
            setComment('');
            setComments((comments) => [...comments, json])
        } 
    }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
       <textarea 
        className={styles.textarea}
        id="comment"
        name="comment"   
        placeholder="Comente..."
        value={comment} 
        onChange={({target}) => setComment(target.value) }
       />
       <button className={styles.button}>
           <Enviar/>
       </button>
       <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm