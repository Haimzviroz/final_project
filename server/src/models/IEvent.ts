import mongoose, { Schema, Document, Types } from "mongoose";
interface ITerorEvent extends Document {
    eventid: number;
    iyear: number;
    imonth: number;
    iday: number;
    country_txt: string;
    region_txt: string;
    city: string;
    latitude: number;
    longitude: number;
    attacktype1_txt: string;
    targtype1_txt: string;
    target1: string;
    gname: string;
    weaptype1_txt: string;
    nkill: number;
    nwound: number;
    nperps: number;
    summary: string;
}

const EventSchema = new Schema<ITerorEvent>({
    eventid: { type: Number },
    iyear: { type: Number },
    imonth: { type: Number },
    iday: { type: Number },
    country_txt: { type: String },
    region_txt: { type: String },
    city: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    attacktype1_txt: { type: String },
    targtype1_txt: { type: String },
    target1: { type: String },
    gname: { type: String },
    weaptype1_txt: { type: String },
    nkill: { type: Number },
    nwound: { type: Number },
    nperps: { type: Number },
    summary: { type: String },
});

EventSchema.index({ nkill: 1, nwound: 1, region_txt: 1, attacktype1_txt: 1 });
export default mongoose.model<ITerorEvent>("TerorEvent", EventSchema);
