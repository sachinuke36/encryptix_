const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const jobCollections = getDB().collection("jobs");
const userCollection = getDB().collection("user");



//---------------------- Post a Job -----------------------------//
const postJob = async (req, res) => {
  // console.log(req)
  const body = req.body;
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: 'No token found' });
  }
  try {
    const verified_token = jwt.verify(token, process.env.JWT_KEY);
    body.createdAt = new Date();
    const data = await jobCollections.insertOne(body);
    if (data.insertedId) {
      const employer = await userCollection.findOne({ _id: new ObjectId(verified_token.id) });
      await jobCollections.updateMany({ _id: data.insertedId }, { $set: { job_by: employer._id } });
      await userCollection.updateOne(employer, { $push: { my_jobs: data.insertedId } });
      return res.status(200).json({ success: true, message: 'Job added', data: data });
    } else {
      return res.status(404).json({ message: 'Cannot insert! Try again later', status: false });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error occurred in posting a job' });
  }
};




//-------------------------------- get all jobs ------------------------------------//
const getAllJobs = async (req, res) => {
  // console.log(req)
  const jobs = await jobCollections.find({}).toArray();
  res.send(jobs);
};





//-------------------------- delete job by id ------------------------------------//

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobCollections.findOne({ _id: new ObjectId(jobId) });
    if (job._id) {
      await jobCollections.deleteOne(job);
      res.json({ success: true, message: 'Job deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error occurred' });
  }
};



//---------------- delete job ------------------------//

const deleteJOB = async(req,res)=>{
  try {
   const response = await jobCollections.updateMany({},{$set: {type:"internship"}});
      res.json({success:true, message:'updated'});
  } catch (error) {
    res.json({success:false, message:"Error occured"})
  }
 
}





//----------------------------- Get job according to minimum salary -----------------------------//

const getJobsByMinSalary = async (req, res) => {
  try {
    let minSalary = req.query.min_salary;
    const jobs = await jobCollections.find({ min_salary: { $gte: minSalary } }).toArray();
    res.json({ success: true, data: jobs });
  } catch (error) {
    console.error(error);
  }
};





//---------------------------------------- Get Job according to Job profile -------------------------------//
const getJobsByProfile = async (req, res) => {
  try {
    let jobProfile = req.body.profile;
    const jobs = await jobCollections.find({ title: jobProfile }).toArray();
    res.json({ success: true, data: jobs });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: "Job not found" });
  }
};




//-------------------------------- Filter Jobs ----------------------------------//
const filterJobs = async (req,res)=>{
  const {profile, location, work_from_home, part_time, salary, experience} = req.body;
  if(work_from_home===''){
    
  }
  console.log("experience:",experience);
    let query = {
    };

    Object.keys(req.body).forEach(key => {
      const value = req.body[key];
      if (value !== '' && value !== undefined && value.length !==0 && key!=='') {
        if(key==='title'){
          query[key]={$in:value};
        }else if(key==='location'){
          query[key]={$in:value};
        }else if(key==='min_salary'){
          query[key]={$gt: Number(value)};
        }
        else{
          query[key] = value;
        }
      } else {
      }
    });
    
    console.log("Updated query:", query);
  
  try {
      const filtered_jobs = await jobCollections.find(query).toArray();
      console.log("this is filtered data:",filtered_jobs.length)
      res.json({success:true, data:filtered_jobs});
  } catch (error) {
    res.json({success:false, message:'something is wrong'});
  }

}

module.exports = { postJob, getAllJobs, deleteJob, getJobsByMinSalary, getJobsByProfile, deleteJOB, filterJobs };
