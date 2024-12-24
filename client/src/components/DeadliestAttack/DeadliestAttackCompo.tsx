import { useEffect, useState } from "react";
import DeadkiesAttackMap from "./DeadliesAttackMap";
import DeadliesAttackFilter from "./DeadliesAttackFilter";
import { Box } from "@mui/material";

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

const DeadliestAttackCompo = () => {
    const [attacks, setAttacks] = useState([] as IAttack[]);
    const [gname, setGname] = useState<string | null>(null);
    useEffect(() => {
        const fetchAttacks = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASEURL}relationships/deadliest-regions/${gname}`
                );
                const data = await response.json();
                setAttacks(data);
            } catch (error) {
                console.error("Error fetching top groups:", error);
            }
        };
        fetchAttacks();
    }, [gname]);
    return (
        <Box>
            <DeadliesAttackFilter  setGname={setGname} />
            <DeadkiesAttackMap attacks={attacks} />
        </Box>
    );
};

export default DeadliestAttackCompo;
