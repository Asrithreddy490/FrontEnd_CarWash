 import React from 'react'
import WasherDashboard from './WahserDashBoard'
import {useParams} from 'react-router-dom'
 
 const WasherHome = () => {
  const {id} = useParams();
  console.log(id)
   return (
     <div>
       <WasherDashboard data={id}/>
     </div>
   )
 }
 
 export default WasherHome
 