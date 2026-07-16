import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Data } from "../utils/utils";

const ChangeView = ({ center, zoom }: { center: number[]; zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapBox = ({ data }: { data: Data }) => {
  return (
    <MapContainer
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "20px",
        padding: "20px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <ChangeView
        center={[data?.city?.coord?.lat, data?.city?.coord?.lon]}
        zoom={13}
      />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[data?.city?.coord?.lat, data?.city?.coord?.lon]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapBox;
