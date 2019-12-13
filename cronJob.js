var cron = require('node-cron');
const Users = require('./users/userModel.js');
const JobOffers = require('./jobOffers/jobOfferModel.js');
const TalentProfiles = require('./talentProfiles/talentProfileModel.js');
const ClientProfiles = require('./clientProfiles/clientProfileModel.js');

const schedule = () => {
    cron.schedule("0 * * * * *", async () => {
        const users = await Users.getUsers();
        users.forEach(async user => {
            const profile = user.userType === "Talent"
                ? await TalentProfiles.getTalentProfileByUserId(user.userId)[0] 
                : await ClientProfiles.getClientProfileByUserId(user.userId)[0]
            console.log(profile)
            const offers = user.userType === "Talent"
                ? await JobOffers.getJobOffersByTalentId(profile.talentId)
                : await JobOffers.getJobOffersByClientId(profile.clientId)
            console.log(offers)
            var cutoffDate = new Date()
            //var cutoffDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
            cutoffDate.setMonth(cutoffDate.getMonth() - 6);
            //var testDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
            var testDate= new Date()
            let completedOffers = offers.filter(offer => {
                //let completedDate = new Date(offer.completedDate)
                ((offer.status.toLowerCase() === "accepted") && (testDate >= cutoffDate))
            })
            let loyalty = 1
            if (10 <= completedOffers.length <= 24) {
                loyalty = 2
            }
            if (completedOffers.length >= 25) {
                loyalty = 3
            }
            if (completedOffers.length !== user.completedJobs.length) {
                await Users.updateUser(user.userId, {
                    completedJobs: completedOffers.length,
                    loyaltyLevel: loyalty
                })
            }
            await Users.updateUser(user.userId, {
                completedJobs: completedOffers.length,
                loyaltyLevel: loyalty
            })
            console.log("For Each User")
        });
    })
}


module.exports = schedule;
