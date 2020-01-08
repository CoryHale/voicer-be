const express = require("express");
const router = express.Router();

const Reviews = require("./reviewModel.js");
const Users = require("../users/userModel");

// Add review
router.post("/", async (req, res) => {
    const reviewData = req.body;
    const recipientId = reviewData.recipientId;

    try {
        await Reviews.addReview(reviewData);
        let recipient = await Users.getUserById(recipientId);
        let newRatingsReceived = recipient.ratingsReceived + 1;
        let newAverageRating =
            (recipient.averageRating * recipient.ratingsReceived +
                reviewData.rating) /
            newRatingsReceived;
        let newRecipientData = {
            averageRating: newAverageRating,
            ratingsReceived: newRatingsReceived
        };
        await Users.updateUser(recipientId, newRecipientData);
        res.status(201).json({ message: "Added review" });
    } catch (error) {
        res.status(500).json({
            message: "Review could not be added",
            error: error
        });
    }
});

// Update review
router.put("/:id", async (req, res) => {
    const reviewData = req.body;
    const { id } = req.params;

    try {
        const oldReviewData = await Reviews.getReviewById(id);
        const updatedReview = await Reviews.updateReview(id, reviewData);
        const recipientId = oldReviewData.recipientId;
        let recipient = await Users.getUserById(recipientId);
        let newAverageRating =
            (recipient.averageRating * recipient.ratingsReceived -
                oldReviewData.rating + reviewData.rating) /
            recipient.ratingsReceived;
        let newRecipientData = {
            averageRating: newAverageRating,
        };
        await Users.updateUser(recipientId, newRecipientData);
        res.status(201).json(updatedReview);
    } catch (error) {
        res.status(500).json({
            message: "Review could not be added",
            error: error
        });
    }
});

// Delete review
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const reviewData = await Reviews.getReviewById(id);
        const deletedReview = await Reviews.deleteReview(id);
        let recipientId = reviewData.recipientId;
        let recipient = await Users.getUserById(recipientId);
        let newRatingsReceived = recipient.ratingsReceived - 1;
        if (newRatingsReceived) {
            let newAverageRating =
                (recipient.averageRating * recipient.ratingsReceived -
                    reviewData.rating) /
                newRatingsReceived;
            let newRecipientData = {
                averageRating: newAverageRating,
                ratingsReceived: newRatingsReceived
            };
            await Users.updateUser(recipientId, newRecipientData);
        } else {
            let newRecipientData = {
                averageRating: null,
                ratingsReceived: 0
            };
            await Users.updateUser(recipientId, newRecipientData);
        }


        if (deletedReview) {
            res.status(201).json(deletedReview);
        } else {
            res.status(404).json({ message: "Could not delete review" });
        }
    } catch {
        res.status(500).json({
            error: "There was a problem deleting the review from the database."
        });
    }
});

// Get review by id
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const selectedReview = await Reviews.getReviewById(id);

        if (selectedReview) {
            res.json(selectedReview);
        } else {
            res.status(404).json({ message: "Could not find review." });
        }
    } catch (err) {
        res.status(500).json({ error: "Could not find review." });
    }
});

router.get("/all/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        let author = Users.getUserById(userId);
        if (author) {
            let reviews = Reviews.getReviewsByUserId(userId);
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ message: "Could not find user." });
        }
    } catch {
        res.status(500).json({ error: "There was a problem retrieving the reviews from the database." });
    }
});

router.get("/received/:recipientId", async (req, res) => {
    const { recipientId } = req.params;
    try {
        let recipient = Users.getUserById(recipientId);
        if (recipient) {
            let receivedReviews = await Reviews.getReviewsByRecipientId(recipientId);
            res.status(200).json(receivedReviews);
        } else {
            res.status(404).json({ message: "Could not find user."});
        }
    } catch {
        res.status(500).json({ error: "There was a problem retrieving the reviews from the database." });
    }
});

router.get("/authored/:authorId", async (req, res) => {
    const { authorId } = req.params;
    try {
        let author = Users.getUserById(authorId);
        if (author) {
            let reviews = Reviews.getReviewsByAuthorId(authorId);
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ message: "Could not find user." });
        }
    } catch {
        res.status(500).json({ error: "There was a problem retrieving the reviews from the database." });
    }
});

module.exports = router;