import React from 'react'
import { useSelector } from 'react-redux'

const Profils = () => {
    const user =useSelector((state)=> state.user.user);
  return (
    <div>
      <h1>hello is {user? user.name:<h1>Loading...</h1>}</h1>
    </div>
  )
}

export default Profils
