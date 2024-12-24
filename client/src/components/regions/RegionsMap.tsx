// components/IncidentMap.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface Incident {
    latitude: number;
    longitude: number;
    averageKillByEvent?: number;
    _id?: string;
}

interface IncidentMapProps {
    incidents: Incident[];
}

const IncidentMap: React.FC<IncidentMapProps> = ({ incidents }) => {
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
            {incidents.map(
                (incident, index) =>
                    incident.longitude &&
                    incident.latitude && (
                        <Marker
                            key={index}
                            position={[incident.latitude, incident.longitude]}
                            icon={markerIcon}
                        >
                            <Popup>
                                {`Avg casualties: ${incident.averageKillByEvent} \n Region: ${incident._id}` ||
                                    "No avg available"}
                            </Popup>
                        </Marker>
                    )
            )}
        </MapContainer>
    );
};

export default IncidentMap;
