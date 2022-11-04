const Clock = ({ time, onTimeFocus, onTimeChange, onTimeBlur, label }) => {
  return (
    <div className="form-floating">
      <input
        type="text"
        className="form-control mt-1"
        placeholder="time"
        data-testid={`id-clock-${label}`}
        value={time}
        onFocus={onTimeFocus}
        onChange={onTimeChange}
        onBlur={onTimeBlur}
      />
      <label>{label}</label>
    </div>
  );
};

export default Clock;
