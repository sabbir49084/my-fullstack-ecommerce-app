import React from "react";

const StatusDropdown = ({ currentStatus, onChange, options }) => {
    return (
        <select
            value={currentStatus}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-white shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
        >
            {options.map(status => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
};

export default StatusDropdown;