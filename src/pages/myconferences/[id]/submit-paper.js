import { uploadPaper } from "@/api";
import { ArrowLeftCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    display: "flex",
    height: "40px",
    width: "100%",
    borderRadius: "0.375rem",
    borderWidth: "1px",
    borderColor: state.isFocused ? "#3f83f8" : "#e2e8f0",
    backgroundColor: "transparent",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#4b5563",
    outline: "none",
    boxShadow: state.isFocused ? "0 0 0 2px #3f83f8" : "none",
    cursor: state.isDisabled ? "not-allowed" : "default",
    opacity: state.isDisabled ? 0.5 : 1,
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.375rem",
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3f83f8"
      : state.isFocused
      ? "#e2e8f0"
      : "transparent",
    color: state.isSelected ? "#ffffff" : "#4b5563",
    "&:hover": {
      backgroundColor: "#e2e8f0",
    },
  }),
};

const options = [
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Augmented Reality", label: "Augmented Reality" },
];

function SubmitPaper(props) {
  const router = useRouter();
  const [paperDetails, setPaperDetails] = useState({
    title: "",
    abstract: "",
    keywords: [],
    coAuthors: [{ name: "", email: "" }],
    paper: "",
    conferenceId: "",
  });

  const conferenceId = router.query.conferenceId;
  console.log(conferenceId);

  useEffect(() => {
    setPaperDetails({ ...paperDetails, conferenceId: conferenceId });
  }, [conferenceId]);
  console.log(paperDetails);

  const addCoAuthorsField = (e) => {
    e.preventDefault();
    setPaperDetails((prevState) => ({
      ...prevState,
      coAuthors: [...prevState.coAuthors, { name: "", email: "" }],
    }));
  };

  const removeCoAuthorsField = (index) => {
    setPaperDetails((prevState) => ({
      ...prevState,
      coAuthors: prevState.coAuthors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // console.log(paperDetails);

      const formData = new FormData();

      Object.keys(paperDetails).forEach((key) => {
        if (key === "keywords" || key === "coAuthors") {
          formData.append(key, JSON.stringify(paperDetails[key]));
        } else {
          formData.append(key, paperDetails[key]);
        }
      });

      try {
        const res = await uploadPaper(formData);

        console.log(res);
        router.push("/papers");
      } catch (error) {
        console.log(error);
      }
    },
    [paperDetails]
  );

  return (
    <div className="max-w-4xl mx-auto py-8 text-gray-700">
      <div className="flex items-center">
        <ArrowLeftCircleIcon
          className="h-7 w-7 mr-10 cursor-pointer"
          onClick={() => router.push("/myconferences")}
        />
        <h1 className="text-3xl font-bold text-gray-700">Submit Your Paper</h1>
      </div>
      <form className="ml-[70px] grid gap-y-4 mt-6" action="">
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              id="title"
              placeholder="Enter the title of the paper"
              type="text"
              // disabled={isLoading || isGitHubLoading}
              onChange={(e) =>
                setPaperDetails({ ...paperDetails, title: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="keywords" className="font-semibold">
              Keywords
            </label>
            <Select
              id="keywords"
              options={options}
              isMulti
              isSearchable
              onChange={(selectedOption) =>
                setPaperDetails({
                  ...paperDetails,
                  keywords: selectedOption.map((option) => option.value),
                })
              }
              styles={customStyles}
            />
          </div>
        </div>
        <div className="grid gap-1">
          <label htmlFor="abstract" className="font-semibold">
            Abstract
          </label>
          <textarea
            id="abstract"
            placeholder="Enter the abstract of the paper"
            type="text"
            // disabled={isLoading || isGitHubLoading}
            onChange={(e) =>
              setPaperDetails({ ...paperDetails, abstract: e.target.value })
            }
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-32"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="paper" className="font-semibold">
            Upload your paper
          </label>
          <input
            type="file"
            name="paper"
            id="paper"
            onChange={(e) =>
              setPaperDetails({ ...paperDetails, paper: e.target.files[0] })
            }
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
          />
        </div>
        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <label htmlFor="paper" className="font-semibold">
              Add Co-Authors
            </label>
            <button
              onClick={(e) => addCoAuthorsField(e)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
            >
              Add CoAuthors
            </button>
          </div>
          {paperDetails.coAuthors.map((coAuthor, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-x-4 mt-4"
            >
              <input
                type="text"
                placeholder="Name"
                value={coAuthor.name || ""}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
                onChange={(e) => {
                  const newCoAuthors = [...paperDetails.coAuthors];
                  newCoAuthors[index].name = e.target.value;
                  setPaperDetails({ ...paperDetails, coAuthors: newCoAuthors });
                }}
              />
              <input
                type="text"
                placeholder="Email"
                value={coAuthor.email || ""}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10"
                onChange={(e) => {
                  const newCoAuthors = [...paperDetails.coAuthors];
                  newCoAuthors[index].email = e.target.value;
                  setPaperDetails({ ...paperDetails, coAuthors: newCoAuthors });
                }}
              />
              <XMarkIcon
                onClick={() => removeCoAuthorsField(index)}
                className="h-7 w-16 bg-red-500 rounded-lg text-white cursor-pointer"
              />
            </div>
          ))}
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

export default SubmitPaper;
