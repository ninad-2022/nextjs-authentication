// NOTE: nextjs works on the edge, so everytime you send request you need connnect the db
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { Const } from "@/constant";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({ username, email, password: hashPassword });
    const createdUser = await newUser.save();
    console.log("createdUser: ", createdUser);

    // send verification email
    await sendEmail({
      email,
      emailType: Const.VERIFY,
      userId: createdUser._id,
    });
    return NextResponse.json({
      message: "User registered succesfully",
      success: true,
      createdUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// localhost:3000/api/users/signup
