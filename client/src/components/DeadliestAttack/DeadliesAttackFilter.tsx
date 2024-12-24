import {
    Box,
    FormControl,
    TextField,
    Button,
    Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";

interface ByYearFilterProps {
    setGname: (param: string) => void;
}

const ByYearFilter: React.FC<ByYearFilterProps> = ({ setGname }) => {
    const [gnamesList, setGnamesList] = useState<string[]>([] as string[]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchGnames = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BASEURL}staticData/gnames`
                );
                const data = await response.json();
                setGnamesList(data);
            } catch (error) {
                console.error("Error fetching gnames:", error);
            }
        };
        fetchGnames();
    }, []);

    return (
        <Box
            sx={{
                position: "sticky",
                top: "70px",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginBottom: "1.5rem",
                padding: "1rem",
                backgroundColor: "#f4f4f4",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                width: "80%",
                maxWidth: "61%",
                margin: "0 auto",
            }}
        >
            {" "}
            <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: "150px", gap: "1rem" }}
            >
                <Autocomplete
                    id="outlined-basic"
                    options={gnamesList}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Group" />
                    )}
                    value={searchTerm}
                    onChange={( _, newValue) =>
                        setSearchTerm(newValue || "")
                    }
                />

                <Button
                    variant="contained"
                    onClick={() => setGname(searchTerm)}
                >
                    Search
                </Button>
            </FormControl>
        </Box>
    );
};

export default ByYearFilter;
