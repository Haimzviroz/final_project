import { useEffect, useState } from "react";
import RegionsMap from "./RegionsMap";

const RegionsCompo = () => {
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/analysis/highest-casualty-regions"
                );
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return (
       <RegionsMap incidents={locations} />
    );
};

export default RegionsCompo;
