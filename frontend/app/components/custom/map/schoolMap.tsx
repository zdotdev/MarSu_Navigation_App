import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";

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
          styles: [{ color: "#6FA1EC", weight: 4 }],
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

const SchoolMap: React.FC = () => {
  const [point_a, set_point_a] = useState("");
  const [point_b, set_point_b] = useState("");
  return (
    <>
      <div className="flex gap-2 p-4">
        <form
          className="flex flex-col gap-2 items-center"
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
              <option value="13.453218,121.844443">Feature 1 start</option>
              <option value="13.453376,121.844558">
                Feature 1 end/2 start
              </option>
              <option value="13.453886,121.843790">
                Feature 2 end/3,4,6 start
              </option>
              <option value="13.453738,121.843673">Feature 3 end</option>
              <option value="13.454156,121.843403">
                Feature 4 end/5 start
              </option>
              <option value="13.454446,121.843611">Feature 5 end</option>
              <option value="13.454623,121.844327">Feature 6 end</option>
              <option value="13.454175,121.844000">Feature 7 start</option>
              <option value="13.453838,121.844542">
                Feature 7 end/8 start
              </option>
              <option value="13.453519,121.845046">
                Feature 8 end/9,13 start
              </option>
              <option value="13.453292,121.845382">
                Feature 9 end/10,12 start
              </option>
              <option value="13.452971,121.845145">Feature 10,11 end</option>
              <option value="13.453313,121.845443">Feature 12 middle</option>
              <option value="13.453415,121.845514">Feature 12 end</option>
              <option value="13.455249,121.845807">Feature 13 end</option>
              <option value="13.454832,121.844026">Feature 14 middle</option>
              <option value="13.455055,121.844174">Feature 14 end</option>
              <option value="13.454280,121.844857">Feature 17,18 end</option>
              <option value="13.454446,121.844197">Feature 19 start</option>
              <option value="13.454711,121.843775">Feature 19 end</option>
              <option value="13.453555,121.844287">Feature 22 start</option>
              <option value="13.453860,121.844506">Feature 22 end</option>
              <option value="13.453194,121.844822">Feature 23 start</option>
              <option value="13.453925,121.845336">Feature 24 start</option>
              <option value="13.454238,121.844827">Feature 24 end</option>
              <option value="13.454122,121.845477">Feature 25 start</option>
              <option value="13.453946,121.845754">Feature 25,28,29 end</option>
              <option value="13.453571,121.845505">
                Feature 26 end/27 start
              </option>
              <option value="13.453837,121.845719">
                Feature 27 end/28 start
              </option>
              <option value="13.453898,121.845837">Feature 29 end</option>
              <option value="13.454120,121.844743">Feature 30 start</option>
              <option value="13.454465,121.844211">Feature 30 end</option>
              <option value="13.455014,121.845655">Feature 31 start</option>
              <option value="13.454847,121.846038">Feature 31 end</option>
              <option value="13.455249,121.845292">
                Feature 32 end/33 start
              </option>
              <option value="13.455393,121.845300">Feature 33,36 start</option>
              <option value="13.455312,121.845409">Feature 34 end</option>
              <option value="13.455110,121.845715">Feature 35 start</option>
              <option value="13.455245,121.845533">Feature 35 end</option>
              <option value="13.455731,121.844822">Feature 36 end</option>
              <option value="13.455670,121.844908">Feature 37 start</option>
              <option value="13.455574,121.844469">Feature 37 end</option>
              <option value="13.455259,121.844197">Feature 38 end</option>
              <option value="13.455311,121.844010">Feature 40 start</option>
              <option value="13.455476,121.844109">Feature 40 end</option>
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
              <option
                value="13.453218,121.844443"
                disabled={point_a === "13.453218,121.844443"}
              >
                Feature 1 start
              </option>
              <option
                value="13.453376,121.844558"
                disabled={point_a === "13.453376,121.844558"}
              >
                Feature 1 end/2 start
              </option>
              <option
                value="13.453886,121.843790"
                disabled={point_a === "13.453886,121.843790"}
              >
                Feature 2 end/3,4,6 start
              </option>
              <option
                value="13.453738,121.843673"
                disabled={point_a === "13.453738,121.843673"}
              >
                Feature 3 end
              </option>
              <option
                value="13.454156,121.843403"
                disabled={point_a === "13.454156,121.843403"}
              >
                Feature 4 end/5 start
              </option>
              <option
                value="13.454446,121.843611"
                disabled={point_a === "13.454446,121.843611"}
              >
                Feature 5 end
              </option>
              <option
                value="13.454623,121.844327"
                disabled={point_a === "13.454623,121.844327"}
              >
                Feature 6 end
              </option>
              <option
                value="13.454175,121.844000"
                disabled={point_a === "13.454175,121.844000"}
              >
                Feature 7 start
              </option>
              <option
                value="13.453838,121.844542"
                disabled={point_a === "13.453838,121.844542"}
              >
                Feature 7 end/8 start
              </option>
              <option
                value="13.453519,121.845046"
                disabled={point_a === "13.453519,121.845046"}
              >
                Feature 8 end/9,13 start
              </option>
              <option
                value="13.453292,121.845382"
                disabled={point_a === "13.453292,121.845382"}
              >
                Feature 9 end/10,12 start
              </option>
              <option
                value="13.452971,121.845145"
                disabled={point_a === "13.452971,121.845145"}
              >
                Feature 10,11 end
              </option>
              <option
                value="13.453313,121.845443"
                disabled={point_a === "13.453313,121.845443"}
              >
                Feature 12 middle
              </option>
              <option
                value="13.453415,121.845514"
                disabled={point_a === "13.453415,121.845514"}
              >
                Feature 12 end
              </option>
              <option
                value="13.455249,121.845807"
                disabled={point_a === "13.455249,121.845807"}
              >
                Feature 13 end
              </option>
              <option
                value="13.454832,121.844026"
                disabled={point_a === "13.454832,121.844026"}
              >
                Feature 14 middle
              </option>
              <option
                value="13.455055,121.844174"
                disabled={point_a === "13.455055,121.844174"}
              >
                Feature 14 end
              </option>
              <option
                value="13.454280,121.844857"
                disabled={point_a === "13.454280,121.844857"}
              >
                Feature 17,18 end
              </option>
              <option
                value="13.454446,121.844197"
                disabled={point_a === "13.454446,121.844197"}
              >
                Feature 19 start
              </option>
              <option
                value="13.454711,121.843775"
                disabled={point_a === "13.454711,121.843775"}
              >
                Feature 19 end
              </option>
              <option
                value="13.453555,121.844287"
                disabled={point_a === "13.453555,121.844287"}
              >
                Feature 22 start
              </option>
              <option
                value="13.453860,121.844506"
                disabled={point_a === "13.453860,121.844506"}
              >
                Feature 22 end
              </option>
              <option
                value="13.453194,121.844822"
                disabled={point_a === "13.453194,121.844822"}
              >
                Feature 23 start
              </option>
              <option
                value="13.453925,121.845336"
                disabled={point_a === "13.453925,121.845336"}
              >
                Feature 24 start
              </option>
              <option
                value="13.454238,121.844827"
                disabled={point_a === "13.454238,121.844827"}
              >
                Feature 24 end
              </option>
              <option
                value="13.454122,121.845477"
                disabled={point_a === "13.454122,121.845477"}
              >
                Feature 25 start
              </option>
              <option
                value="13.453946,121.845754"
                disabled={point_a === "13.453946,121.845754"}
              >
                Feature 25,28,29 end
              </option>
              <option
                value="13.453571,121.845505"
                disabled={point_a === "13.453571,121.845505"}
              >
                Feature 26 end/27 start
              </option>
              <option
                value="13.453837,121.845719"
                disabled={point_a === "13.453837,121.845719"}
              >
                Feature 27 end/28 start
              </option>
              <option
                value="13.453898,121.845837"
                disabled={point_a === "13.453898,121.845837"}
              >
                Feature 29 end
              </option>
              <option
                value="13.454120,121.844743"
                disabled={point_a === "13.454120,121.844743"}
              >
                Feature 30 start
              </option>
              <option
                value="13.454465,121.844211"
                disabled={point_a === "13.454465,121.844211"}
              >
                Feature 30 end
              </option>
              <option
                value="13.455014,121.845655"
                disabled={point_a === "13.455014,121.845655"}
              >
                Feature 31 start
              </option>
              <option
                value="13.454847,121.846038"
                disabled={point_a === "13.454847,121.846038"}
              >
                Feature 31 end
              </option>
              <option
                value="13.455249,121.845292"
                disabled={point_a === "13.455249,121.845292"}
              >
                Feature 32 end/33 start
              </option>
              <option
                value="13.455393,121.845300"
                disabled={point_a === "13.455393,121.845300"}
              >
                Feature 33,36 start
              </option>
              <option
                value="13.455312,121.845409"
                disabled={point_a === "13.455312,121.845409"}
              >
                Feature 34 end
              </option>
              <option
                value="13.455110,121.845715"
                disabled={point_a === "13.455110,121.845715"}
              >
                Feature 35 start
              </option>
              <option
                value="13.455245,121.845533"
                disabled={point_a === "13.455245,121.845533"}
              >
                Feature 35 end
              </option>
              <option
                value="13.455731,121.844822"
                disabled={point_a === "13.455731,121.844822"}
              >
                Feature 36 end
              </option>
              <option
                value="13.455670,121.844908"
                disabled={point_a === "13.455670,121.844908"}
              >
                Feature 37 start
              </option>
              <option
                value="13.455574,121.844469"
                disabled={point_a === "13.455574,121.844469"}
              >
                Feature 37 end
              </option>
              <option
                value="13.455259,121.844197"
                disabled={point_a === "13.455259,121.844197"}
              >
                Feature 38 end
              </option>
              <option
                value="13.455311,121.844010"
                disabled={point_a === "13.455311,121.844010"}
              >
                Feature 40 start
              </option>
              <option
                value="13.455476,121.844109"
                disabled={point_a === "13.455476,121.844109"}
              >
                Feature 40 end
              </option>
            </select>
          </div>
          <button type="submit">Go</button>
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
