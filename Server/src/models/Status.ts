import mongoose, { InferSchemaType, Schema, model } from "mongoose";



const StatusSchema = new Schema({
    name: { type: String, required: true, unique: true },
})  

type Status = InferSchemaType<typeof StatusSchema>

const StatusModal = model<Status>("Status", StatusSchema)

StatusSchema.statics.getStatuses = async () => {
  return await StatusModal.find().exec();
}

StatusSchema.statics.getStatusById =async (id) => {
    return await StatusModal.findById(id).exec();
}


export default StatusModal