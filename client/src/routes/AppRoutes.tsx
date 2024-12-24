import { Route, Routes } from "react-router-dom"
import ByYearCompo from "../components/ByYear/ByYearCompo";
import DeadliestCompo from "../components/deadliest/DeadliestCompo";
import DeadliestAttackCompo from "../components/DeadliestAttack/DeadliestAttackCompo";
import RegionsCompo from "../components/regions/RegionsCompo";
import TopGroupsCompo from "../components/TopGroups/TopGroupsCompo";
import TrendsCompo from "../components/trends/TrendsCompo";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="*" element={<ErrorPage  />} /> */}
            <Route path="/byyear" element={<ByYearCompo />} />
            <Route path="/deadliest" element={<DeadliestCompo />} />
            <Route path="deadliestattack" element={<DeadliestAttackCompo />} />
            <Route path="regions" element={<RegionsCompo />} />
            <Route path="topGroups" element={<TopGroupsCompo />} />
            <Route path="/trends" element={<TrendsCompo />} />
        </Routes>
    );
};
