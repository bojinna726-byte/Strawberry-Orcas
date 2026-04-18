export default function ReviewItem({ review }) {
  const stars = '⭐'.repeat(review.stars) + '☆'.repeat(5 - review.stars)

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)',
      padding: '13px 14px',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'var(--blue-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: 'var(--blue)', flexShrink: 0,
        }}>
          {review.init}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>{review.name}</div>
          <div style={{ color: '#f59e0b', fontSize: 13, letterSpacing: 1 }} aria-label={`${review.stars} out of 5 stars`}>
            {stars}
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 'auto', fontWeight: 500 }}>{review.date}</div>
      </div>

      {/* Text */}
      <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{review.text}</div>

      {/* Criteria tags */}
      {((review.critPos?.length > 0) || (review.critNeg?.length > 0)) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
          {(review.critPos || []).map((c) => (
            <span key={c} style={{
              background: 'var(--green-light)', color: 'var(--green-dark)',
              padding: '2px 7px', borderRadius: 'var(--r-full)',
              fontSize: 10, fontWeight: 600,
            }}>+ {c}</span>
          ))}
          {(review.critNeg || []).map((c) => (
            <span key={c} style={{
              background: 'var(--red-light)', color: 'var(--red)',
              padding: '2px 7px', borderRadius: 'var(--r-full)',
              fontSize: 10, fontWeight: 600,
            }}>– {c}</span>
          ))}
        </div>
      )}

      {/* Photos */}
      {review.imgs?.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginTop: 9, flexWrap: 'wrap' }}>
          {review.imgs.map((src, i) => (
            src.startsWith('data:') || src.startsWith('http') ? (
              <img
                key={i}
                src={src}
                alt={`Review photo ${i + 1}`}
                style={{ width: 60, height: 48, borderRadius: 'var(--r-sm)', objectFit: 'cover', border: '1px solid var(--border)', cursor: 'pointer' }}
              />
            ) : (
              <div key={i} style={{
                width: 58, height: 46, borderRadius: 'var(--r-sm)',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, cursor: 'pointer',
              }}>{src}</div>
            )
          ))}
        </div>
      )}
    </div>
  )
}
