function StarRating({ rating, onRatingChange }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={star <= rating ? 'star filled' : 'star'}
          onClick={() => onRatingChange(star)}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

export default StarRating;