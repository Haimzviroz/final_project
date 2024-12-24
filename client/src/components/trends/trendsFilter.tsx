import React, { useState } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
} from "@mui/material";

interface IncidentFiltersProps {
    selectedQuery: string | { min: string; max: string } | { last: string };
    setSelectedQuery: (
        param: string | { min: string; max: string } | { last: string }
    ) => void;
}

const IncidentFilters: React.FC<IncidentFiltersProps> = ({
    selectedQuery,
    setSelectedQuery,
}) => {
    const [status, setStatus] = useState("");
    const [rangeYears, setRangeYears] = useState({ min: "", max: "" });

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
            <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: "150px" }}
            >
                <InputLabel>שיטת סינון</InputLabel>
                <Select
                    labelId="query-label"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="שיטת סינון"
                >
                    <MenuItem value="specific-year">Specific Year</MenuItem>
                    <MenuItem value="range">Range of Years</MenuItem>
                    <MenuItem value="last-5-years" onClick={() => setSelectedQuery({ last: "5" })}>Last 5 Years</MenuItem>
                    <MenuItem value="last-10-years" onClick={() => setSelectedQuery({ last: "10" })}>Last 10 Years</MenuItem>
                </Select>
            </FormControl>

            {status === "specific-year" && (
                <TextField
                    type="number"
                    label="Year"
                    variant="outlined"
                    size="small"
                    value={selectedQuery}
                    onChange={(e) => setSelectedQuery(e.target.value)}
                    sx={{ minWidth: "150px" }}
                />
            )}

            {status === "range" && (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <TextField
                        label="Min Year"
                        variant="outlined"
                        size="small"
                        value={rangeYears.min}
                        onChange={(e) =>
                            setRangeYears(
                                {
                                    ...rangeYears,
                                    min: e.target.value,
                                },
                            )
                        }
                        sx={{ minWidth: "150px" }}
                    />
                    <TextField
                        label="Max Year"
                        variant="outlined"
                        size="small"
                        value={rangeYears.max}
                        onChange={(e) =>
                            setRangeYears({
                                ...rangeYears,
                                max: e.target.value,
                            })
                        }
                        sx={{ minWidth: "150px" }}
                    />
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setSelectedQuery(rangeYears)}
                    >
                        Apply
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default IncidentFilters;
