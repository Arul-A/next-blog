import connectMongo from "../../../utils/connectMongo"
import PostModel from "../../../models/postModel"

export async function GET() {
    try {
        await connectMongo()
        const posts = await PostModel.find()
        return Response.json({ posts })
    } catch(error) {
        return Response.json({message: error.message})
    }
}