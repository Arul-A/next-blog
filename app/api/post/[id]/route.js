import connectMongo from "../../../../utils/connectMongo";
import PostModel from "../../../../models/postModel";

export async function GET(req, { params }) {
    try {
        await connectMongo();
        const { id } = await params;
        const postData = await PostModel.findOne({ _id: id });
        if (!postData) {
            return Response.json({ message: "Post not found" }, { status: 404 });
        }
        return Response.json({ postData });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await connectMongo();
        const { id } = await params;
        const { title, description, image } = await req.json();

        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            { title, description, image },
            { new: true }
        );

        if (!updatedPost) {
            return Response.json({ message: "Post not found" }, { status: 404 });
        }

        return Response.json({ message: "Post updated successfully", postData: updatedPost });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectMongo();
        const { id } = await params;

        const deletedPost = await PostModel.findByIdAndDelete(id);

        if (!deletedPost) {
            return Response.json({ message: "Post not found" }, { status: 404 });
        }

        return Response.json({ message: "Post deleted successfully" });
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}
