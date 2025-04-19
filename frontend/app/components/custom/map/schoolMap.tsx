import React from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { MapPin } from "lucide-react";

type RoutingControlType = L.Routing.Control;

const getStoredPoints = () => {
  const pointA = localStorage.getItem("point_a") || "";
  const pointB = localStorage.getItem("point_b") || "";
  return { pointA, pointB };
};

const { pointA, pointB } = getStoredPoints();

const createCustomIcon = (color: string) => {
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });
};

const redIcon = createCustomIcon("red");
const yellowIcon = createCustomIcon("yellow");

const CustomRouting: React.FC = () => {
  const map = useMap();

  const startPoint = pointA
    ? L.latLng(...(pointA.split(",").map(Number) as [number, number]))
    : null;
  const endPoint = pointB
    ? L.latLng(...(pointB.split(",").map(Number) as [number, number]))
    : null;

  useEffect(() => {
    if (!map) return;
    try {
      const routingControl: RoutingControlType = L.Routing.control({
        waypoints: [startPoint || L.latLng(0, 0), endPoint || L.latLng(0, 0)],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "#E3A817", weight: 4 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0,
        },
        show: true,
        showAlternatives: true,
        createMarker: () => {
          return null;
        }, // Disable default markers
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

  return (
    <>
      {startPoint && <Marker position={startPoint} icon={redIcon} />}
      {endPoint && <Marker position={endPoint} icon={yellowIcon} />}
    </>
  );
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
          <div className="flex items-center">
            <label htmlFor="from" className="mr-2">
              <div className="flex gap-2">
                <MapPin className=" fill-red-600" />
                From:
              </div>
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
          <div className="flex items-center">
            <label htmlFor="to" className="mr-2">
              <div className="flex gap-2">
                <MapPin className=" fill-yellow-300" /> To:
              </div>
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
