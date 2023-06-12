import Link from "next/link";

import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage(props) {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [selectedRole, setSelectedRole] = useState("AUTHOR");

  const [isLoading, setIsLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle user login here
    setIsLoading(true);

    const newUserDetails = { ...userDetails, role: selectedRole };

    console.log(newUserDetails);

    try {
      const res = await fetch(
        process.env.CONFMAN_API_BASE_URL + "users/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUserDetails),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.error || data.message);
      }

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabClick = (role) => {
    setSelectedRole(role);
  };

  const renderTab = (role, label) => {
    const isActive = selectedRole === role;
    const tabClasses = [
      "py-2 px-4",
      "rounded-xl",
      "font-semibold",
      "focus:outline-none",
      isActive
        ? "bg-white text-blue-600 border-b-2 border-blue-600"
        : "bg-gray-200 text-gray-600",
    ].join(" ");

    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          handleTabClick(role);
        }}
        className={tabClasses}
        role="tab"
        tabIndex={isActive ? "0" : "-1"}
      >
        {label}
      </button>
    );
  };

  return (
    <section className="container flex h-screen w-screen flex-col items-center justify-center">
      <ToastContainer />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="text-sm text-gray-700">
            Enter your email to sign in to your account
          </p>
        </div>
        <div className="grid gap-6 text-gray-700" {...props}>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="flex justify-center mb-4 space-x-2">
                {renderTab("AUTHOR", "Author")}
                {renderTab("REVIEWER", "Reviewer")}
                {renderTab("MANAGER", "Manager")}
              </div>
              <div className="grid gap-1">
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading || isGitHubLoading}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" // Add your Tailwind CSS classes here
                />
              </div>
              <div className="grid gap-1">
                <label className="sr-only" htmlFor="email">
                  Pasword
                </label>
                <input
                  id="password"
                  placeholder="password"
                  type="password"
                  disabled={isLoading || isGitHubLoading}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" // Add your Tailwind CSS classes here
                />
              </div>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4" // Add your Tailwind CSS classes here
                disabled={isLoading}
              >
                {isLoading && (
                  // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  <h2>Spinner</h2>
                )}
                Sign In with Email
              </button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
            onClick={() => {
              setIsGitHubLoading(true);
              signIn("github");
            }}
            disabled={isLoading || isGitHubLoading}
          >
            {isGitHubLoading ? (
              // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              <p>Something</p>
            ) : (
              // <Icons.gitHub className="mr-2 h-4 w-4" />
              <p>Github Icon</p>
            )}
            Github
          </button>
          <div>
            <p className="px-8 text-center text-sm text-gray-600">
              <Link
                href="/register"
                className="hover:text-brand underline underline-offset-4"
              >
                Don't have an account? Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
