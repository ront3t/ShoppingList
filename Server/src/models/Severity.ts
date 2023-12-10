import { InferSchemaType, Schema, model } from "mongoose";

const SeveritySchema = new Schema({
    name: { type: String, required: true, unique: true },
})  

type Severity = InferSchemaType<typeof SeveritySchema>

export default model<Severity>("Severity", SeveritySchema)