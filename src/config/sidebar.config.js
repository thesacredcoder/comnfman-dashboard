import {
  ComputerDesktopIcon,
  DocumentIcon,
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export const sidebarConfig = [
  {
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
    roles: ["AUTHOR", "MANAGER"],
  },
  {
    name: "Papers",
    href: "/papers",
    icon: DocumentIcon,
    roles: ["AUTHOR"],
  },
  {
    name: "Conferences",
    href: "/conferences",
    icon: ComputerDesktopIcon,
    roles: ["AUTHOR"],
  },
  {
    name: "My Confs",
    href: "/myconferences",
    icon: AcademicCapIcon,
    roles: ["AUTHOR"],
  },
  {
    name: "My Confs",
    href: "/created-conferences",
    icon: AcademicCapIcon,
    roles: ["MANAGER"],
  },
  {
    name: "Assigned Reviews",
    href: "/assigned-reviews",
    icon: BookOpenIcon,
    roles: ["REVIEWER"],
  },
];
