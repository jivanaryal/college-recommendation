import React from 'react';

const CollegeCard = ({ college }) => {
  return (
    <div className="border rounded-lg shadow-md p-5">
      <img
        src={`http://localhost:5000/uploads/${college.photos}`}
        alt={college.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-3">{college.name}</h2>
      <p className="text-gray-600">{college.location}</p>
      <p className="text-gray-500 mt-2">Tuition Fees: ${college.tuition_fees}</p>
      <p className="text-gray-500 mt-2">Minimum CGPA: {college.min_cgpa}</p>
      <p className="text-gray-500 mt-2">Facilities: {college.facilities}</p>
    </div>
  );
};

export default CollegeCard;
