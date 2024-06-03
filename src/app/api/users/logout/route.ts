import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig";
connect();

export const GET = async (request: NextRequest) => {
    try {
        const response = NextResponse.json({ message: "logout successfully", success: true });
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;
    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 })
    }
};
