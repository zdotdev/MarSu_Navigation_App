import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

export default function SchoolMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    import("leaflet/dist/leaflet.css");
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[13.45403, 121.84478]}
        zoom={18}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://zhenzu02.github.io/my-qgis-map/{z}/{x}/{y}.png"
          attribution="&copy; QGIS Map"
          maxZoom={19}
        />
      </MapContainer>
    </div>
  );
}
