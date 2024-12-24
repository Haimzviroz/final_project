import { count } from "console";
import TerorEvent from "../models/IEvent";

// .4 חמשת ארגוני הטרור הבולטים באזור מסוים
export const GetTopGroupsganizations = async (
    region_txt: string
): Promise<string[]> => {
    const result = await TerorEvent.aggregate([
        {
            $match: {
                region_txt: region_txt,
            },
        },
        {
            $group: {
                _id: "$gname",
                longitude: { $avg: "$longitude" },
                latitude: { $avg: "$latitude" },
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
    ]);

    return result;
};
export const GetGroupByYear = async (iyear: number): Promise<string[]> => {
    //תיאור: מציג רשימת ארגונים שפעלו בשנה מסוימת עם מספר התקריות שלהם.
    const result = await TerorEvent.aggregate([
        {
            $match: {
                iyear: iyear,
            },
        },
        {
            $group: {
                _id: "$gname",
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
    ]);
    return result;
};
export const GetByGroup = async (gname: string): Promise<string[]> => {
    //. בחירת ארגון מרשימה - הצגת התקריות לפני שנים
    const result = await TerorEvent.aggregate([
        {
            $match: {
                gname: gname,
            },
        },
        {
            $group: {
                _id: "$iyear",
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
    ]);
    return result;
};

export const GetHighestCasualtyRegions = async (
    gname: string
): Promise<string[]> => {
    //תיאור: מחזיר אזורים עם ממוצע נפגעים הגבוה ביותר.
    // לאחר בחירת ארגון, התשובה
    // תכיל את האיזורים שבהם הארגון גרם להתקפות הקטלניות ביותר כמות הנפגעים, הרוגים ופצועים,
    // הגדולה ביותר ביחס לארגונים האחרים באותו האזור לכל התקופה
    const regionKill = await TerorEvent.aggregate([
        { $match: { gname: gname } },
        {
            $group: {
                _id: {
                    city: "$city",
                    longitude: "$longitude",
                    latitude: "$latitude",
                },
                total_killed: { $sum: { $ifNull: ["$nkill", 0] } },
                total_wounded: { $sum: { $ifNull: ["$nwound", 0] } },
                total_casualties: {
                    $sum: {
                        $add: [
                            { $ifNull: ["$nkill", 0] },
                            { $ifNull: ["$nwound", 0] },
                        ],
                    },
                },
            },
        },
        { $sort: { total_casualties: -1 } },
        {
            $project: {
                "_id.city": 1,
                "_id.longitude": 1,
                "_id.latitude": 1,
                total_killed: 1,
                total_wounded: 1,
                total_casualties: 1,
            },
        },
        { $limit: 5 },
    ]);
    return regionKill;
};
