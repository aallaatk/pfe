import { useState, useEffect } from 'react';
import axios from 'axios';
import Tour from '../Components/Tour';
import { Link } from 'react-router-dom';

interface NewTourInfo {
  tourname: string;
  creator: string;
  date: Date | string;
  price: number;
  description?: string;
  attendees?: number;
  location?: string;
  duration?: string;
  imageUrl?: string;
  _id: string;
}

function Tours(): JSX.Element {
  const [tours, setTours] = useState<NewTourInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    location: string[];
    minPrice: string;
    maxPrice: string;
    minAttendees: string;
    maxAttendees: string;
    startDate: string;
    endDate: string;
  }>({
    location: [],
    minPrice: '',
    maxPrice: '',
    minAttendees: '',
    maxAttendees: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get<NewTourInfo[]>('http://localhost:3000/api/tours');

        if (Array.isArray(response.data)) {
          // Map the response data to include the id field and setTours
          const toursWithId = response.data.map((tour) => ({
            ...tour,
            id: tour._id, // Assign the id from the _id field of each tour
          }));
          setTours(toursWithId);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const applyFilters = (tour: NewTourInfo) => {
    const {
      location,
      minPrice,
      maxPrice,
      minAttendees,
      maxAttendees,
      startDate,
      endDate,
    } = filters;

    const matchesLocation =
      location.length === 0 || location.includes(tour.location ?? '');

    const matchesPrice =
      (minPrice === '' || tour.price >= Number(minPrice)) &&
      (maxPrice === '' || tour.price <= Number(maxPrice));
    const matchesAttendees =
      (minAttendees === '' ||
        (tour.attendees !== undefined && tour.attendees >= Number(minAttendees))) &&
      (maxAttendees === '' ||
        (tour.attendees !== undefined && tour.attendees <= Number(maxAttendees)));
    const matchesDate =
      (startDate === '' || new Date(tour.date) >= new Date(startDate)) &&
      (endDate === '' || new Date(tour.date) <= new Date(endDate));

    const matchesSearch = tour.tourname.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLocation && matchesPrice && matchesAttendees && matchesDate && matchesSearch;
  };

  const filteredTours = tours.filter(applyFilters);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Find Your Adventure</h2>
      <div className="mb-4 d-flex justify-content-center align-items-center">
        {/* Search input */}
        <input
          type="text"
          className="form-control mb-3 w-50 "
          placeholder="Search by tour name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Filter button */}
        <button
          className="btn btn-primary mb-3 ms-3"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      {/* Filter options (conditionally rendered based on showFilters state) */}
      {showFilters && (
        <div className="mb-4">
          {/* Location filter */}
          <div className="mb-3">
            <label htmlFor="locationFilter" className="form-label">
              Location
            </label>
            <select
              id="locationFilter"
              className="form-select"
              multiple
              value={filters.location}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  location: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
            >
              {['Beach', 'Sahara', 'Madina', 'Souk'].map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          {/* Price range filter */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="minPrice" className="form-label">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                className="form-control"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                placeholder="Min"
              />
            </div>
            <div className="col">
              <label htmlFor="maxPrice" className="form-label">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                className="form-control"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                placeholder="Max"
              />
            </div>
          </div>
          {/* Attendees filter */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="minAttendees" className="form-label">
                Min Attendees
              </label>
              <input
                type="number"
                id="minAttendees"
                className="form-control"
                value={filters.minAttendees}
                onChange={(e) => setFilters({ ...filters, minAttendees: e.target.value })}
                placeholder="Min"
              />
            </div>
            <div className="col">
              <label htmlFor="maxAttendees" className="form-label">
                Max Attendees
              </label>
              <input
                type="number"
                id="maxAttendees"
                className="form-control"
                value={filters.maxAttendees}
                onChange={(e) => setFilters({ ...filters, maxAttendees: e.target.value })}
                placeholder="Max"
              />
            </div>
          </div>
          {/* Date range filter */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="form-control"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>
            <div className="col">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="form-control"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredTours.length > 0 ? (
        <div className="row">
          {filteredTours.map((tour, index) => (
            <div className="col-md-4 mb-4 mt-5" key={index}>
              {tour.imageUrl && (
                <Tour
                  key={tour._id}
                  tourname={tour.tourname}
                  creator={tour.creator}
                  date={tour.date}
                  price={tour.price}
                  imageUrl={tour.imageUrl}
                  id={tour._id}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">
          No tours available? <br />
          <Link to="/login">Create your own adventure</Link>
        </p>
      )}
    </div>
  );
}

export default Tours;
