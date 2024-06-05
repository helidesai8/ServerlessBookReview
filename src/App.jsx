import React from 'react';
import AddReviewForm from '../components/AddReviewForm';
import UploadImageForm from '../components/UploadImageForm';
import RatingForm from '../components/RatingForm';
import AddCommentForm from '../components/AddCommentForm';
import ReviewList from '../components/ReviewList';
import './index.css';

const App = () => {
    return (
        <div className="container">
            <h1>Book Review Platform</h1>
            <div className="content">
                <div className="reviews">
                    <ReviewList />
                </div>
                <div className="forms">
                    <AddReviewForm />
                    <UploadImageForm />
                    <RatingForm />
                    <AddCommentForm />
                </div>
            </div>
        </div>
    );
};

export default App;
