import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAppContext from "../Context/Context";

const Navbar = () => {
  const { pathname } = useRouter();
  const { dataCards, setDataCards, setFlag } = useAppContext();

  function mayorAMenor() {
    const orderPeople = dataCards.sort((a, b) => {
      if (a.age > b.age) return -1;
      if (a.age < b.age) return 1;
      return 0;
    });
    setDataCards(orderPeople);
    setFlag(true);
  }

  function menorAMayor() {
    const orderPeople2 = dataCards.sort((a, b) => {
      if (a.age < b.age) return -1;
      if (a.age > b.age) return 1;
      return 0;
    });
    setDataCards(orderPeople2);
    setFlag(false);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white text-logo">Peoples</a>
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
                      onClick={() => mayorAMenor()}
                    >
                      From older to younger
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => menorAMayor()}
                    >
                      From smallest to largest
                    </button>
                  </li>
                </ul>
              </li>

              <li className="nav-item pt-2">
                <Link aria-current="page" href="/">
                  <span className="text-nav">Add user</span>
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
