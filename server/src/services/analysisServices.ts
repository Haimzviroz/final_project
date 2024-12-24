import TerorEvent from "../models/IEvent";

///.1 סוגי התקפות הקטלניים ביותר
export const GetdeadliestAttackTypes = async (): Promise<string[]> => {
    //Returns attack types ranked by total number of casualties.
    //תיאור: מחזיר סוגי התקפות מדורגים לפי מספר הנפגעים הכולל.
    const result = await TerorEvent.aggregate([
        {
            $group: {
                _id: "$attacktype1_txt",
                countOfCasualties: {
                    $sum: { $add: ["$nkill", "$nwound"] },
                },
            },
        },
        { $sort: { countOfCasualties: -1 } },
    ]);
    return result;
};
// ם שיעור נפגעים הגבוה ביותר לכל תקרית
export const GetHighestCasualtyRegions = async (): Promise<string[]> => {
    //תיאור: מחזיר אזורים עם ממוצע נפגעים הגבוה ביותר.

    const regionKill = await TerorEvent.aggregate([
        {
            $group: {
                _id: "$region_txt",
                averageKillByEvent: { $avg: { $add: ["$nkill", "$nwound"] } },
                longitude : { $avg: "$longitude" },
                latitude : { $avg: "$latitude" },
            },
        },
        { $sort: { averageKillByEvent: -1 } },
    ]);

    return regionKill;
};
//.3 מגמות שנתיות וחודשיות בתדירות התקריות
export const GetAnnualFrequency = async (iyear: number): Promise<string[]> => {
    //תיאור: מחזיר תדירות תקריות לפי שנים וחודשים כמות התקריות הייחודיות במהלך התקופה הנבחנת.
    const result = await TerorEvent.aggregate([
        {
            $match: {
                iyear: iyear,
            },
        },
        {
            $group: {
                _id: {
                    month: "$imonth",
                },
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                _id: 1,
            },
        },
    ]);
    return result;
};

export const GetMultiYearFrequency = async (
    min?: number,
    max?: number,
    last?: number
): Promise<string[]> => {
    if (last) {
        min = 2017 - last;
        max = 2017;
    }
    const result = await TerorEvent.aggregate([
        {
            $match: {
                iyear: { $gte: min, $lte: max },
            },
        },
        {
            $group: {
                _id: {
                    month: "$imonth",
                },
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                _id: 1,
            },
        },
    ]);

    return result;
};
