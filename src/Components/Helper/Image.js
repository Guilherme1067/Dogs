import React, { useState } from 'react'
import styles from './Image.module.css'
const Image = ({ alt, ...props}) => {
  const [skeleton, setSkeleton] = useState(true);
  
  const handleLoad = ({target}) => {
     setSkeleton(true);
     target.style.opacity = 1;
  }

  return (
    <div className={styles.wrapper}>
        {skeleton && <div className={styles.skeleton}></div>}
        <img onLoad={handleLoad} className={styles.img} src={styles.img} alt={alt} {...props}  />
    </div>
  )
}

export default Image