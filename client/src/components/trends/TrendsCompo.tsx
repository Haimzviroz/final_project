import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import IncidentFilters from "./trendsFilter";
export interface ITrends {
    _id: {
        month: number;
    };
    count: number;
}
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const TrendsCompo = () => {
    const [trends, setTrends] = useState([] as ITrends[]);
    const [selectedQuery, setSelectedQuery] = useState<
        string | { min: string; max: string } | { last: string }
    >("2017");
    useEffect(() => {
        const fetchTrends = async () => {
            let Baseurl = `${
                import.meta.env.VITE_BASEURL
            }analysis/incident-trends/`;
            if (typeof selectedQuery === "string") {
                Baseurl += `${selectedQuery}`;
            } else if (
                typeof selectedQuery === "object" &&
                "min" in selectedQuery &&
                "max" in selectedQuery
            ) {
                Baseurl += `?min=${selectedQuery.min}&max=${selectedQuery.max}`;
            } else if (
                typeof selectedQuery === "object" &&
                "last" in selectedQuery
            ) {
                Baseurl += `?last=${selectedQuery.last}`;
            }
            try {
                const response = await fetch(Baseurl);
                const data = await response.json();
                setTrends(data);
            } catch (error) {
                console.error("Error fetching trends:", error);
            }
        };
        fetchTrends();
    }, [selectedQuery]);

    return (
        <div>
            <div>
                <IncidentFilters
                    selectedQuery={selectedQuery}
                    setSelectedQuery={setSelectedQuery}
                />
                <BarChart
                    xAxis={[
                        {
                            scaleType: "band",
                            data: trends.map((d) => months[d._id.month - 1]),
                        },
                    ]}
                    series={[
                        {
                            data: trends.map((d) => d.count),
                        },
                    ]}
                    height={450}
                    title="Incident Trends"
                    sx={{
                        margin: "10px",
                        padding: "10px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                />
            </div>
        </div>
    );
};

export default TrendsCompo;
