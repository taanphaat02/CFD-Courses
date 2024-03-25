import React from "react";

const Input = ({ label, required, error, renderInput, ...restProps }) => {
  return (
    <div className="form-group">
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({ ...restProps, error }) || (
        <input
          type="text"
          className={`form__input ${error ? "formerror" : ""}`}
          {...restProps}
        />
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
