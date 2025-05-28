"use client";
import { useEffect, useState } from "react";

export default function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMediaData = async () => {
      try {
        const res = await fetch(
          "https://archive.org/advancedsearch.php?q=mediatype:movies+AND+format:mp4&fl[]=identifier&fl[]=title&fl[]=mediatype&rows=10&page=1&output=json"
        );
        const jsonData = await res.json();

        const docs = jsonData.response.docs;

        // Fetch metadata for each item
        const detailedData = await Promise.all(
          docs.map(async (item) => {
            try {
              const metaRes = await fetch(`https://archive.org/metadata/${item.identifier}`);
              const metaData = await metaRes.json();
              const files = metaData.files;

              // Find the first .mp4 or .mp3 file
              const mediaFile = files.find(
                (file) =>
                  file.name.endsWith(".mp4") || file.name.endsWith(".mp3")
              );

              return {
                ...item,
                mediaUrl: mediaFile
                  ? `https://archive.org/download/${item.identifier}/${mediaFile.name}`
                  : null,
              };
            } catch (err) {
              console.error("Failed to fetch metadata:", err);
              return { ...item, mediaUrl: null };
            }
          })
        );
        // const filteredData = detailedData.filter(item => item.mediaUrl !== null);
setData(detailedData);
setLoading(false);

       

    
      } catch (error) {
        console.error("Failed to fetch API data:", error);
        setLoading(false);
      }
    };

    fetchAllMediaData();
  }, []);
  

  return (
    <div className="flex  flex-col justify-center items-center    ">
      
      <h1 className="">Fetching Data from Internet Archive</h1>
      <div className="m-5">
        <input className="border-2 rounded-2xl p-2" type="text" />
        <button className="border-2 p-2 rounded-2xl">Search</button>
      </div>

      {loading ? (
        <p>Loading the data...</p>
      ) : data.length === 0 ? (
        <p>Data is not found</p>
      ) : (
        <ol>
          { data.map((res, index) => (
            <li
              key={index}
              className="flex shadow-2xl justify-center flex-col gap-5 bg-white rounded-2xl p-5 mb-5 items-center"
            >
              <h3>{res.title}</h3>
              <p>{res.mediatype}</p>
              <p>{res.identifier}</p>
              {res.mediaUrl ? (
                res.mediaUrl.endsWith(".mp4") ? (
                  <video width="320" height="240" controls>
                    <source src={res.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <audio controls>
                    <source src={res.mediaUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )
              ) : (
                <p>No playable media found</p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
