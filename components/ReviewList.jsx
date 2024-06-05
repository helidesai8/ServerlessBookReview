// src/components/ReviewList.jsx
import React, { useState, useEffect } from 'react';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [comments, setComments] = useState({});

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('https://tvmvgu4xa7rigens5pm7difvxe0dfkgu.lambda-url.us-east-1.on.aws/');
                const data = await response.json();
                setReviews(data);

                // Fetch comments for each review
                data.forEach(async (review) => {
                    if (review.ReviewID) {
                        try {
                            const commentsResponse = await fetch(`https://w5h2x7qksgan4uqspwdfjwux6a0skjlc.lambda-url.us-east-1.on.aws/?review_id=${review.ReviewID}`);
                            const commentsData = await commentsResponse.json();
                            setComments(prevComments => ({
                                ...prevComments,
                                [review.ReviewID]: Array.isArray(commentsData) ? commentsData : []
                            }));
                        } catch (error) {
                            console.error(`Error fetching comments for review ${review.ReviewID}:`, error);
                        }
                    }
                });
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div>
            <h2>Book Reviews</h2>
            <ul>
                {reviews.map(review => (
                    <li key={review.ReviewID}>
                        <h3>{review.BookTitle}</h3>
                        <p><strong>Review ID:</strong> {review.ReviewID}</p>
                        <p><strong>Author:</strong> {review.Author}</p>
                        <p><strong>Review:</strong> {review.ReviewText}</p>
                        <p><strong>Rating:</strong> {review.Rating}</p>
                        {review.ImageURL && <img src={review.ImageURL} alt={review.BookTitle} style={{ maxWidth: '200px' }} />}
                        <h4>Comments:</h4>
                        <ul>
                            {comments[review.ReviewID] && comments[review.ReviewID].map(comment => (
                                <li key={comment.CommentId}>
                                    <p>{comment.CommentText}</p>
                                    <small><em>{comment.Timestamp}</em></small>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
