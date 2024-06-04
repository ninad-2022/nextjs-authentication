import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig";
import { getDataFromToken } from "@/helpers/dataFromToken";
import User from "@/models/userModel";
connect();

export async function GET(request: NextRequest) {
    try {
        // extract data from token 
        const userId = await getDataFromToken(request)
        console.log('userId: ', userId);
        const user = await User.findOne({_id: userId}).select("-password") //"-password to avoid"
        return NextResponse.json({ message: "User found", data: user})
    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 })
    }
};
