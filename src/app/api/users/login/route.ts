import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
connect();

export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const user = await User.findOne({ email })
        if (!user) {
            NextResponse.json({ error: "user does not exist" }, { status: 500 })
        };
        console.log("User Exist");
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword) {
            NextResponse.json({ error: "Check your credentials" }, { status: 500 })
        };

        const tokenPayload = { id: user._id, username:user.username, email: user.email} 
        const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        const response = NextResponse.json({ message:"Logged In Success", success:true })
        response.cookies.set("token", token, { httpOnly:true })//only server can manipulate cookie
        return response;

    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 })
    }
};

// localhost:3000/api/users/signup
