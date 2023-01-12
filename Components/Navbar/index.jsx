import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAppContext from "../Context/Context";

const Navbar = () => {
  const { pathname } = useRouter();
  const { majorToMinor, minorToMajor, setFlag } = useAppContext();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white text-logo ms-4">Peoples</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item pt-2">
                <Link aria-current="page" href="/">
                  <span onClick={() => setFlag(null)} className="text-nav">
                    Home
                  </span>
                </Link>
              </li>
              {pathname !== `/profile/[id]` && pathname !== `/profile/new` && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-nav"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Organize
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => majorToMinor()}
                      >
                        From older to younger
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => minorToMajor()}
                      >
                        From smallest to largest
                      </button>
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item pt-2">
                <Link aria-current="page" href="/profile/new">
                  <span
                    className={
                      pathname !== `/profile/[id]` &&
                      pathname !== `/profile/new`
                        ? "text-nav"
                        : "text-nav ms-2"
                    }
                  >
                    Add user
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
