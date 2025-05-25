"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthingData = async () => {
      try {
        const res = await fetch(
          "https://archive.org/advancedsearch.php?q=subject%3A(data)&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=mediatype&fl[]=description&rows=20&page=1&output=json"
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
    <div className="">
      <h1> We are fecthing data </h1>
      {loading ? (
        <p>Loading the data...</p>
      ) : data.length === 0 ? (
        <p>Data is not found</p>
      ) : (
        <ol>
          {data.map((res, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <h3>{res.title}</h3>
              <h4>{res.creator || "unknown"}</h4>
              <h5>{res.description}</h5>
              <h6>{res.mediatype}</h6>
              <Image
                src={`https://archive.org/services/img/${res.identifier}`}
                alt={res.title}
                width={150}
                height={150}
                style={{ marginTop: "10px", height: "auto", width: "150px" }}
                unoptimized
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
