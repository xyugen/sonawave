"use client";

import { ApiRoutes } from "@/constants/api-routes";
import {
  ALLOWED_TYPES,
  MAX_FILE_SIZE_MB,
  MAX_NUMBER_OF_FILES,
} from "@/constants/audio-params";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UploadForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // Max number of files
    if (files.length > MAX_NUMBER_OF_FILES) {
      toast.error(`Max ${MAX_NUMBER_OF_FILES} files allowed.`);
      e.target.value = "";
      setFiles(null);
      return;
    }

    for (const file of files) {
      // File type validation
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`File "${file.name}" has an unsupported format.`);
        e.target.value = "";
        setFiles(null);
        return;
      }

      // File size validation
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > MAX_FILE_SIZE_MB) {
        toast.error(
          `"${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB file size limit.`
        );
        e.target.value = "";
        setFiles(null);
        return;
      }
    }

    // TODO: Audio duration validation

    setFiles(e.target.files);
  };

  const handleReset = () => {
    setFiles(null);

    if (!inputRef.current) return;

    inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (!files) {
      toast.error("No files selected.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    fetch(ApiRoutes.UPLOAD_FILE, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Files uploaded successfully!");
        handleReset();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error uploading files.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      className="space-y-2 w-full sm:w-2/3 md:w-1/2"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-2">
        <Input
          type="file"
          name="audioFile"
          accept=".wav,.mp3,.m4a,.aac,.ogg"
          multiple
          onChange={handleFileChange}
          ref={inputRef}
        />
        {files && (
          <Button
            size={"icon"}
            type="reset"
            variant={"outline"}
            onClick={handleReset}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {files && (
        <div className="border border-border bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-md shadow-md p-4">
          {files && (
            <ul>
              {Array.from(files).map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Button className="w-full" type="submit" disabled={!files || isLoading}>
        Upload
      </Button>
    </form>
  );
};

export default UploadForm;
