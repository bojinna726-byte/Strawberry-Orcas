function CriteriaButtons({ positiveCriteria, negativeCriteria, selectedPos, selectedNeg, onPosChange, onNegChange }) {
  const togglePos = (crit) => {
    const newSelected = selectedPos.includes(crit)
      ? selectedPos.filter(c => c !== crit)
      : [...selectedPos, crit];
    onPosChange(newSelected);
  };

  const toggleNeg = (crit) => {
    const newSelected = selectedNeg.includes(crit)
      ? selectedNeg.filter(c => c !== crit)
      : [...selectedNeg, crit];
    onNegChange(newSelected);
  };

  return (
    <div className="criteria-buttons">
      <div className="positive-criteria">
        <h4>Positive Features</h4>
        {positiveCriteria.map(crit => (
          <button
            key={crit}
            className={selectedPos.includes(crit) ? 'selected' : ''}
            onClick={() => togglePos(crit)}
          >
            {crit}
          </button>
        ))}
      </div>
      <div className="negative-criteria">
        <h4>Barriers</h4>
        {negativeCriteria.map(crit => (
          <button
            key={crit}
            className={selectedNeg.includes(crit) ? 'selected' : ''}
            onClick={() => toggleNeg(crit)}
          >
            {crit}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CriteriaButtons;