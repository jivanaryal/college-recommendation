import React, { useState } from 'react';

const FilterForm = ({ setFilters }) => {
  const [formData, setFormData] = useState({
    cgpa: '',
    tuition_fees: '',
    location: '',
    facilities: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="my-5 p-5 border rounded-lg shadow-md bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block">Minimum CGPA</label>
          <input
            type="number"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            placeholder="Enter CGPA"
          />
        </div>
        <div>
          <label className="block">Maximum Tuition Fees</label>
          <input
            type="number"
            name="tuition_fees"
            value={formData.tuition_fees}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            placeholder="Enter Fees"
          />
        </div>
        <div>
          <label className="block">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            placeholder="Enter Location"
          />
        </div>
        <div>
          <label className="block">Facilities</label>
          <input
            type="text"
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            placeholder="Enter Facilities"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;
