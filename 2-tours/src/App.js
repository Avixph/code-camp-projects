import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const toursUrl = "https://course-api.com/react-tours-project";
function App() {
  // const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState(undefined);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    // setLoading(true);
    try {
      const response = await fetch(toursUrl);
      const tours = await response.json();
      console.log(tours);
      // setLoading(false);
      setTours(tours);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (!tours) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main className="title">
        <h2>no tours available</h2>
        <button className="btn" onClick={fetchTours}>
          ↺
        </button>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
