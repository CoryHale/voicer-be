const db = require('../data/dbConfig.js');

const addJobOffer = async (jobOffer) => {
    return await db('jobOffers').insert(jobOffer)
}

const updateJobOffer = async (jobOfferId, newData) => {
    try {
        const checkForJobOffer = await db('jobOffers').where({ jobOfferId });
        if (!(checkForJobOffer)) return null;
        
        const updatedJobOffer = await db('jobOffers').where({ jobOfferId }).update(newData);
        if (!(updatedJobOffer)) return null;

        const selectUpdatedJobOffer = await db('jobOffers').where({ jobOfferId });
        if (!(selectUpdatedJobOffer)) return null;

        return selectUpdatedJobOffer;
    }
    catch (err) {
        return err.message;
    }
}

const deleteJobOffer = async (jobOfferId) => {
    try{
        
        const selectedJobOffer = await db('jobOffers').where({ jobOfferId }).first();
        if (!(selectedJobOffer)) return null;

        const deletedJobOffer = await db('jobOffers').where({ jobOfferId }).del();
        if (!(deletedJobOffer)) return null;
        
        return selectedJobOffer;

    }
    catch (err) {
        return err.message;
    }
}

const getJobOffers = _ => {
    return db('jobOffers');
}

const getJobOfferById = async (jobOfferId) => {
  try{
      const selectedJobOffer = await db('jobOffers').where({ jobOfferId }).first();
      return (selectedJobOffer) ? selectedJobOffer : null;
  }
  catch {
      return null;
  }
}

const getJobOffersByJobId = async (jobId) => {
    try{
        const selectedJobOffers = await db('jobOffers').where({ jobId });
        return (selectedJobOffers) ? selectedJobOffers : null;
    }
    catch {
        return null;
    }
}

const getJobOffersByClientId = async (clientId) => {
    try{
        const offers = await db('jobOffers').where({clientId})
        return offers
    }
    catch {
        return null;
    }
}

const getJobOffersByTalentId = async (talentId) => {
    try{
        const offers = await db('jobOffers').where({talentId})
        return offers
    }
    catch {
        return null;
    }
}

module.exports = {
    addJobOffer,
    updateJobOffer,
    deleteJobOffer,
    getJobOffers,
    getJobOfferById,
    getJobOffersByJobId,
    getJobOffersByClientId,
    getJobOffersByTalentId
}