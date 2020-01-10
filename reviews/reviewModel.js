const db = require('../data/dbConfig.js');

const addReview = async (review) => {
    return await db('reviews').insert(review)
}

const updateReview = async (reviewId, newData) => {
    try {
        const checkForReview = await db('reviews').where({ reviewId });
        if (!(checkForReview)) return null;
        
        const updatedReview = await db('reviews').where({ reviewId }).update(newData);
        if (!(updatedReview)) return null;

        const selectUpdatedReview = await db('reviews').where({ reviewId });
        if (!(selectUpdatedReview)) return null;

        return selectUpdatedReview;
    }
    catch (err) {
        return err.message;
    }
}

const deleteReview = async (reviewId) => {
    try{
        
        const selectedReview = await db('reviews').where({ reviewId }).first();
        if (!(selectedReview)) return null;

        const deletedReview = await db('reviews').where({ reviewId }).del();
        if (!(deletedReview)) return null;
        
        return selectedReview;

    }
    catch (err) {
        return err.message;
    }
}

const getReviews = () => {
    return db('reviews');
}

const getReviewById = async (reviewId) => {
  try{
      const review = await db('reviews')
        .where({ reviewId })
        .join('users as authors', 'authors.userId', '=', 'reviews.authorId')
        .join('users as recipients', 'recipients.userId', '=', 'reviews.recipientId')
        .join('jobs', 'jobs.jobId', '=', 'reviews.jobId')
        .select('reviews.reviewId',
            'authors.username as authorUsername',
            'recipients.username as recipientUsername',
            'jobs.jobTitle',
            'reviews.rating',
            'reviews.message')
        .first();
      return review;
  }
  catch {
      return null;
  }
}

const getReviewsByUserId = async (userId) => {
    try {
        const authoredReviews = await db('reviews')
            .where({ authorId: userId })
            .join('users as authors', 'authors.userId', '=', 'reviews.authorId')
            .join('users as recipients', 'recipients.userId', '=', 'reviews.recipientId')
            .join('jobs', 'jobs.jobId', '=', 'reviews.jobId')
            .select('reviews.reviewId',
                'authors.username as authorUsername',
                'recipients.username as recipientUsername',
                'jobs.jobTitle',
                'reviews.rating',
                'reviews.message');
        const receivedReviews = await db('reviews')
            .where({ recipientId: userId })
            .join('users as authors', 'authors.userId', '=', 'reviews.authorId')
            .join('users as recipients', 'recipients.userId', '=', 'reviews.recipientId')
            .join('jobs', 'jobs.jobId', '=', 'reviews.jobId')
            .select('reviews.reviewId',
                'authors.username as authorUsername',
                'recipients.username as recipientUsername',
                'jobs.jobTitle',
                'reviews.rating',
                'reviews.message');
        return authoredReviews.concat(receivedReviews);
    } catch {
        return null;
    }
}

const getReviewsByAuthorId = async (authorId) => {
    try{
        const reviews = await db('reviews')
            .where({ authorId })
            .join('users as authors', 'authors.userId', '=', 'reviews.authorId')
            .join('users as recipients', 'recipients.userId', '=', 'reviews.recipientId')
            .join('jobs', 'jobs.jobId', '=', 'reviews.jobId')
            .select('reviews.reviewId',
                'authors.username as authorUsername',
                'recipients.username as recipientUsername',
                'jobs.jobTitle',
                'reviews.rating',
                'reviews.message');
        return reviews;
    }
    catch {
        return null;
    }
}

const getReviewsByRecipientId = async (recipientId) => {
    try{
        const reviews = await db('reviews')
            .where({ recipientId })
            .join('users as authors', 'authors.userId', '=', 'reviews.authorId')
            .join('users as recipients', 'recipients.userId', '=', 'reviews.recipientId')
            .join('jobs', 'jobs.jobId', '=', 'reviews.jobId')
            .select('reviews.reviewId',
                'authors.username as authorUsername',
                'recipients.username as recipientUsername',
                'jobs.jobTitle',
                'reviews.rating',
                'reviews.message');
        return reviews;
    }
    catch {
        return null;
    }
}

const getReviewsByJobId = async (jobId) => {
    try{
        const reviews = await db('reviews')
            .where({ jobId })
            .join('users as authors', 'authors.userId', '=', 'reviews.authorId')
            .join('users as recipients', 'recipients.userId', '=', 'reviews.recipientId')
            .join('jobs', 'jobs.jobId', '=', 'reviews.jobId')
            .select('reviews.reviewId',
                'authors.username as authorUsername',
                'recipients.username as recipientUsername',
                'jobs.jobTitle',
                'reviews.rating',
                'reviews.message');
        return reviews;
    }
    catch {
        return null;
    }
}

module.exports = {
    addReview,
    updateReview,
    deleteReview,
    getReviews,
    getReviewById,
    getReviewsByUserId,
    getReviewsByAuthorId,
    getReviewsByRecipientId,
    getReviewsByJobId
}