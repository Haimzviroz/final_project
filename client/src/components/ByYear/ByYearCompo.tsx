import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import ByYearFilter from "./ByYearFilter";

interface IByYear {
    _id: string;
    count: number;
}
interface IByOrg {
    _id: string;
    count: number;
}

const ByYearCompo = () => {
    const [byYearData, setbyYearData] = useState<IByYear[]>([]);
    const [byOrgData, setbyOrgData] = useState<IByOrg[]>([]);
    const [year, setYear] = useState<string>("2017");
    const [org, setOrg] = useState("");
    const [method, setMethod] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let Baseurl = `${
                import.meta.env.VITE_BASEURL
            }relationships/groups-by-year/
                ${year}`;
            try {
                const response = await fetch(Baseurl);
                const data = await response.json();
                setbyYearData(data);
            } catch (error) {
                console.error("Error fetching top groups:", error);
            }
        };
        fetchData();
    }, [year]);

    useEffect(() => {
        const fetchData = async () => {
            let Baseurl = `${
                import.meta.env.VITE_BASEURL
            }relationships/groups-by-organization/${org}`;
            try {
                const response = await fetch(Baseurl);
                const data = await response.json();
                setbyOrgData(data);
            } catch (error) {
                console.error("Error fetching top groups:", error);
            }
        };
        fetchData();
    }, [org]);

    return (
        <div>
            <ByYearFilter
                listOfOrganizations={byYearData.map((d) => d._id)}
                selectedYear={year}
                setSelectedYear={setYear}
                selctedOrganization={org}
                setSelectedOrganization={setOrg}
                setMethod={setMethod}
                method={method}
            />
            <BarChart
                xAxis={[
                    {
                        scaleType: "band",
                        data:
                            method === "byYear"
                                ? byYearData.map((d) => d._id)
                                : byOrgData.map((d) => d._id),
                    },
                ]}
                series={[
                    {
                        data:
                            method === "byYear"
                                ? byYearData.map((d) => d.count)
                                : byOrgData.map((d) => d.count),
                    },
                ]}
                height={450}
                title="Number of incidents by year"
                sx={{
                    padding: "10px",
                    width: "100%",
                    height: "90%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            />
        </div>
    );
};

export default ByYearCompo;
