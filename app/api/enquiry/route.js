import connectMongo from "../../../utils/connectMongo";
import EnquiryModel from "../../../models/enquiryModel";


export async function POST(req) {
    try {
        await connectMongo()
        const {name, email, message} = await req.json()
        await EnquiryModel.create({name, email, message})
        return Response.json({ code: 201, message: "Enquiry submitted successfully" })
    } catch (error) {
        return Response.json({ code: 500, message: error.message })
    }
}
