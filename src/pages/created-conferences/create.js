import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Select from "react-select";
import { customStyles } from "../myconferences/[id]/submit-paper";
import { createConference } from "@/api";

const statusOptions = [
  { value: "ONGOING", label: "ONGOING" },
  { value: "CLOSED", label: "CLOSED" },
  { value: "UPCOMING", label: "UPCOMING" },
];

function Create(props) {
  const router = useRouter();
  const [conference, setConference] = useState({
    name: "",
    description: "",
    organization: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(conference);
    await createConference(conference);

    router.back();
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-x-4">
        <ArrowLeftCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => router.back()}
        />
        <h3 className="text-3xl font-bold text-gray-700">
          Create a new Conference
        </h3>
      </div>

      <form className="ml-[70px] grid gap-y-4 mt-6">
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <label htmlFor="title" className="font-semibold">
              Name of the conference
            </label>
            <input
              id="title"
              placeholder="Enter the name of the conference"
              type="text"
              onChange={(e) =>
                setConference({ ...conference, name: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="keywords" className="font-semibold">
              Status
            </label>
            <Select
              id="keywords"
              options={statusOptions}
              onChange={(selectedOption) =>
                setConference({
                  ...conference,
                  status: selectedOption.value,
                })
              }
              styles={customStyles}
            />
          </div>
        </div>
        <div className="grid gap-1">
          <label htmlFor="abstract" className="font-semibold">
            Description
          </label>
          <textarea
            id="abstract"
            placeholder="Enter the description of the paper"
            type="text"
            // disabled={isLoading || isGitHubLoading}
            onChange={(e) =>
              setConference({ ...conference, description: e.target.value })
            }
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-32"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="organization" className="font-semibold">
            Organization
          </label>
          <input
            type="text"
            name="organization"
            id="organization"
            placeholder="Enter you organization name"
            onChange={(e) =>
              setConference({ ...conference, organization: e.target.value })
            }
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-1">
          <div>
            <label htmlFor="startDate" className="font-semibold">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              onChange={(e) =>
                setConference({ ...conference, startDate: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="font-semibold">
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              onChange={(e) =>
                setConference({ ...conference, endDate: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
