import connectMongo from "../../../../utils/connectMongo";
import PostModel from "../../../../models/postModel";

export async function GET(req, { params }) {
    try {
        await connectMongo();
        const { id } = await params;
        const postData = await PostModel.findOne({ _id: id });
        return Response.json({ postData });
    } catch (error) {
        return Response.json({ message: error.message });
    }
}
