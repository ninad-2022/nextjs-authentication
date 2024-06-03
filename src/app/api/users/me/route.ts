import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig";
import { getDataFromToken } from "@/helpers/dataFromToken";
import User from "@/models/userModel";
connect();

export const GET = async (request: NextRequest) => {
    try {
        // extract data from token 
        const userId = await getDataFromToken(request)
        const user = User.findOne({_id: userId}).select("-password") //"-password to avoid"
        return NextResponse.json({ error: "User found", data: user}, { status: 200 })
    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 })
    }
};
