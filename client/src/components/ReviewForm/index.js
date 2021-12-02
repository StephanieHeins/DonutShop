import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_REVIEW } from '../../utils/mutations';

import Auth from '../../utils/auth';

const ReviewForm = ({ productId }) => {
const [reviewText, setReviewText] = useState('');
const [characterCount, setCharacterCount] = useState(0);

const [addReview, { error }] = useMutation(ADD_REVIEW);

const handleFormSubmit = async (event) => {
event.preventDefault();

try {
    const { data } = await addReview({
    variables: {
        productId,
        reviewText,
        reviewAuthor: Auth.getProfile().data.username,
    },
    });

    setReviewText('');
} catch (err) {
    console.error(err);
}
};

const handleChange = (event) => {
const { name, value } = event.target;

if (name === 'reviewText' && value.length <= 280) {
    setReviewText(value);
    setCharacterCount(value.length);
}
};

return (
<div>

    {Auth.loggedIn() ? (
    <>
    <div className="container">
        <div className="columns">
            <div className="column is-half is-offset-one-quarter">
                <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
                >
                    <label>
                        What are your thoughts on this item? 
                    </label>
                    <textarea 
                        name="commentText"
                        className="textarea is-primary" 
                        placeholder="Delicious!"
                        value={reviewText}
                        style={{ lineHeight: '1.5', resize: 'vertical' }}
                        onChange={handleChange}
                        ></textarea>
                    <button className="button is-primary my-4" type="submit">
                    Add Review
                    </button>
                </form>
            </div>
        </div>
    </div>
    </>
    ) : (
    <div className="container">
        <div className="columns">
            <div className="column is-half is-offset-one-quarter">
            <p>
            You need to be logged in add your review. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </p>
            </div>
        </div>
    </div>
    )}
</div>
);
};

export default ReviewForm;
