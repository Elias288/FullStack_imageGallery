import React, { useRef, useState } from "react";
import HeaderComponent from "../../components/Header/Header.component";
import "./UploadFile.css";

function UploadFilePage() {
  const [chargedFiles, setChargedFiles] = useState<File[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // const onSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();

  //   const target = e.target as typeof e.target & {
  //     // userName: { value: string };
  //     // password: { value: string };
  //   };

  //   console.log(target);
  // };

  // https://stackoverflow.com/questions/59233036/react-typescript-get-files-from-file-input
  const chargeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
    if (files) setChargedFiles([...files]);

    // Limpia el input file después de un segundo
    setTimeout(() => (e.target.value = ""), 1000);
  };

  return (
    <div className="UploadFile">
      <HeaderComponent title="UploadFile" showNavBar />

      {/* Upload files */}
      <input
        type="file"
        name="inputFile"
        accept="image/*, video/*"
        ref={inputFileRef}
        onChange={chargeFiles}
        multiple
      />

      <ul>
        {chargedFiles.map((item, index) => {
          return (
            <li key={index}>
              <span>{item.type}</span> <span>{item.name}</span>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UploadFilePage;
