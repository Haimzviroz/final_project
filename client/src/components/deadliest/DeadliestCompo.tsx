import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import {
    getDeadliestAttackTypes,
    IDeadliest,
} from "../../Redux/slices/deadliestSlice";
import CircularIndeterminate from "../CircularIndeterminate";
import { BarChart } from "@mui/x-charts/BarChart";

const DeadliestCompo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [deadliest, setDeadliest] = useState([] as IDeadliest[]);
    const status = useSelector(
        (state: RootState) => state.deadliestSlice.status
    );
    const error = useSelector((state: RootState) => state.deadliestSlice.error);

    useEffect(() => {
        const fetchDeadliest = async () => {
            try {
                const fetcheDeadliest: IDeadliest[] = await dispatch(
                    getDeadliestAttackTypes()
                ).unwrap();
                setDeadliest(fetcheDeadliest);
            } catch (error) {
                console.error("Error fetching deadliest:", error);
            }
        };

        fetchDeadliest();
    }, []);
    return (
        <div>
            {status === "loading" && <CircularIndeterminate />}
            {status === "succeeded" && (
                <BarChart
                    xAxis={[
                        {
                            scaleType: "band",
                            data: deadliest.map((d) => d._id),
                        },
                    ]}
                    series={[
                        {
                            data: deadliest.map((d) => d.countOfCasualties),
                        },
                    ]}
                    height={600}
                    title="Deadliest Attack Types"
                    sx={{
                        margin: "10px",
                        padding: "10px",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                />
            )}
            {status === "failed" && <p>Failed: {error}</p>}
        </div>
    );
};
export default DeadliestCompo;
