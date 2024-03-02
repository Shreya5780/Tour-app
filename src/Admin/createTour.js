import { createContext, useState, useContext } from 'react';
import { BASE_URL } from '../utils/config';

const TourContext = createContext();

export const useTourContext = () => useContext(TourContext);

export const TourProvider = ({ children }) => {
  const [tours, setTours] = useState([]);
  
  const createTour = async (tourData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tours/createTour`, {
        method: 'POST',
        // Remove 'Content-Type' header as it will be automatically set by FormData
        body: tourData, // Send FormData object directly
      });

      const data = await response.json();
      if (data.success) {
        setTours([...tours, data.data]); // Assuming data.data contains the newly created tour
        // Handle success as needed
      } else {
        // Handle failure
        console.log("failed to success")
      }
    } catch (error) {
      console.error('Error creating tour:', error);
      // Handle error
    }
  };

  // const editTour = async (tourId, updatedTourData) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/api/tours/updateTour/${tourId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(updatedTourData)
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       const updatedTours = tours.map(tour => {
  //         if (tour._id === tourId) {
  //           return data.data; // Update the tour with the new data
  //         }
  //         return tour;
  //       });
  //       setTours(updatedTours);
  //       // Handle success as needed
  //     } else {
  //       // Handle failure
  //       console.log("Failed to update tour");
  //     }
  //   } catch (error) {
  //     console.error('Error updating tour:', error);
  //     // Handle error
  //   }
  // };

  return (
    <TourContext.Provider value={{ tours, createTour }}>
      {children}
    </TourContext.Provider>
  );
};

export { TourContext };
