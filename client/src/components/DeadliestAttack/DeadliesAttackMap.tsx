// components/IncidentMap.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

interface IAttack {
    _id: {
        city: string;
        latitude: number;
        longitude: number;
    };
    total_killed: number;
    total_wounded: number;
    total_casualties: number;
}

interface IAttackProps {
    attacks: IAttack[];
}

const DeadkiesAttackMap: React.FC<IAttackProps> = ({ attacks }) => {
    const markerIcon = L.icon({
        iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
     const CenterMap: React.FC = () => {
      const map = useMap();
      useEffect(() => {
        if (attacks.length > 0) {
          const firstIncident = attacks[0];
          map.setView([firstIncident._id.latitude, firstIncident._id.longitude], 13);
        }
      }, [attacks, map]);
      return null;
    };
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
            {attacks.map(
                (attack, index) =>
                    attack._id.latitude &&
                    attack._id.latitude && (
                        <Marker
                            key={index}
                            position={[attack._id.latitude, attack._id.longitude]}
                            icon={markerIcon}
                        >
                            <Popup>
                                {`Sum of Incidents: ${attack.total_killed} || City: ${attack._id.city}` ||
                                    "No data available"}
                            </Popup>
                        </Marker>
                    )
            )}
            <CenterMap />
        </MapContainer>
    );
};

export default DeadkiesAttackMap;
