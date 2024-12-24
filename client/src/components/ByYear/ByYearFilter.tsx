import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { useState } from "react";

interface ByYearFilterProps {
    selectedYear: string;
    selctedOrganization: string;
    setSelectedYear: (param: string) => void;
    setSelectedOrganization: (param: string) => void;
    listOfOrganizations: string[];
    method: string;
    setMethod: (param: string) => void;
}

const ByYearFilter: React.FC<ByYearFilterProps> = ({
    selectedYear,
    selctedOrganization,
    setSelectedOrganization,
    setSelectedYear,
    listOfOrganizations,
    method,
    setMethod,
}) => {
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
                sx={{ minWidth: "150px" ,gap:"1rem"}} 
            >
                <InputLabel>בחר שיטת סינון</InputLabel>
                <Select
                    labelId="query-label"
                    id="query-select"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                >
                    <MenuItem value={"byYear"}>
                        הצגת מספר התקריות לכל ארגון לפי שנה
                    </MenuItem>
                    <MenuItem value={"byOrg"}>
                        הצגת מספר התקריות לכל השנים לפי ארגון
                    </MenuItem>
                </Select>
                {method === "byYear" && (
                    <TextField
                        label="בחר שנה"
                        type="number"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    />
                )}
                {method === "byOrg" && (
                    <FormControl
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: "150px" }}
                    >
                        <InputLabel>בחר ארגון</InputLabel>
                        <Select
                            labelId="query-label"
                            id="query-select"
                            value={selctedOrganization}
                            onChange={(e) =>
                                setSelectedOrganization(e.target.value)
                            }
                        >
                            {listOfOrganizations.map((org) => (
                                <MenuItem value={org}>{org}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </FormControl>
        </Box>
    );
};

export default ByYearFilter;
