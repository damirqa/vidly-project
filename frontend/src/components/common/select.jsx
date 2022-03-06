import React from 'react';

const Select = ({name, label, value, options, error, onChange}) => {

    const createKey = (option) => {
        return option.value + option.label;
    }

    const setSelected = (option) => {
        if (!option.value) return "";
        if (option.value === value) return true;
    }

    return (
        <div className="form-group mb-3">
            <label htmlFor={name} className='form-label'>{label}</label>
            <select name={name} id={name} onChange={onChange} value={value} className="form-select">
                <option value="" disabled>Open this select menu</option>
                {options.map(option => (
                    <option key={option._id} value={option._id}>{option.name}</option>
                ))}
            </select>
            {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    );
}
 
export default Select;