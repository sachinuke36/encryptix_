import React,{useContext, useEffect, useState} from 'react'
import './MyJobs.css'
import { Context } from '../../../Front-End/src/Context/StoreContext';
import axios from 'axios';
import MyJobsCard from '../../components/MyJobsCard/MyJobsCard';

const MyJobs = () => {
    const [myJobs, setMyJobs]= useState(); 
    const {all_jobs, url} = useContext(Context);
    const token = localStorage.getItem('token');
    useEffect(()=>{
      const getMyJobs = async ()=>{
        try {
          const response = await axios.get(url+'/job/my_jobs',{headers:{token}})
          setMyJobs(response.data.data);
        } catch (error) {
          console.log("coudn't fetch my jobs")
        }
      }
      getMyJobs()
    },[])
    console.log("my_jobs",myJobs);
  return (
    <div className='my_jobs'>
      <h1> Jobs Posted by me</h1>
      <div className="my_jobs_box">
          {
            myJobs?.map((job,i)=>(
              <MyJobsCard key={i}
                title={job.title}
                company={job.company}
                type={job.type}
                employement_type={job.employement_type}
                company_description = {job.company_description}
                description = {job.description}
                min_salary = {job.min_salary}
                max_salary = {job.max_salary}
                start_date = {job.start_date}
                location = {job.location}
                logo = {job.logo}
                openings = {job.openings}
                last_date = {job.last_date}
                perks = {job.perks}
                duration = {job.duration}
                skill ={job.skills}
                email={job.email}
                experience = {job.experience}

              />
            ))
          }
      </div>
    </div>
  )
}

export default MyJobs
