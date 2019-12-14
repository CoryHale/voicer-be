var cron = require('node-cron');
const Users = require('./users/userModel.js');
const JobOffers = require('./jobOffers/jobOfferModel.js');
const TalentProfiles = require('./talentProfiles/talentProfileModel.js');
const ClientProfiles = require('./clientProfiles/clientProfileModel.js');

const schedule = () => {
    console.log('hi')
    return cron.schedule("0 0 1 1-12 *", async () => {
        const users = await Users.getUsers();
        users.forEach(async user => {
            console.log(user.userType)
            const profile = user.userType === "talent"
                ? await TalentProfiles.getTalentProfileByUserId(user.userId) 
                : await ClientProfiles.getClientProfileByUserId(user.userId)
            const offers = user.userType === "talent"
                ? await JobOffers.getJobOffersByTalentId(profile[0].talentId)
                : await JobOffers.getJobOffersByClientId(profile[0].clientId)
            var cutoffDate = new Date()
            cutoffDate.setMonth(cutoffDate.getMonth() - 6);
            let completedOffers = offers.filter(offer => {
                return (offer.status.toLowerCase() === "accepted") ?
                    new Date(offer.completedDate) > cutoffDate ? offer : false : false
            })
            let loyalty = 1
            if (10 <= completedOffers.length <= 24) {
                loyalty = 2
            }
            if (completedOffers.length >= 25) {
                loyalty = 3
            }
            if (completedOffers.length !== user.completedJobs) {
                await Users.updateUser(user.userId, {
                    completedJobs: completedOffers.length,
                    loyaltyLevel: loyalty
                })
            }
        });
    })
}


module.exports = schedule;
