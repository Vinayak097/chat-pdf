"use client"
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';




import { toast } from 'react-toastify';

import useUpload from "@/hooks/useUpload";
import { CircleArrowDown, RocketIcon } from "lucide-react";

function FileUploader() {
  const { progress, status, fileId, handleUpload }:any = useUpload();
  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/file/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file) {
        try {
          await handleUpload(file);
        } catch (error) {
          toast.error("Upload failed. Please try again.");
        }
      } else {
        toast.warning("No file selected.");
      }
    },
    [handleUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles:1,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const uploadInProgress = progress != null && progress > 0 && progress < 100;

  return (
    <div>
      {uploadInProgress && (
        <div>
          <div className="radial-progress bg-hidden">
            {progress} %
          </div>
          <p>{status}</p>
        </div>
      )}
      <div
        {...getRootProps()}
        className={`m-auto border-dashed border-2 p-20 lg:p-10 mt-10 w-[90%] border-amber-500 text-amber-500 text-center cursor-pointer ${
          isDragActive ? "bg-amber-200" : "bg-amber-100"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          {isDragActive ? (
            <>
              <RocketIcon className="animate-bounce h-20 w-20" />
              <p>Drop the files here ...</p>
            </>
          ) : (
            <>
              <CircleArrowDown className="animate-bounce h-20 w-20" />
              <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
