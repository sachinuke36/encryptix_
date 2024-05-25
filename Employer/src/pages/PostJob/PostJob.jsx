import React, { useState, useContext, useEffect } from 'react'
import './PostJob.css'
import { Context } from '../../../../Front-End/src/Context/StoreContext';
import axios from 'axios';
import CreaTableSelect from 'react-select/creatable';
const PostJob = () => {
    const { url, localToken } = useContext(Context);
    const [selectDate, setSelectDate]= useState(false);
    const [type, setType] = useState();
    const [selected, setSelected] = useState(null);
    const [perks, setPerks] = useState(null)
    const [data, setData] = useState({
    company: '',
    company_description: '',
    description: '',
    email: '',
    employment_type: '',
    min_salary: '',
    max_salary: '',
    start_date: '',
    location: '',
    logo: '',
    salary_type: '',
    skills: '',
    title: '',
    openings: '',
    last_date: '',
    duration:'',
    type:''});
    const handleSubmit = async (e) => {
        e.preventDefault();   
            const token = localStorage.getItem('token')
            let response = await axios.post( `${url}/job/post-job`, data,{headers:{token}});
       
        if (response.data.success) {   
            setData({
                company: '',
                company_description: '',
                description: '',
                email: '',
                employment_type: '',
                min_salary: '',
                max_salary: '',
                start_date: '',
                location: '',
                logo: '',
                salary_type: '',
                skills: '',
                title: '',
                openings: '',
                last_date:'',
                duration:'',
                type:''
            });
        }
    }

    
    const handleChange = (e, fieldName) => {
    if(fieldName !== 'skills' && fieldName !== 'perks' && fieldName !== ''){
        const name = e.target.name;
        let value = e.target.value;

         if(name==='min_salary' || name==='max_salary' || name==='openings'){
            value = Number(value);
            setData({ ...data, [name]: value })
            }
         else {
            setData({ ...data, [name]: value })
            }  
     }else if(typeof(e)==='object' && fieldName==='skills'){
            setData((prev) => ({ ...prev, skills: e ? e.map(option => option.value) : '' }));
            }else if(fieldName==='perks'){
                setData((prev)=>({...prev, perks: e ? e.map(option=>option.value) : ''}))
            }  
    }

    


    const options = [
        { value: "Javascript", label: "Javascript" },
        { value: "Web development", label: "Web development" },
        { value: "Python", label: "Python" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "C++", label: "C++" },
        { value: "Node", label: "Node" },
        { value: "Mongo db", label: "Mongo db" },
        { value: "React", label: "React" },
        { value: "SQL", label: "SQL" },
    ]

    const perksOptions = [
        {value: "Certificate", label:"Certificate"},
        {value: "Letter of Recommendation", label:"Letter of Recommendation"},
        {value: "flexible hours", label:"flexible hours"}
        
    ]

    const handleType = type =>{
        setType(type.target.value);
       setData(prev=>({...prev,type:type.target.value}))

    }


    return (
        <div className='post-a-job'>
            <label htmlFor="">Select Internship/Job</label>
            
            <form onSubmit={(e) => handleSubmit(e)}>
            <select name="type" value={type} required onChange={handleType}>
                <option name="none" value="none">select</option>
                <option name="internship" value="internship">Internship</option>
                <option name="job" value="job">Job</option>
            </select>
                <div className='title_and_company flex'>
                    <div className="title flex-col">
                        <label htmlFor="job-title">Job Title</label>
                        <input required onChange={(e)=>handleChange(e,"title")} value={data.title} type="text" name="title" />
                    </div>
                    <div className="company flex-col">
                        <label htmlFor="company">Company</label>
                        <input required onChange={(e)=>handleChange(e,"company")} value={data.company} type="text" name="company" />
                    </div>
                </div>
                <div className="salary flex">
                    <div className="min-salary flex-col">
                        <label htmlFor="min-salary">Minimum salary</label>
                        <input required onChange={(e)=>handleChange(e,"min_salary")} value={data.min_salary} type="number" name="min_salary" />
                    </div>
                    <div className="max-salary flex-col">
                        <label htmlFor="max-salary">Maximum salary</label>
                        <input required onChange={(e)=>handleChange(e,"max_salary")} value={data.max_salary} type="number" name="max_salary" />
                    </div>
                </div>
                <div className="salary_type_and_location flex">
                    <div className="salary-type flex-col">
                        <label htmlFor="salary-type">Salary type</label>
                        <select required name="salary_type" onChange={(e)=>handleChange(e,"salary_type")} value={data.salary_type} >
                            <option defaultValue={'select'}>select</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="location flex-col">
                        <label htmlFor="location">Location</label>
                        <input required onChange={(e)=>handleChange(e,"location")} value={data.location} type="text" name="location" />
                    </div>
                </div>
                <div className="start_date_and_exp flex">
                    <div className="start-date flex-col ">
                        <label htmlFor="start-date"> Start Date</label>
                        <select required onChange={(e)=>{
                            if(e.target.value === ''){
                                setSelectDate(false);
                                return setData(prev=>({...prev, start_date:'immediately'}));
                            }else if(e.target.value==="immediately"){
                                return setData(prev=>({...prev, start_date:'immediately'}))
                            }else{
                                setSelectDate(true);
                            }
                        }}>
                            <option value="">Select</option>
                            <option value="immediately">immediately</option>
                            <option value="date">Select Date</option>
                           
                        </select>
                        <div className={selectDate ? "display":'none'}> <input type='date' name='start_date' onChange={(e)=>handleChange(e,"start_date")} value={data.start_date}></input></div>
                          
                    </div>
                    <div className="experience flex-col">
                        <label htmlFor="experience">Experience level</label>
                    <select name="experience" required defaultValue={"select"} onChange={(e)=>handleChange(e,"experience")} value={data.experience}>
                        <option value="select">Select</option>
                            <option value="no experience">No experience</option>
                            <option value="0-2">0-2 years</option>
                            <option value="more than 2 years">more than 2 years</option>
                        </select>
                    </div>
                </div>
                <div className="skills flex-col">
                    <label htmlFor="skills">Skills</label>
                    <div className="creatable">
                    <CreaTableSelect
                        defaultValue={selected}
                        onChange={(e)=>handleChange(e,'skills')}
                        options={options}
                        isMulti
                        className='skills-creatable'
                    />
                    </div>
                </div>
                <div className="company-logo_employement-type flex">
                    <div className="company-logo flex-col">
                        <label htmlFor="company-logo">Company logo(link)</label>
                        <input onChange={(e)=>handleChange(e,"logo")} value={data.logo} type="text" name="logo" />
                    </div>
                    <div className="employement-type flex-col">
                        <label htmlFor="employement-type">Employment type</label>
                        <select required onChange={(e)=>handleChange(e,"employement_type")} value={data.employment_type} name="employment_type" >
                            <option value="select" defaultValue={'select'}>select</option>
                            <option value="full_time">Full time</option>
                            <option value="part_time">Part time</option>
                            <option value="temporary">Temporary</option>
                        </select>
                    </div>
                </div>
                <div className="description flex-col">
                    <label htmlFor="description">Job Description</label>
                    <textarea required onChange={(e)=>handleChange(e,"description")} value={data.description} name="description" />
                </div>
                <div className="company_description flex-col">
                    <label htmlFor="company_description">Company Description</label>
                    <textarea required onChange={(e)=>handleChange(e,"company_description")} value={data.company_description} name="company_description" />
                </div>
                <div className="job_posted_and_openings flex">
                    <div className="job_posted_by flex-col">
                        <label htmlFor="email">Job posted by</label>
                        <input required onChange={(e)=>handleChange(e,"email")} value={data.email} type="email" name="email" />
                    </div>
                    <div className="no_of_openings flex-col">
                        <label htmlFor="openings">Number of Openings</label>
                        <input type="number" name="openings" onChange={(e)=>handleChange(e,"openings")} value={data.openings} />
                    </div>

                </div>
                    <div className="perks">
                    <label htmlFor="perks">Perks</label>
                    <CreaTableSelect
                        defaultValue={perks}
                        onChange={(e)=>handleChange(e,'perks')}
                        options={perksOptions}
                        isMulti
                        className='perks-creatable'
                    />
                    </div>
                    <div className="last_date_to_apply_duration flex">
                       <div className="last_date flex-col">
                       <label htmlFor="last_date">Apply By</label>
                        <input type="date" name="last_date" onChange={(e)=>handleChange(e,"last_date")} value={data.last_date} />
                       </div>
                       <div className={ `${ type !=='internship' ? "none": "flex-col" } duration`}>
                        <label htmlFor="duration">Duration</label>
                        <input type="text" name="duration" onChange={(e)=>handleChange(e,"duration")} value={data.duration} />
                       </div>

                    </div>
                <div className="button"><button type="submit">Submit</button></div>
            </form>
            
        </div>

    )
}

export default PostJob
