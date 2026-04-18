function ReviewItem({ review }) {
  return (
    <div className="review-item">
      <div className="review-header">
        <span className="initial">{review.init}</span>
        <span className="name">{review.name}</span>
        <span className="date">{review.date}</span>
        <div className="stars">{'⭐'.repeat(review.stars)}</div>
      </div>
      <p className="review-text">{review.text}</p>
      <div className="review-criteria">
        <div className="positive">
          {review.critPos.map((crit, i) => <span key={i} className="crit-pos">+{crit}</span>)}
        </div>
        <div className="negative">
          {review.critNeg.map((crit, i) => <span key={i} className="crit-neg">-{crit}</span>)}
        </div>
      </div>
      {review.imgs.length > 0 && (
        <div className="review-images">
          {review.imgs.map((img, i) => <img key={i} src={img} alt="Review" />)}
        </div>
      )}
    </div>
  );
}

export default ReviewItem;