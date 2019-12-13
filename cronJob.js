var cron = require('node-cron');
const Users = require('./users/userModel.js');
const JobOffers = require('./jobOffers/jobOfferModel.js');
const TalentProfiles = require('./talentProfiles/talentProfileModel.js');
const ClientProfiles = require('./clientProfiles/clientProfileModel.js');

const schedule = () => {
    cron.schedule("0 * * * * *", async () => {
        console.log("Schedule");
        const users = await Users.getUsers();
        console.log(users)
        users.forEach(async user => {
            const profile = user.userType === "Talent"
                ? TalentProfiles.getTalentProfileByUserId(user.userId) 
                : ClientProfiles.getClientProfileByUserId(user.userId)
            let offers = user.userType === "Talent"
                ? JobOffers.getJobOffersByTalentId(profile.talentId)
                : JobOffers.getJobOffersByClientId(profile.clientId)
            var cutoffDate = new Date()
            //var cutoffDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
            cutoffDate.setMonth(cutoffDate.getMonth() - 6);
            //var testDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
            let completedOffers = offers.filter(offer => {
                // let completedDate = new Date(offer.completedDate)
                ((offer.status.toLowerCase() === "accepted") && (offer.completedDate >= cutoffDate))
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
