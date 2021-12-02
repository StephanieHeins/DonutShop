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
    <h4>What are your thoughts on this product?</h4>

    {Auth.loggedIn() ? (
    <>
        <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
        >
        <div className="col-12 col-lg-9">
            <textarea
            name="commentText"
            placeholder="Add your review..."
            value={reviewText}
            className="form-input w-100"
            style={{ lineHeight: '1.5', resize: 'vertical' }}
            onChange={handleChange}
            ></textarea>
        </div>

        <div className="col-12 col-lg-3">
            <button className="btn btn-primary btn-block py-3" type="submit">
            Add Review
            </button>
        </div>
        </form>
    </>
    ) : (
    <p>
        You need to be logged add your review. Please{' '}
        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
    </p>
    )}
</div>
);
};

export default ReviewForm;
