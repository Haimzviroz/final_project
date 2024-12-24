import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";

interface TopGroupsFiltersProps {
    selectedRegion: string;
    selectAll: boolean;
    showMap: boolean;
    setShowMap: (param: boolean) => void;
    setSelectAll: (param: boolean) => void;
    setSelectedRegion: (param: string) => void;
}
const region_txt = [
    "East Asia",
    "North America",
    "Sub-Saharan Africa",
    "Middle East & North Africa",
    "South Asia",
    "Central Asia",
    "Eastern Europe",
    "Central America & Caribbean",
    "Southeast Asia",
    "Western Europe",
    "Australasia & Oceania",
];
const TopGroupsFilters: React.FC<TopGroupsFiltersProps> = ({
    selectedRegion,
    selectAll,
    showMap,
    setShowMap,
    setSelectAll,
    setSelectedRegion,
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
            <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: "150px" }}
            >
                <InputLabel>בחר איזור</InputLabel>
                <Select
                    labelId="query-label"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    label="שיטת סינון"
                >
                    {region_txt.map((region) => (
                        <MenuItem key={region} value={region}>
                            {region}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setSelectAll(!selectAll)}
            >
                {selectAll ? "הצג הכל" : "הצג טופ חמש"}
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowMap(!showMap)}
            >
                {showMap ? "הצג גרף" : "הצג מפה"}
            </Button>
        </Box>
    );
};

export default TopGroupsFilters;
