import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('lowToHigh');

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/colleges');
        console.log(response.data);
        setColleges(response.data);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    fetchColleges();
  }, []);

  // Filter colleges based on search term
  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered colleges based on selected filter option
  const sortedColleges = filteredColleges.sort((a, b) => {
    if (filter === 'lowToHigh') {
      return a.tuition_fees - b.tuition_fees;
    } else {
      return b.tuition_fees - a.tuition_fees;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">College Recommendation System</h1>
      <h2 className="text-xl font-semibold text-center mb-4">Colleges List</h2>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search colleges"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Filter Select */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="lowToHigh">Fee: Low to High</option>
          <option value="highToLow">Fee: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedColleges.map(college => (
          <>
      <Link to={`colleges/${college.id}`}>    <div key={college.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={`http://localhost:5000${college.photos}`} alt={college.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
              <p className="text-gray-600"><strong>Location:</strong> {college.location}</p>
              <p className="text-gray-600"><strong>Minimum CGPA:</strong> {college.min_cgpa}</p>
              <p className="text-gray-600"><strong>Tuition Fees:</strong> ${college.tuition_fees}</p>
              <p className="text-gray-600"><strong>Facilities:</strong> {college.facilities}</p>
            </div>
          </div>
            </Link>
            </>
        ))}
      </div>
    </div>
  );
};

export default Home;
