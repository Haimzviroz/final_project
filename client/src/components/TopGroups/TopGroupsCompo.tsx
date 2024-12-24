import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import TopGroupsFilters from "./TopGroupsFilter";
import TopGroupMap from "./TopGroupMap";

export interface ITopGroups {
    _id: string;
    count: number;
    latitude: number;
    longitude: number;
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

const TopGroupsCompo = () => {
    const [topGroups, setTopGroups] = useState([] as ITopGroups[]);
    const [region, setRegion] = useState(region_txt[0]);
    const [FilterdTopFiveGrupes, setFilterdTopFiveGrupes] = useState(
        [] as ITopGroups[]
    );
    const [selectAll, setselectAll] = useState(false);
    const [showMap, setShowMap] = useState(false);
    
    useEffect(() => {
        const fetchTopGroups = async () => {
            let Baseurl =
                `http://localhost:3000/api/relationships/top-groups/` + region;
            try {
                const response = await fetch(Baseurl);
                const data = await response.json();
                setTopGroups(data);
            } catch (error) {
                console.error("Error fetching top groups:", error);
            }
        };
        fetchTopGroups();
    }, [region]);
    useEffect(() => {
        if (selectAll) {
            setFilterdTopFiveGrupes(topGroups.slice(0, 5));
        } else {
            setFilterdTopFiveGrupes(topGroups);
        }
    }, [selectAll, topGroups]);
    return (
        <div>
            <TopGroupsFilters
                selectedRegion={region}
                selectAll={selectAll}
                setSelectAll={setselectAll}
                setSelectedRegion={setRegion}
                showMap={showMap}
                setShowMap={setShowMap}
            />
           { !showMap &&<BarChart
                xAxis={[
                    {
                        scaleType: "band",
                        data: FilterdTopFiveGrupes.map((d) => d._id),
                    },
                ]}
                series={[
                    {
                        data: FilterdTopFiveGrupes.map((d) => d.count),
                    },
                ]}
                height={400}
                title="Top Groups"
                sx={{
                    margin: "10px",
                    padding: "10px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            />
}            {showMap && <TopGroupMap gnames={FilterdTopFiveGrupes} />}
        </div>
    );
};

export default TopGroupsCompo;
