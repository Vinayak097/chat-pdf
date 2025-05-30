'use client'

import { useUser } from "@clerk/nextjs";    
import { db, storage } from "@/firebase";

import { useState } from "react";
import {ref, uploadBytesResumable} from "firebase/storage"
import {v4 as uuidv4} from "uuid";
import { getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { generateEmbeddings } from "@/actions/generateEmbeddings";


export enum StatusText{
    UPLOADING="Uploading file...",
    UPLOADED="File uploaded successfully",
    SAVING="Saving file to database...",
    GENERATING="Generating AI Embeddings , This will only take few seconds..."
}
export type Status=StatusText[keyof StatusText];
function useUpload(){
    const [progress,setProgress]    =useState<number|null>(null);
    const [fileId,setfileId]=useState<String|null>(null);
    const [status,setStatus]=useState<Status|null>();
    
    const {user}=useUser();
    
  
    const handleUpload=async (file:File)=>{
        if(!file || !user){
            return;
        }
        const fileIdToUploadTo=uuidv4();
        const storageRef=ref(
            storage,
            `users/${user.id}/files/${fileIdToUploadTo}`
        )

        const uploadTask=uploadBytesResumable(storageRef,file);
        uploadTask.on("state_changed",(snapshot)=>{
            const percent=Math.round(
                ((snapshot.bytesTransferred/snapshot.totalBytes)*100)
            );
            setStatus(StatusText.UPLOADING);
            setProgress(percent);
        },(error)=>{
            console.error("Error uploading file",error);
        },async()=>{
            setStatus(StatusText.UPLOADED);
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
            console.log("downaloaded url " , downloadUrl, fileIdToUploadTo)
            setStatus(StatusText.SAVING);
            
            await setDoc(doc(db,"users",user.id,'files',fileIdToUploadTo),{
                name:file.name,
                size:file.size,
                type:file.type,
                downloadUrl:downloadUrl,
                ref:uploadTask.snapshot.ref.fullPath,
                createdAt:new Date()
            })
            console.log('file uploded and collection crated ')
            setStatus(StatusText.GENERATING)
            await generateEmbeddings(fileIdToUploadTo);
            setfileId(fileIdToUploadTo)
        })
    }
    return {status,progress,fileId,handleUpload}
}

export default useUpload;
