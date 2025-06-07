"use client";
import { useEffect, useState } from "react";

export default function PDF() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const res = await fetch(
          "https://archive.org/advancedsearch.php?q=format:pdf&fl[]=identifier&fl[]=title&fl[]=mediatype&rows=10&page=1&output=json"
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

              // Find PDF file
              const pdfFile = files.find((file) => file.name.endsWith(".pdf"));

              return {
                ...item,
                pdfUrl: pdfFile
                  ? `https://archive.org/download/${item.identifier}/${pdfFile.name}`
                  : null,
              };
            } catch (err) {
              console.error("Failed to fetch metadata:", err);
              return { ...item, pdfUrl: null };
            }
          })
        );

        // Only keep entries that have a PDF file
        const filteredData = detailedData.filter((item) => item.pdfUrl !== null);
        setData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch API data:", error);
        setLoading(false);
      }
    };

    fetchPdfData();
  }, []);

  return (
    <div className="flex flex-col    justify-center items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">PDF Files from Internet Archive</h1>

      {loading ? (
        <p>Loading the data...</p>
      ) : data.length === 0 ? (
        <p>No PDF data found.</p>
      ) : (
        <ol className="w-full max-w-3xl space-y-6">
          {data.map((res, index) => (
            <li
              key={index}
              className="bg-white p-5 rounded-2xl shadow-lg flex flex-col items-start gap-3"
            >
              <h3 className="text-lg font-semibold">{res.title}</h3>
              <p>Media Type: {res.mediatype}</p>
              <p>Identifier: {res.identifier}</p>
              <a
                href={res.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download PDF
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
