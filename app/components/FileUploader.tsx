"use client";

import { CircleArrowDown, RocketIcon } from 'lucide-react';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`m-auto border-dashed border-2 p-20 lg:p-10 mt-10 w-[90%] border-amber-500 text-amber-500 text-center cursor-pointer ${
        isDragActive ? "bg-amber-200" : "bg-amber-100"
      }`}
    >
      <input {...getInputProps()} />
      <div className='flex flex-col items-center gap-2'>
        {isDragActive ? (
          <>
            <RocketIcon className='animate-bounce h-20 w-20' />
            <p>Drop the files here ...</p>
          </>
        ) : (
          <>
            <CircleArrowDown className='animate-bounce h-20 w-20' />
            <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
