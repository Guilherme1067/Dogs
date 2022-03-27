import React, { useEffect, useState } from 'react'
import FeedModal from './FeedModal'
import FeedPhotos from './FeedPhotos'

const Feed = ({user}) => {
  const [modalPhoto, setModalPhoto] = useState(null);
  const [pages, setPages] = useState([1])
  const [infinite, setInfinite] = useState(true);

  useEffect(() => {
    const infinitScroll = () => {
      console.log('infinite feed',infinite)
      if(infinite){
        console.log('entrou no scroll', infinite)
        let wait = false;
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if(scroll > height * .75 && !wait){
          setPages((pages) => [...pages, pages.length + 1])
          wait = true;
          console.log(wait)
          console.log('teste')
          setTimeout(() => {
            wait = false
          },500)
        }
      }
  }

    window.addEventListener('wheel', infinitScroll)
    window.addEventListener('scroll', infinitScroll)

    return () => {
      window.removeEventListener('wheel', infinitScroll)
      window.removeEventListener('scroll', infinitScroll)
    }

  },[infinite])

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/> }
      {pages.map(page =>  
        <FeedPhotos
          setInfinite={setInfinite}
          key={page} 
          user={user} 
          page={page}
          setModalPhoto={setModalPhoto} 
        /> )}
    </div>
  )
}

export default Feed