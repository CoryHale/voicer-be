const db = require('../data/dbConfig.js');

const addJob = async (job) => {
    let createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    job['createdDate'] = createdDate;
    job['status'] = 'Hiring'
    return await db('jobs').insert(job)
}

const updateJob = async (jobId, newData) => {
    try {
        const checkForJob = await db('jobs').where({ jobId });
        if (!(checkForJob)) return null;
        
        const updatedJob = await db('jobs').where({ jobId }).update(newData);
        if (!(updatedJob)) return null;

        const selectUpdatedJob = await db('jobs').where({ jobId });
        if (!(selectUpdatedJob)) return null;

        return selectUpdatedJob;
    }
    catch (err) {
        return err.message;
    }
}

const deleteJob = async (jobId) => {
    try{
        
        const selectedJob = await db('jobs').where({ jobId }).first();
        if (!(selectedJob)) return null;

        const deletedJob = await db('jobs').where({ jobId }).del();
        if (!(deletedJob)) return null;
        
        return selectedJob;

    }
    catch (err) {
        return err.message;
    }
}

const getJobs = () => {
    return db('jobs as j')
    .join('clientProfiles as cp', 'cp.clientId', '=', 'j.clientId')
    .join('users as u', 'u.userId', '=', 'cp.userId')
    .select('u.firstName', 'u.lastName', 'u.userId', 'u.email', 'cp.clientId', 'cp.companyName', 'cp.rating', 'j.jobId', 'j.jobDescription', 'j.jobTitle', 'j.initialPrice', 'j.createdDate');
}

const getJobById = async (jobId) => {
  try{
      const selectedJob = await db('jobs').where({ jobId }).first();
      return (selectedJob) ? selectedJob : null;
  }
  catch {
      return null;
  }
}

module.exports = {
    addJob,
    updateJob,
    deleteJob,
    getJobs,
    getJobById
}
