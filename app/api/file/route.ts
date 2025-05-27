import { adminDb } from "@/firebaseAdmin";
import { NextRequest } from "next/server";

async function GET(request:NextRequest) {
    const fileId=request.headers;
    adminDb.collection('files')

}