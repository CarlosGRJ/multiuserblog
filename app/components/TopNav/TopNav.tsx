import React from "react";
import Link from "next/link";

import ThemeToggle from "../Theme/ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { AuthStatus } from "@/app/interfaces/utils.d";

function TopNav() {
  const { data: session, status } = useSession();
  console.log("{ session, status } ", { session, status });

  const onSignOut = () => {
    void signOut({ redirect: false });
  };

  return (
    <nav className="nav shadow justify-content-between mb-2">
      <div className="d-flex justify-content-start">
        <Link className="nav-link" href="/">
          📙📚 Next Blog
        </Link>

        <Link className="nav-link" href="/">
          Write a Blog
        </Link>
      </div>

      <div className="d-flex align-items-center">
        {status === AuthStatus.AUTHENTICATED ? (
          <>
            <Link href="/dashboard/user" className="nav-link">
              {session?.user?.name}
            </Link>

            <Link onClick={onSignOut} className="nav-link" href={"/login"}>
              Logout
            </Link>
          </>
        ) : (
          <div className="d-flex justify-content-center">
            <Link className="nav-link" href="/login">
              Login
            </Link>

            <Link className="nav-link" href="/register">
              Register
            </Link>
          </div>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}

export default TopNav;
