import { createContext, useState, useEffect, useContext } from 'react';

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.aviationstack.com/v1/flights?access_key=8f810532e3425aa5eace6602b66198a4')
      .then((res) => res.json())
      .then((data) => setFlights(data.data || []))
      .catch((error) => console.error("Errore nel fetch dei voli:", error));
  }, []);


  useEffect(() => {
    fetch('http://localhost:3001/favorites')
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data.favorites || []);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Errore nel caricamento dei preferiti:", error);
        setLoading(false);
      });
  }, []);

  const addToFavorites = (flight) => {
    const updatedFavorites = [...favorites, flight];
    setFavorites(updatedFavorites);

    fetch('http://localhost:3001/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorites: updatedFavorites }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Aggiunto ai preferiti", data))
      .catch((error) => console.error("Errore nel salvataggio dei preferiti", error));
  };

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((flight) => flight.id !== id);
    setFavorites(updatedFavorites);

    fetch('http://localhost:3001/favorites', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorites: updatedFavorites }),
    })
      .then(() => console.log(`Volo con ID ${id} rimosso dai preferiti`))
      .catch((error) => console.error("Errore", error));
  };

  return (
    <FlightContext.Provider
      value={{
        flights,
        favorites,
        addToFavorites,
        removeFromFavorites,
        loading,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlights = () => {
  return useContext(FlightContext);
};

export default FlightContext;
