import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";

interface FileUploaderProps {
  fieldChange: (FILES: FileWithPath[]) => void;
  mediaUrl: URL;
}

export const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  //   const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string | undefined>(
    mediaUrl?.toString() || undefined
  );

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      //   setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".svg"] },
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Select files
          </Button>
        </div>
      )}
    </div>
  );
};
