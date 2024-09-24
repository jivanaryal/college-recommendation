import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleCollegePage = () => {
  const { id } = useParams(); // Get the college ID from the URL
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/college/${id}`);
        setCollege(response.data);
      } catch (error) {
        console.error('Error fetching college:', error);
        setError('Failed to fetch college details.'); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>; // Handle error state
  }

  if (!college) {
    return <div className="text-center mt-10">No college found.</div>; // Handle case where no college is found
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">{college.name}</h1>
      <div className="bg-white  rounded-lg shadow-lg overflow-hidden">
        <img 
          src={`http://localhost:5000${college.photos}`} 
          alt={college.name} 
          className="w-full h-[90vh] overflow-hidden object-cover" 
        />
        <div className="p-6">
          <CollegeDetail label="Location" value={college.location} />
          <CollegeDetail label="Minimum CGPA" value={college.min_cgpa} />
          <CollegeDetail label="Tuition Fees" value={`$${college.tuition_fees}`} />
          <CollegeDetail label="Facilities" value={college.facilities} />
          <CollegeDetail label="Description" value={college.description} />
        </div>
      </div>
    </div>
  );
};

// Reusable component for displaying college details
const CollegeDetail = ({ label, value }) => (
  <p className="text-gray-700 mb-4">
    <strong>{label}:</strong> {value}
  </p>
);

export default SingleCollegePage;
