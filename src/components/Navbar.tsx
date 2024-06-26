import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import CartButtons from "./CartButtons";
import styled from "styled-components";
import { links } from "../utils/constants";
import { useAppDispatch } from "../hooks";
import { openSidebar } from "../slices/sidebarSlice";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar: React.FC = () => {
  const { user } = useAuth0();
  // const user: boolean = true;
  const dispatch = useAppDispatch();
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLinkClick = (navLink: string) => {
    setActiveLink(navLink);
  };

  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} data-test="logo" alt="comfy sloth" />
          </Link>
          <button
            className="nav-toggle"
            type="button"
            onClick={() => dispatch(openSidebar())}
          >
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link
                  to={url}
                  id="home"
                  data-test={text}
                  className={activeLink === url ? "active" : ""}
                  onClick={() => handleLinkClick(url)}
                >
                  {text}
                </Link>
              </li>
            );
          })}
          {user && (
            <li>
              <Link
                to="/checkout"
                data-test="/checkout"
                className={activeLink === "/checkout" ? "active" : ""}
                onClick={() => handleLinkClick("/checkout")}
              >
                checkout
              </Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
      a.active {
        border-bottom: 2px solid var(--clr-primary-7);
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Navbar;
