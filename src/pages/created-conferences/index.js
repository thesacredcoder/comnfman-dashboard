import { fetchCreatedConferences, updateConference } from "@/api";
import React, { useState } from "react";
import { Badge } from "../conferences";
import { ChevronRightIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import { customStyles } from "../myconferences/[id]/submit-paper";
import { useRouter } from "next/router";

const statusOptions = [
  { value: "ONGOING", label: "ONGOING" },
  { value: "CLOSED", label: "CLOSED" },
  { value: "UPCOMING", label: "UPCOMING" },
];

function ConferenceCard({ conference, onUpdate }) {
  const { name, description, startDate, endDate, status, organization } =
    conference;
  const [showModal, setShowModal] = useState(false);
  const [editFields, setEditFields] = useState(conference);

  const toggleModal = () => setShowModal((prevShowModal) => !prevShowModal);

  const handleSaveModal = async (e) => {
    e.preventDefault();
    console.log(editFields);

    const conferenceId = editFields.id;

    try {
      const response = await updateConference(conferenceId, editFields);
      console.log("the response", response?.data);
      onUpdate(response?.data?.result);
    } catch (error) {
      console.error("Error updating conference:", error);
    }

    toggleModal();
  };

  const selectedStatus = statusOptions.find(
    (option) => option.value === editFields.status
  );

  const handleStatusChange = (selectedOption) => {
    console.log("the option", selectedOption);
    setEditFields({ ...editFields, status: selectedOption.value });
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
        onClick={toggleModal}
      >
        Update Details
        <ChevronRightIcon className="h-4 w-4 mt-1" />
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-25"
          onClick={toggleModal}
        >
          <div className="relative w-4/5 max-w-4xl mx-auto my-6">
            <div
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Update Conference Details
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={toggleModal}
                >
                  <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>

              <div className="relative p-6 flex-auto">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={editFields.name}
                    onChange={(e) =>
                      setEditFields({ ...editFields, name: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Description:
                  </label>
                  <textarea
                    id="description"
                    value={editFields.description}
                    onChange={(e) =>
                      setEditFields({
                        ...editFields,
                        description: e.target.value,
                      })
                    }
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-20"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Status:
                  </label>
                  <Select
                    id="status"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    options={statusOptions}
                    // styles={customStyles}
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-4 justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
                  type="button"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  className="inline-flex items-center gap-x-2 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
                  type="button"
                  onClick={handleSaveModal}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CreatedConferences({ data }) {
  const [conferences, setConferences] = useState(data);

  const updateConferenceData = (updatedConference) => {
    setConferences((prevConferences) =>
      prevConferences.map((conf) =>
        conf.id === updatedConference.id ? updatedConference : conf
      )
    );
  };

  const router = useRouter();
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold mb-8 text-gray-700">
          My Conferences
        </h3>
        <button
          className="inline-flex items-center gap-x-2 justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 mb-8"
          onClick={() => router.push("created-conferences/create")}
        >
          Create Conference
          <SquaresPlusIcon className="h-5 w-5" />
        </button>
      </div>
      {conferences?.map((conference) => (
        <ConferenceCard
          key={conference.id}
          conference={conference}
          onUpdate={updateConferenceData}
        />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const response = await fetchCreatedConferences(req);
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

export default CreatedConferences;
