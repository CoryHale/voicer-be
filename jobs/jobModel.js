const db = require('../data/dbConfig.js');

const addJob = async (job) => {
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

module.exports = {
    addJob,
    updateJob,
    deleteJob
}