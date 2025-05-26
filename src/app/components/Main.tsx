"use client";
import { useEffect, useState } from "react";
// import Image from "next/image";

export default function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthingData = async () => {
      try {
        const res = await fetch(
          "https://archive.org/advancedsearch.php?q=anime&fl[]=identifier&fl[]=title&fl[]=mediatype&rows=10&page=1&output=json"
        );

        const data = await res.json();
        setData(data.response.docs);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Api data:", error);
        setLoading(false);
      }
    };
    fecthingData();
  }, []);
  return (
    <div className=" ">
      <h1 className=""> We are fecthing data </h1>
      {/* <input type="text" /> <button>Search</button> */}
      {loading ? (
        <p>Loading the data...</p>
      ) : data.length === 0 ? (
        <p>Data is not found</p>
      ) : (
        <ol>
          {data.map((res, index) => (
            <li key={index}>
              <h3>{res.title}</h3>
              <h6>{res.mediatype}</h6>
              <h6>{res.identifier}</h6>

              <video width="320" height="240" controls preload="none">
                <source src={`https://archive.org/download/${res.identifier}`}
                 type="video/mp4" />
                <track
                  src="/path/to/captions.vtt"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                Your browser does not support the video tag.
              </video>

           
              {/* <Image
                src={`https://archive.org/services/img/${res.identifier}`}
                alt={res.title}
                width={150}
                height={150}
                style={{ marginTop: "10px", height: "auto", width: "150px" }}
                unoptimized
              /> */}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
