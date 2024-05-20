"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./navbar.module.css";
import span from "next/link";
import Image from "next/image";
import CategoryDropdown from "../../components/Navbar/CategoryDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true); //collpse state
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false); //dropdown

  //navbar collapse when clicked outside
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      console.log("first");
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // toggle collapse
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  //toggle dropdown
  const toggleDropDown = () => {
    setDropDownIsOpen(!dropDownIsOpen);
    toggleNavbar();
  };

  // on hover open the category dropdown
  const handleMouseOver = () => {
    setDropDownIsOpen(true);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className="navbar-logo">
          <span href="../index.html">
            <img src="/dhruv_logo.jpg" width={100} height={100} alt="" />
          </span>
        </div>
        <div className={styles.toggler} onClick={toggleNavbar}>
          <img src="/toggle.svg" width={30} height={30} />
        </div>
        <div
          className={`${styles.navbarLinks} ${isOpen ? styles.collapsed : ""}`}
        >
          <span href="../index.html">Home</span>
          <span href="index.html#about">About Us</span>
          <span href="index.html#what">What we do</span>
          <span href="index.html#solution1">Solutions</span>
          <a
            className={styles.activeLink}
            onClick={toggleDropDown}
            onMouseEnter={handleMouseOver}
          >
            <div className="flex flex-col">
              Insights
              {/* <img src="/Star 1.png" alt="star" /> */}
            </div>
            <div className={styles.dropDown} ref={dropdownRef}>
              {dropDownIsOpen && (
                <CategoryDropdown toggleDropDown={toggleDropDown} />
              )}
            </div>
          </a>
          <span href="index.html#join_our_panel">Join our panel</span>
          <span
            href="index.html# Election_Results"
            className={styles.activeLink}
          >
            <div className="flex flex-col">
              Election Results
              <img src="/Star 1.png" alt="star" />
            </div>
          </span>

          <span href="contact.html">Contat Us</span>
          <span href="/careers.html" className={styles.carrers}>
            <button>Careers</button>
          </span>
        </div>
        <div className={styles.carrers}>
          <span href="/careers.html">
            <button>Careers</button>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
