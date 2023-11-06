import React from 'react'
import UserDashBoard from './UserDashBoard'
import {useParams} from 'react-router-dom'

const UserHome = () => {
  const {id} = useParams(); 
  console.log(id)
  return (
    <div>
        <UserDashBoard data={id}/>
      
    </div>
  )
}

export default UserHome
 