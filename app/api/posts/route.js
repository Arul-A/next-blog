import connectMongo from "../../../utils/connectMongo";
import PostModel from "../../../models/postModel";

export async function GET(req) {
    try {
        const query = req.nextUrl.searchParams.get('q');
        await connectMongo();
        let postData;
        if (query) {
            postData = await PostModel.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ]
            }).sort({ _id: -1 });
        } else {
            postData = await PostModel.find().sort({ _id: -1 });
        }
        return Response.json({ postData });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectMongo();
        const { title, description, image } = await req.json();

        if (!title || !description) {
            return Response.json({ message: "Title and description are required" }, { status: 400 });
        }

        const createdAt = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const newPost = await PostModel.create({
            title,
            description,
            image: image || "",
            createdAt
        });

        return Response.json({ message: "Post created successfully", postData: newPost }, { status: 201 });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}