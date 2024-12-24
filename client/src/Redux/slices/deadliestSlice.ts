import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiox from "axios";

export interface IDeadliest {
    _id: string;
    countOfCasualties: number;
}

interface DeadliestState {
    deadliest: IDeadliest[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: DeadliestState = {
    deadliest: [],
    status: "idle",
    error: null,
};

export const getDeadliestAttackTypes = createAsyncThunk(
    "getdeadliest",
    async () => {
        try {
            const response = await axiox.get(
                "http://localhost:3000/api/analysis/deadliest-attack-types"
            );
            return response.data;
        } catch (error: any) {
            return error.message;
        }
    }
);

export const deadliestSlice = createSlice({
    name: "deadliest",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDeadliestAttackTypes.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getDeadliestAttackTypes.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.deadliest = action.payload;
            })
            .addCase(getDeadliestAttackTypes.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default deadliestSlice.reducer;
