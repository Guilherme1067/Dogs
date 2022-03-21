import React from 'react'
import PhotoGet from './endpoints/PhotoGet'
import PhotoPost from './endpoints/PhotoPost'
import TokenPost from './endpoints/TokenPost'
import UserPost from './endpoints/UserPost'

const Api = () => {
  return (
    <div>
        <h1>User Post</h1>
        <UserPost/>
        <h1>Token Post</h1>
        <TokenPost/>
        <h1>Photo Post</h1>
        <PhotoPost/>
        <h1>Photo Get</h1>
        <PhotoGet/>
    </div>
  )
}

export default Api