// NOTE: nextjs works on the edge, so everytime you send request you need connnect the db
import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request:NextRequest) => {

}
