import Link from "next/link";
import React, { useState } from "react";

import { useUser } from "../hooks/useUser";
import { useRouter } from "next/router";

function register(props) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setUser } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newUserDetails = { ...userDetails, role: selectedRole };

    try {
      const res = await fetch(
        // process.env.CONFMAN_API_BASE_URL + "users/signup",
        "http://localhost:4000/users/signup",
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

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 absolute right-4 top-4 md:right-8 md:top-8"
      >
        Login
      </Link>
      <div className="h-full bg-muted flex flex-col w-full items-center justify-center gap-4">
        <h1>Choose your role</h1>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-primary border-2 hover:text-white focus:bg-primary focus:text-white hover:bg-primary/90 h-10 py-2 px-4"
          onClick={() => setSelectedRole("AUTHOR")}
        >
          Author
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-primary border-2 hover:text-white focus:bg-primary focus:text-white hover:bg-primary/90 h-10 py-2 px-4"
          onClick={() => setSelectedRole("REVIEWER")}
        >
          Reviewer
        </button>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-primary border-2 hover:text-white focus:bg-primary focus:text-white hover:bg-primary/90 h-10 py-2 px-4"
          onClick={() => setSelectedRole("MANAGER")}
        >
          Manager
        </button>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account {selectedRole ?? ""}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <label className="sr-only" htmlFor="email">
                  Name
                </label>
                <input
                  id="name"
                  placeholder="name"
                  type="text"
                  disabled={isLoading || isGitHubLoading}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" // Add your Tailwind CSS classes here
                />
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
                Sign Up with Email
              </button>
            </div>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default register;
