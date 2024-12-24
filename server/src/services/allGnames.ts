import TerorEvent from "../models/IEvent";
export const GetAllGnames = async () => {
    const result = await TerorEvent.distinct("gname");
    return result;
};
