import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { GET_PHOTO } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import Loading from '../Helper/Loading';
import PhotoContent from './PhotoContent';

const Photo = () => {
  const {id} = useParams();
  const {request, data, loading, error } = useFetch()

  useEffect(() => {
    const {url} = GET_PHOTO(id);
    request(url)

  },[request, id])
  
  if(error) return <Error error={error} />
  if(loading) return <Loading />

  if(data)
  return(
    <section className='container mainContainer'>
      <Head title={data.photo.title}/>
      <PhotoContent single={true} data={data}/>
    </section>
  )
  else return null;
}

export default Photo;