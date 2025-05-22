"use server"
import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId:string) {
    console.log("generatin embeedings")
    auth().protect();
    console.log("generatin embeedings")
    const pineconeVectorStore=await generateEmbeddingsInPineconeVectorStore(docId);
    console.log("generatin embeedings 3")
    revalidatePath('/dashboard')
    return {completed:true}
}