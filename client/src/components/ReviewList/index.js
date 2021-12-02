import React from 'react';

const ReviewList = ({ reviews = [] }) => {
if (!reviews.length) {
    return <h3>Be the first to review!</h3>;
}

return (
    <>

    <div className="">
        {reviews &&
        reviews.map((review) => (

            <div key={review._id} className="">

            <div className="container">
                    <div className="columns">
                        <div className="column is-half is-offset-one-quarter">
                            <div className="has-text-left">
                                Review by {review.reviewAuthor}: {' '}
                            </div>
                            <div className="card has-background-grey-lighter">
                                <div className="card-content">
                                {review.reviewText}
                                </div>
                            </div>
                            <div className="has-text-right">
                                {review.createdAt}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    </>
  );
};

export default ReviewList;
