import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Preferito from "@/icons/Preferito";
import { useFlights } from "@/context/FlightContext";

const Homepage = () => {
  const { flights, addToFavorites } = useFlights();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    const result = flights.filter((flight) => {
      const flightName = flight.flight?.iata || "";
      return flightName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (result.length === 0) {
      setErrorMessage("Nessun volo trovato. Visualizza gli altri voli.");
    } else {
      setErrorMessage("");
    }

    setFilteredFlights(result);
  };

  const flightsToDisplay = filteredFlights.length > 0 ? filteredFlights : flights;

  return (
    <div>
      <div className="w-3/4 mx-auto text-center">
        <div className="flex gap-2 mt-12 mx-auto items-center justify-center">
          <Input
            className="w-96"
            type="text"
            placeholder="Cerca un volo"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch}>Cerca</Button>
        </div>

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        <div className="mt-12 grid grid-cols-3 gap-4 justify-center">
          {flightsToDisplay.length > 0 ? (
            flightsToDisplay.map((flight, index) => (
              <Card key={index} className="p-6">
                <CardHeader className="flex flex-row justify-between">
                  <CardTitle className="text-lg">{flight.flight?.iata || "Non definito"}</CardTitle>
                  <Button className="h-8 w-5 bg-red-500 text-xl" onClick={() => addToFavorites(flight)}>
                    <Preferito />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-3">
                    <CardDescription>Partenza:</CardDescription>
                    <CardDescription className="font-semibold text-black">
                      {flight.departure?.airport || "Non definito"}
                    </CardDescription>
                  </div>
                  <div className="flex justify-between mb-3">
                    <CardDescription>Arrivo:</CardDescription>
                    <CardDescription className="font-semibold text-black">
                      {flight.arrival?.airport || "Non definito"}
                    </CardDescription>
                  </div>
                  <div className="flex justify-between">
                    <CardDescription>Stato:</CardDescription>
                    <CardDescription className="font-semibold text-black">
                      {flight.flight_status || "Non definito"}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">Caricamento in corso</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
