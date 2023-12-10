import { InferSchemaType, Schema, model } from "mongoose";

const StatusSchema = new Schema({
    name: { type: String, required: true, unique: true },
})  

type Status = InferSchemaType<typeof StatusSchema>

export default model<Status>("Status", StatusSchema)