import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

type RoutingControlType = L.Routing.Control;

const getStoredPoints = () => {
  const pointA = localStorage.getItem("point_a") || "";
  const pointB = localStorage.getItem("point_b") || "";
  return { pointA, pointB };
};

const { pointA, pointB } = getStoredPoints();

const CustomRouting: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    try {
      const routingControl: RoutingControlType = L.Routing.control({
        waypoints: [
          pointA
        ? L.latLng(...(pointA.split(",").map(Number) as [number, number]))
        : L.latLng(0, 0),
          pointB
        ? L.latLng(...(pointB.split(",").map(Number) as [number, number]))
        : L.latLng(0, 0),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "#E3A817", weight: 4 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0,
        },
        show: true,
        showAlternatives: true,
      }).addTo(map);

      return () => {
        if (map && routingControl) {
          map.removeControl(routingControl);
        }
      };
    } catch (error) {
      console.error("Error setting up routing:", error);
    }
  }, [map]);

  return null;
};

const saveToLocalStorage = (a: string, b: string) => {
  localStorage.setItem("point_a", a);
  localStorage.setItem("point_b", b);
};

interface LocationData {
  _id?: string;
  location_name: string;
  latitude: string;
  longtitude: string;
}

const SchoolMap: React.FC = () => {
  const [point_a, set_point_a] = useState("");
  const [point_b, set_point_b] = useState("");

  const [locations, setLocations] = useState<LocationData[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const locationResponse = await fetch(
          "http://localhost:6900/api/location"
        );

        const locationData = await locationResponse.json();

        setLocations(locationData.location || []);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <>
      <div className="flex gap-2 p-4">
        <form
          className="flex flex-col md:flex-row w-full gap-2 justify-center items-center"
          onSubmit={(e) => {
            saveToLocalStorage(point_a, point_b);
          }}
        >
          <div>
            <label htmlFor="from" className="mr-2">
              From:
            </label>
            <select
              name="from"
              id="from"
              className="p-2 border rounded"
              value={point_a}
              onChange={(e) => set_point_a(e.target.value)}
            >
              <option value="">Select starting point</option>
              {locations.map((location) => (
                <option
                  key={location._id}
                  value={`${location.latitude},${location.longtitude}`}
                >
                  {location.location_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="to" className="mr-2">
              To:
            </label>
            <select
              name="to"
              id="to"
              className="p-2 border rounded"
              value={point_b}
              onChange={(e) => set_point_b(e.target.value)}
            >
              <option value="">Select destination</option>
              {locations.map((location) => (
                <option
                  key={location._id}
                  value={`${location.latitude},${location.longtitude}`}
                  disabled={
                    point_a === `${location.latitude},${location.longtitude}`
                  }
                >
                  {location.location_name}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="cursor-pointer">
            Go
          </Button>
        </form>
      </div>
      <MapContainer
        center={[13.45399, 121.84468]}
        zoom={18}
        style={{ width: "100%" }}
        className="h-screen"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxNativeZoom={19}
          maxZoom={22}
        />
        <CustomRouting />
      </MapContainer>
    </>
  );
};

export default SchoolMap;
