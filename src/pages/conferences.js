import { fetchAllConferences, joinConference } from "@/api";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export function Badge({ label, color }) {
  switch (label) {
    case "ONGOING":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-500 text-green-100">
          {label}
        </span>
      );
    case "CLOSED":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-500 text-red-100">
          {label}
        </span>
      );
    case "UPCOMING":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-500 text-blue-100">
          {label}
        </span>
      );
  }
}

function ConferenceCard({ conference }) {
  const { name, description, startDate, endDate, status, organization } =
    conference;

  const router = useRouter();

  const handleJoin = async (conferenceId) => {
    const res = await joinConference(conferenceId);
    if (res?.data) {
      router.push("/myconferences");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-800 font-semibold text-lg mb-2">{name}</h3>
        <Badge label={status} color="badge-color-green" />
      </div>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="text-gray-500 text-xs mb-2">
        <span className="font-semibold">Dates:</span> {startDate} - {endDate}
      </div>
      <div className="text-gray-500 text-xs">
        <span className="font-semibold">Organization:</span> {organization}
      </div>
      <div className="flex items-center gap-4">
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 mt-4 disabled:cursor-not-allowed"
          onClick={() => handleJoin(conference.id)}
          disabled={conference.status === "UPCOMING"}
        >
          Join
        </button>
        {conference.status === "UPCOMING" && (
          <InformationCircleIcon className="h-5 w-5 mt-4" />
        )}
      </div>
    </div>
  );
}

function Conferences({ conferences }) {
  if (conferences.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-700">Conferences</h1>
        <p className="text-gray-700">
          There are no ongoing conferences currently
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-700">Conferences</h1>
      <div className="flex flex-col space-y-4">
        {conferences.map((conference) => (
          <ConferenceCard key={conference.id} conference={conference} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const response = await fetchAllConferences(req);
    const conferences = response?.data?.result;

    return {
      props: { conferences },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { conferences: [] },
    };
  }
}

export default Conferences;
