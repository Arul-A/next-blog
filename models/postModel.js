import { model, Schema, models } from "mongoose";

const postSchema = new Schema({
    title: String,
    description: String,
    image: String,
    createdAt: String
}, {toJSON: {virtuals: true}})

postSchema.virtual('short_description').get(function () {
    return this.description ? this.description.substring(0, 50) + '...' : ''
})

postSchema.virtual('formated_date').get(function () {
    return changeDateFormat(this.createdAt)
})

function changeDateFormat(date_str) {
    if (!date_str) return "";
    const date = new Date(date_str);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
    

const postModel = models.Post ||model('Post', postSchema)

export default postModel;