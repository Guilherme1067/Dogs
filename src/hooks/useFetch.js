import React, { useCallback, useState } from 'react'

const useFetch = () => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setEror] = useState(null);

    const request = useCallback(async(url,options) => {
        let response,json; 
        try{
            setEror(null);
            setLoading(true);
            response =  await fetch(url,options);
            json = await response.json()
            if(!response.ok) throw new Error(json.message)
        }catch(error){
            json = null;
            setEror(error.message)
        }finally{
            setData(json);
            setLoading(false)
            return {response, json}
        }
    },[])

  return {
     data,
     loading,
     error,
     request
  }
}

export default useFetch