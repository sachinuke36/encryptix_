import React,{useContext} from 'react'
import './MyJobs.css'
import { Context } from '../../../Front-End/src/Context/StoreContext'

const MyJobs = () => {
    const {all_jobs} = useContext(Context);
    console.log(all_jobs)
  return (
    <div>
      
    </div>
  )
}

export default MyJobs
