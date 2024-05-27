import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

// Interface for Tour Data
interface TourData {
  date: string;
  // Add other properties as needed
}

// Event type imported from react-big-calendar types
import type { Event } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [tourData, setTourData] = useState<TourData[]>([]);

  useEffect(() => {
    fetchTourData();
  }, []);

  const fetchTourData = async () => {
    try {
      const { data } = await axios.get<TourData[]>('/api/tours'); // Type assertion for response data
      setTourData(data);
    } catch (error) {
      console.error('Error fetching tour data:', error);
    }
  };

  const organizeTourData = (): Event[] => {
    if (tourData.length === 0) {
      return [];
    }

    const events = tourData.map((tour) => ({
      title: 'Tour',
      start: moment(tour.date).toDate(), // Parse date string using moment and convert to Date object
      end: moment(tour.date).add(1, 'hour').toDate(), // Add 1 hour duration (optional)
    }));
    return events;
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={organizeTourData()}
        startAccessor="start"
        endAccessor="end"
        views={['month']}
        onSelectEvent={(event) => console.log(event)}
      />
    </div>
  );
};

export default CalendarComponent;
