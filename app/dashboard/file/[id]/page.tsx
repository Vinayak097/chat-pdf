import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { adminDb } from '@/firebaseAdmin';
import PdfView from '@/app/components/PdfView';

export default async function ChatfilePage({params}: {params: {id: string}}) {
  const { id: fileId } = params;
  const userId = await auth();
  
  if (!userId.userId) {
    throw new Error("User not found");
  }

  const ref = adminDb
    .collection("users")
    .doc(userId.userId)
    .collection('files')
    .doc(fileId);

  const docSnap = await ref.get();
  const url = docSnap.data()?.downloadUrl;

  if (!url) {
    throw new Error("No URL found for this document");
  }

  return (
    <div className='grid grid-cols-5 h-screen overflow-hidden'>
      <div className='col-span-5 lg:col-span-2 overflow-y-auto'>
        Chat            
      </div>
      <PdfView url={url} />
    </div>
  );
}