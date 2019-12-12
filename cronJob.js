const cron = require('node-cron');
const Users = require('./users/userModel.js');
const JobOffers = require('./jobOffers/jobOfferModel.js');
const TalentProfiles = require('./talentProfileModel.js');
const ClientProfiles = require('./clientProfileModel.js');

const schedule = () =>
cron.schedule("1 * * * *", async function() {
        const users = await Users.getUsers()
        users.forEach(user => {
            const profile = user.userType === "Talent"
             ? TalentProfiles.getTalentProfileByUserId(user.userId) 
             : ClientProfiles.getClientProfileByUserId(user.userId)
            let offers = user.userType === "Talent"
             ? JobOffers.getJobOffersByTalentId(profile.talentId)
             : JobOffers.getJobOffersByClientId(profile.clientId)
            var cutoffDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
            cutoffDate.setMonth(d.getMonth() - 6);
            testDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
            let completedOffers = offers.filter(offer => {
                // let completedDate = new Date(offer.completedDate)
                if (offer.status.toLowerCase() === "Accepted"
                && testDate >= cutoffDate) {
                    return offer
                }
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
                console.log('Success!')
            }
            console.log('Success!')
        })
})


export default schedule
