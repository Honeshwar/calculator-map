"use client";
import React, { useEffect, useState } from "react";
import { useFilterContextValue } from "../../../context/FilterContext";
import clsx from "clsx";

export default function PC_Dropdown() {
  const [constituency, setConstituency] = useState(["Saharanpur"]);
  const {
    selected_pc,
    setSelected_pc,
    showPCDropDown,
    setShowPCDropDown,
    setShowStateDropDown,
    setShowElectionYearDropDown,
    setShowPartyDropDown,
  } = useFilterContextValue();

  useEffect(() => {
    const fetchPC = async () => {
      try {
        const response = await fetch();
        const responseData = await response.json();

        setConstituency(responseData.data);
      } catch (error) {
        console.log("error in fetch constituency", error);
      }
    };
    // fetchPC();
  }, []);

  const handleSelectPC = (constituency) => {
    setSelected_pc(constituency);
    setShowPCDropDown(false);
  };
  //   useEffect(() => {
  //     const fetchConstituency = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://dhruvresearch.com/api/v2/result/constituency?state=${select_state}&election_type=${
  //             select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //           }&limit=100`
  //         );
  //         const responseData = await response.json();
  //         //console.log("result", responseData);
  //         // setSelect_constituency(responseData.data);
  //         setConstituency(responseData.data);
  //       } catch (error) {
  //         //console.log("error in fetch constituency", error);
  //       }
  //     };
  //     if (select_state !== "Select State") {
  //       fetchConstituency();
  //     } else {
  //       setSelect_constituency(
  //         select_sabha === "Vidhan Sabha"
  //           ? {
  //               acNo: -1,
  //               acName: "Select AC",
  //             }
  //           : {
  //               pcNo: -1,
  //               pcName: "Select PC",
  //             }
  //       );
  //     }
  //   }, [select_state]);

  //   useEffect(() => {
  //     setSelect_constituency(
  //       select_sabha === "Vidhan Sabha"
  //         ? {
  //             acNo: -1,
  //             acName: "Select AC",
  //           }
  //         : {
  //             pcNo: -1,
  //             pcName: "Select PC",
  //           }
  //     );
  //   }, [select_sabha]);

  //   const handleSelectConstituency = (constituency) => {
  //     resetFilterToInitial(2);
  //     setSelect_constituency(constituency);
  //     setShowConstituencyDropDown(false);
  //   };
  return (
    <fieldset className="cursor-pointer border-[1px] border-[lightgray] rounded-md w-[250px]  py-1 pb-[8px] relative">
      <legend className="text-[12px] text-gray-500 mx-2 px-1 relative">
        PC
        <span className="text-[red]">*</span>
      </legend>
      <div
        className="w-[95%] px-2 text-gray-700 relative flex items-center"
        onClick={() => {
          //reconcilation and batching

          setShowPCDropDown((prev) => !prev);
          // hide other dropdowns
          setShowStateDropDown(false);
          setShowElectionYearDropDown(false);
          setShowPartyDropDown(false);
        }}
      >
        <span id="select-box-2" className="text-sm text-black font-semibold">
          {selected_pc}
        </span>
        <span className="text-[gray] absolute right-[2px]">
          <svg
            className="w-4"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32.000000 32.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
              fill="gray"
              stroke="none"
            >
              <path
                d="M50 197 c0 -18 92 -107 111 -107 18 0 109 90 109 108 0 23 -24 12
            -67 -30 l-43 -42 -43 42 c-43 42 -67 53 -67 29z"
              />
            </g>
          </svg>
        </span>
      </div>

      {/* <!-- drop down --> */}
      {showPCDropDown && (
        <div className="absolute z-[1] w-[200px] bg-white border-2 border-[#767575] rounded-lg  pb-[2px] top-9 ">
          <ul
            id="dropdown-scroll"
            className="h-[200px] overflow-y-auto text-sm flex flex-col gap-1"
          >
            {constituency.map((constituency, index) => (
              <li
                key={index}
                className={clsx(
                  "py-2  px-6 hover:text-white hover:bg-[#ffc400] rounded-md",
                  {
                    "bg-[#ffc400] text-black font-semibold":
                      selected_pc === constituency,
                    "bg-white text-black font-semibold":
                      selected_pc !== constituency,
                  }
                )}
                onClick={() => handleSelectPC(constituency)}
              >
                {constituency}
              </li>
            ))}
          </ul>
        </div>
      )}
    </fieldset>
  );
}
