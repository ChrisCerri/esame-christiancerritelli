import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Trash from "@/icons/Trash";
import { useFlights } from "@/context/FlightContext";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFlights();

  return (
    <div className="w-3/4 mx-auto text-center">
      <div className="mt-12 mx-auto items-center justify-center">
        <p className="text-xl font-bold">I Tuoi Voli Preferiti</p>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 justify-center">
        {favorites.length > 0 ? (
          favorites.map((flight, index) => (
            <Card key={index} className="p-6">
              <CardHeader className="flex flex-row justify-between">
                <CardTitle className="text-lg">
                  {flight.airline?.name} {flight.flight?.number || "N/A"}
                </CardTitle>
                <Button
                  className="h-8 w-5 bg-red-500 text-xl"
                  onClick={() => removeFromFavorites(flight.id)}
                >
                  <Trash />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-3">
                  <CardDescription>Partenza:</CardDescription>
                  <CardDescription className="font-semibold text-black">
                    {flight.departure?.airport || "Sconosciuto"}
                  </CardDescription>
                </div>
                <div className="flex justify-between mb-3">
                  <CardDescription>Arrivo:</CardDescription>
                  <CardDescription className="font-semibold text-black">
                    {flight.arrival?.airport || "Sconosciuto"}
                  </CardDescription>
                </div>
                <div className="flex justify-between">
                  <CardDescription>Stato:</CardDescription>
                  <CardDescription className="font-semibold text-black">
                    {flight.flight_status || "Sconosciuto"}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">Caricamento voli</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
