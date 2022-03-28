import React, { lazy, useEffect } from 'react';
import { STATS_GET } from '../../api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import Loading from '../Helper/Loading';
const UserStatsGraphs = lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const {data, error, loading, request} = useFetch();

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('token')
      const {url, options} = STATS_GET(token);
        console.log(url,options)
      await request(url, options)
    }
    getData();
  },[request])

  if(loading) return <Loading/>
  if(error) <Error error={error}/>
  if(data)
  return (
    <React.Suspense fallback={<div></div>}>
      <Head title="Estatísticas"/>
      <UserStatsGraphs data={data}/>
    </React.Suspense>
  )
  else return null;
}

export default UserStats