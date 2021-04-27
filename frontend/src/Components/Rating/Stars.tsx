import React, { useState, useEffect } from 'react';

const Stars = ({
  rating,
  color = '#f8e825',
}: {
  rating: number;
  color?: string;
}) => {
  const [stars, setStars] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const createStarsIcons = () => {
      const NUM_STARS = 5;
      const arrayOfStars: Array<JSX.Element> = [];

      for (let i = 0; i < NUM_STARS; i++) {
        const COMPLETE_STAR = i + 1;
        const HALF_STAR = i + 0.5;
        arrayOfStars.push(
          <span key={i}>
            <i
              style={{ color }}
              className={
                rating >= COMPLETE_STAR
                  ? 'fas fa-star'
                  : rating >= HALF_STAR
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
          </span>
        );
      }
      setStars(<>{arrayOfStars}</>);
    };

    createStarsIcons();
  }, [rating, color]);

  return stars;
};

export default Stars;
