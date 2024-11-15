import React from 'react';
import CollegeCard from './CollegeCard';

const CollegeList = ({ colleges }) => {
  if (colleges.length === 0) {
    return <p className="text-center text-gray-500 mt-5">No colleges found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  );
};

export default CollegeList;
