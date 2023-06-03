import { fetchPaperDetails } from "@/api";
import React from "react";

function papers({ data }) {
  console.log(data);
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">My Papers</h1>
      {data.map((paper) => (
        <div className="bg-white shadow-lg rounded-lg p-6 my-4">
          <h2 className="text-xl font-semibold mb-2">{paper.title}</h2>
          <p className="text-gray-700 mb-4">{paper.abstract}</p>
          {/* <p className="text-sm text-gray-500 mb-2">
            Author: {paper.author.name} ({paper.author.email})
          </p> */}
          <p className="text-sm text-gray-500 mb-2">
            CoAuthors: {paper.coAuthors.map((coAuthor) => coAuthor.user.name)} (
            {paper.coAuthors.map((coAuthor) => coAuthor.user.email)})
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Keywords: {paper.keywords.map((keyword) => keyword.word).join(", ")}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Conference Name: {paper.conference.name}
          </p>
          <a
            href={paper.fileURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            Download Paper
          </a>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const response = await fetchPaperDetails(req);
    const data = response?.data?.result;

    return {
      props: { data },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { data: [] },
    };
  }
}

export default papers;
