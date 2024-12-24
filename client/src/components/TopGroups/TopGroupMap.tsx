// components/IncidentMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface IGname {
    latitude: number;
    longitude: number;
    count?: number;
    _id?: string;
}

interface IGnameProps {
    gnames: IGname[];
}

const TopGroupMap: React.FC<IGnameProps> = ({ gnames }) => {
    const markerIcon = L.icon({
        iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: "80vh", width: "100%", zIndex: 0 }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {gnames.map((gname, index) => (
                gname.longitude &&
                gname.latitude &&
                <Marker
                    key={index}
                    position={[gname.latitude, gname.longitude]}
                    icon={markerIcon}
                >
                    <Popup>
                        {`Sum of Incidents: ${gname.count} || Group Name: ${gname._id}` ||
                            "No data available"}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default TopGroupMap;
