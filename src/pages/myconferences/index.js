import { fetchMyConfernces } from "@/api";
import { useRouter } from "next/router";
import React from "react";
import { Badge } from "../conferences";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function ConferenceCard({ conference }) {
  const { name, description, startDate, endDate, status, organization } =
    conference;

  const router = useRouter();

  const handleJoin = async (conference) => {
    // const res = await joinConference(conferenceId);
    // if (res?.data) {
    //   router.push("/myconferences");
    // }

    const encode = Buffer.from(conference.name).toString("base64");

    router.push(
      `myconferences/${encode}/submit-paper?conferenceId=${conference.id}`
    );
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
      <button
        className="inline-flex items-center gap-x-2 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 mt-4"
        onClick={() => handleJoin(conference)}
      >
        Submit your paper
        <ChevronRightIcon className="h-4 w-4 mt-1" />
      </button>
    </div>
  );
}

function MyConferences({ data }) {
  if (data?.conferences?.length === 0) {
    return (
      <div className="max-w-4xl mx-auto h-full py-8 relative">
        <h1 className="text-3xl font-bold mb-8 text-gray-700">Conferences</h1>

        <p className="text-gray-700">
          You have not joined any conference so far...
        </p>
        <Link
          href="/conferences"
          className="absolute top-1/2 left-1/2 bg-primary text-accent p-2 rounded-xl"
        >
          Go to conferences
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h3 className="text-3xl font-bold mb-8 text-gray-700">My Conferences</h3>
      {data?.conferences?.map((conference) => (
        <ConferenceCard key={conference.id} conference={conference} />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const response = await fetchMyConfernces(req);
    const data = response?.data?.result;

    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: [] },
    };
  }
}

export default MyConferences;
