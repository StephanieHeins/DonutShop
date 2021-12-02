import React from 'react';

const ReviewList = ({ reviews = [] }) => {
if (!reviews.length) {
    return <h3>Be the first to review!</h3>;
}

return (
    <>
    <h3 className="" style={{}}>
        Reviews
    </h3>
    <div className="">
        {reviews &&
        reviews.map((review) => (
            <div key={review._id} className="">
            <div className="">
                <h5 className="">
                {review.reviewAuthor}: {' '}
                    <span style={{}}>
                        Date of Review: {review.reviewDate}
                    </span>
                </h5>
                <p className="">{review.reviewText}</p>
            </div>
            </div>
        ))}
    </div>
    </>
  );
};

export default ReviewList;
