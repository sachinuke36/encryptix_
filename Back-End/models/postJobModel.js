import mongoose from "mongoose";

const postJobSchema = new mongoose.Schema({
    company: { type: String, required: true },
    company_description: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    employment_type: { type: String, required: true },
    salary: { 
        from: { type: String, required: true },
        to: { type: String, required: true }
    },
    job_posting_date: { type: String, required: true },
    location: { type: String, required: true },
    logo: { type: String, required: true },
    salary_type: { type: String, required: true },
    skills: { type: String, required: true },
    title: { type: String, required: true },
});

const postJobModel = mongoose.models.jobdekho || mongoose.model('jobdekho', postJobSchema);
export default postJobModel;