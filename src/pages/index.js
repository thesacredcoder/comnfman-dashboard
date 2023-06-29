import Image from "next/image";
import { Inter } from "next/font/google";
import PageLayout from "@/components/PageLayout";
import { useUser } from "@/hooks/useUser";
import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  DocumentIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  fetchPaperDetails,
  fetchMyConfernces,
  fetchCreatedConferences,
} from "@/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  paperDetailsData,
  myConferencesData,
  createdConferecesData,
}) {
  const { user, setUser } = useUser();

  return (
    <section className="max-w-6xl mx-auto py-8 ">
      <h1 className="text-3xl border-b-2 mb-4 py-1 font-semibold">
        Dashboard - Hi, there {user?.data?.name}!
      </h1>

      {user?.data?.role === "AUTHOR" && (
        <div className="flex gap-4 justify-between">
          <div className="h-26 w-60 bg-white shadow-md rounded-md relative">
            <div className="flex items-start gap-4 p-4">
              <DocumentIcon className="h-10 w-10" />
              <p className="text-2xl font-medium">Papers Submitted</p>
            </div>
            <p className="w-full text-3xl font-semibold text-center">
              {paperDetailsData.length ?? 0}
            </p>
            <p className="text-[9px] px-4 pt-1 pb-4 border-t absolute bottom-0 left-0">
              This shows the amount of papers you have submitted so far
            </p>
          </div>

          <div className="h-26 w-60 bg-white shadow-md rounded-md">
            <div className="flex items-start gap-4 p-4">
              <AcademicCapIcon className="h-10 w-10" />
              <p className="text-2xl font-medium">Conferences Joined</p>
            </div>
            <p className="w-full text-3xl font-semibold text-center">
              {myConferencesData?.conferences?.length ?? 0}
            </p>
            <p className="text-[9px] px-4 pt-1 mt-2 pb-4 border-t">
              This shows the amount of papers you have submitted so far
            </p>
          </div>

          <div className="h-26 w-60 bg-white shadow-md rounded-md relative">
            <div className="flex items-start gap-4 p-4">
              <ComputerDesktopIcon className="h-10 w-10" />
              <p className="text-2xl font-medium">Ongoing Conferences</p>
            </div>
            <p className="w-full text-3xl font-semibold text-center">
              {/* {data.length ?? 0} */}0
            </p>
            <p className="text-[9px] px-4 pb-4 pt-1 mt-2 absolute bottom-0 left-0 border-t">
              This shows the number of conferences that are currently ongoing
              and you haven't joined so far
            </p>
          </div>
        </div>
      )}

      {user?.data?.role === "MANAGER" && (
        <div className="flex gap-4 justify-between">
          <div className="h-26 w-60 bg-white shadow-md rounded-md flex flex-col gap-4">
            <div className="flex items-start gap-4 px-4 py-2">
              <AcademicCapIcon className="h-10 w-10" />
              <p className="text-2xl font-medium">Conference Created</p>
            </div>
            <p className="w-full text-3xl font-semibold text-center">
              {paperDetailsData.length !== 0 ? paperDetailsData.length : 2}
            </p>
            <p className="text-[9px] px-4 pt-1 pb-4 border-t">
              This shows the number of conferences created
            </p>
          </div>

          <div className="h-26 w-60 bg-white shadow-md rounded-md flex flex-col gap-4">
            <div className="flex items-start gap-4 px-4 py-2">
              <UserCircleIcon className="h-10 w-10" />
              <p className="text-2xl font-medium">Authors Joined</p>
            </div>
            <p className="w-full text-3xl font-semibold text-center">
              {paperDetailsData.length ?? 0}
            </p>
            <p className="text-[9px] px-4 pt-1 pb-4 border-t">
              This shows the number of authors who have joined the conference
            </p>
          </div>

          <div className="h-26 w-60 bg-white shadow-md rounded-md flex flex-col gap-4">
            <div className="flex items-start gap-4 px-4 py-2">
              <UserGroupIcon className="h-10 w-10" />
              <p className="text-2xl font-medium">Reviewers Joined</p>
            </div>
            <p className="w-full text-3xl font-semibold text-center">
              {paperDetailsData.length ?? 0}
            </p>
            <p className="text-[9px] px-4 pt-1 pb-4 border-t">
              This shows the number of reviewers who have joined the conference
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    const { req } = context;

    const paperDetailsResponse = await fetchPaperDetails(req);
    const paperDetailsData = paperDetailsResponse?.data?.result;

    const myConferencesResponse = await fetchMyConfernces(req);
    const myConferencesData = myConferencesResponse?.data?.result;

    // const createdConferencesResponse = await fetchCreatedConferences(req);
    // const createdConferecesData = createdConferencesResponse?.data?.result;

    return {
      props: {
        paperDetailsData,
        myConferencesData,
        // createdConferecesData,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        paperDetailsData: [],
        myConferencesData: [],
        // createdConferecesData: [],
      },
    };
  }
}
