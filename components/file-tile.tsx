import { useState, useEffect } from "react";
import { UploadIcon } from "./icons";

export function sizeMB(bytes: number): number {
  return bytes / (1000 * 1000);
}

const selectFile = (contentType, multiple): Promise<File[]> => {
  return new Promise((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = multiple;
    input.accept = contentType;

    input.onchange = (_) => {
      let files = Array.from(input.files);
      resolve(files);
    };

    input.click();
  });
};

interface FileTileState {
  file: File;
  remove: (name: string) => void;
  setFiles?: Function;
  files?: File[];
}

export default function FileTile({
  file,
  remove,
  setFiles,
  files,
}: FileTileState) {
  const [base64, setBase64] = useState("");
  useEffect(() => {
    if (!file) {
      return;
    }
    if (file.type.startsWith("image") || file.type.startsWith("video")) {
      const b64 = URL.createObjectURL(file);
      setBase64(b64);

      return () => URL.revokeObjectURL(b64);
    }
  }, [file]);
  const size = sizeMB(file?.size);
  return file ? (
    <article className="file-tile relative">
      <div
        className="card bg-base-100 h-36 bg-cover bg-center relative"
        style={{
          backgroundImage: (file.type || "").startsWith("image")
            ? `url(${base64})`
            : null,
        }}
        tabIndex={0}
      >
        {file.type.startsWith("video") && (
          <video autoPlay muted loop className="bg-video">
            <source src={base64} type={file.type} />
          </video>
        )}
        <div className="absolute inset-0 opacity-30 bg-black"></div>
        <div className="card-body p-3 z-10 absolute inset-0">
          <span className="card-title text-base truncate bg-gray-800 text-white px-2 inline rounded-box">
            {file.name}
          </span>
          <div className="mt-auto flex flex-wrap gap-3 justify-between">
            <span
              className={`${
                size > 150 ? "border border-error" : ""
              } bg-gray-900 text-white px-2 inline rounded-box text-xs truncate shadow-md whitespace-nowrap`}
              style={{ maxWidth: "50%", letterSpacing: 1.25 }}
            >
              {size > 150 ? "Too large!" : `${size.toFixed(2)} MB`}
            </span>

            {!!file.type.trim() && (
              <span
                className="bg-gray-800 text-white px-2 inline rounded-box text-xs truncate shadow-md"
                style={{ maxWidth: "50%", letterSpacing: 1.25 }}
              >
                {file.type.split("/")[1]}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        className="badge badge-primary absolute z-30 cursor-pointer shadow-md"
        style={{ right: -8, top: -8 }}
        onClick={() => remove(file.name)}
        title="Delete Item"
      >
        <i>
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
          >
            <path d="M17.35352,7.35352,12.707,12l4.64649,4.64648a.5.5,0,1,1-.707.707L12,12.707,7.35352,17.35352a.5.5,0,0,1-.707-.707L11.293,12,6.64648,7.35352a.5.5,0,0,1,.707-.707L12,11.293l4.64648-4.64649a.5.5,0,0,1,.707.707Z" />
          </svg>
        </i>
      </button>
    </article>
  ) : (
    <label
      htmlFor="files"
      className={`file-upload w-full mx-auto`}
      tabIndex={0}
      onClick={async (e) => {
        e.preventDefault();
        const f: File[] = await selectFile("*", false);
        setFiles([...files, ...f]);
      }}
    >
      <input type="file" hidden name="files" />
      <i className="pointer-events-none">
        <UploadIcon />
      </i>
      <span className="mt-2 text-base leading-normal pointer-events-none">
        Select File
      </span>
    </label>
  );
}
