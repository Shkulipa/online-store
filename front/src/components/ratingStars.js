import React from 'react';
import { Rating } from '@material-ui/lab';

const RatingStars = ({ratingChanged, ratingVal, isAuth, isAccessRating}) => {
    if(isAuth && isAccessRating) {
        return (
            <Rating
                name="simple-controlled"
                onChange={(event, newValue) => {
                    ratingChanged(newValue);
                }}
                precision={1}
                size="large"
            />
        )
    } else {
        return (
            <Rating
                name="read-only"
                value={ratingVal}
                readOnly
                size="large"
            />
        )
    }
};

export default RatingStars;
