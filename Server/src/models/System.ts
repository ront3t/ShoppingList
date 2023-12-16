import { InferSchemaType, Schema, model } from "mongoose";

const SystemSchema = new Schema({
    name: { type: String, required: true, unique: true },
})  

type System = InferSchemaType<typeof SystemSchema>

export default model<System>("System", SystemSchema)