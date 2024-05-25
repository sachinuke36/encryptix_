import React,{useContext} from 'react'
import './MyJobsCard.css'
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineNotStarted } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { SiKnowledgebase } from "react-icons/si";
import { GiDuration } from "react-icons/gi";
import axios from 'axios'; 

import { Context } from '../../../../Front-End/src/Context/StoreContext';

const MyJobsCard = ({title,
    type,
    employement_type,
    company_description ,
    description,
    min_salary ,
    max_salary ,
    start_date,
    location ,
    logo ,
    openings,
    last_date ,
    perks,
    duration,
    skill ,
    email,
    experience,company,id,url}) => {

        const deleteJob = async (id)=>{
                console.log(id)
            try {
                let token = localStorage.getItem('token');
                console.log(url+`/job/delete-job/${id}`)
                const res = await axios.delete(url+`/job/delete-job/${id}`,{headers:{token}});
                // console.log(res.data.message);
            } catch (error) {
                console.log('error aya deleteJob front-end')
            }
        }
       


  return (
    <div className='my-job-card'>
        <h2>{title}</h2>
        <p className='company'>{company}</p>
        <div className="location"><p><FaLocationDot /></p><h4>{location}</h4></div>
       
        <div className="my-job-card-middle">
            <div className="start_date fhc">
                <div className="start_date_heading fh">
                        <p><MdOutlineNotStarted /></p>
                        <span>START DATE</span>
                </div>
                <p>{start_date}</p>
            </div>
            <div className="salary fhc">
                <div className="salary_heading fh">
                    <p><FaMoneyBillWave /></p>
                    <span>{type === 'job'? 'Salary': 'Stipend'}</span>
                </div>
                <p>{min_salary===max_salary ? min_salary: `${min_salary}-${max_salary}`}</p>
            </div>
            <div className="experience fhc">
                <div className="experience_heading fh">
                    <p><SiKnowledgebase /></p>
                    <span>EXPERIENCE</span>
                </div>
                <p>{experience}</p>
            </div>
            {
                type === 'job' ? null : <div className='duration fhc'>
                    <div className="duration_heading fh">
                        <p><GiDuration /></p>
                        <span>DURATION</span>
                    </div>
                   {duration}
                </div>
            }
        </div>
        <div className="type">{type}</div>
        <hr />
        <div className="buttons">
            <button onClick={()=>deleteJob(id)}>Delete</button>
            <button>Edit</button>
        </div>
    </div>
  )
}

export default MyJobsCard
