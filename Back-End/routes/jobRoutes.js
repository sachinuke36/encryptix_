const express = require('express');
const { postJob,getMyJobs, getAllJobs, deleteJob, deleteJOB, getJobsByMinSalary, getJobsByProfile, filterJobs, getJobById, applyForJob } = require('../controllers/jobController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/post-job', authenticate, postJob);
router.post('/all-jobs',authenticate, getAllJobs);
router.delete('/delete-job/:id', authenticate, deleteJob);
router.post('/delete-jobs',deleteJOB);
router.get("/info/:id",authenticate,getJobById);
router.get('/min-salary', getJobsByMinSalary);
router.get('/job-profile', getJobsByProfile);
router.post('/filtered-jobs', filterJobs);
router.get('/my_jobs',getMyJobs);
router.patch('/apply',applyForJob)

module.exports = router;  // Ensure the router is correctly exported
