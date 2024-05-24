"use client";
import { useEffect, useState } from "react";
import { useFilterContextValue } from "../../../context/FilterContext";
import clsx from "clsx";

export default function ElectionYearDropdown() {
  const [years, setYears] = useState([2019]);

  const handleSelectElectionYear = (ElectionYear) => {
    setShowElectionYearDropDown(false);
    console.log("ElectionYear", ElectionYear);
    setSelected_election_year(ElectionYear);
  };

  const {
    selected_election_year,
    setSelected_election_year,
    showElectionYearDropDown,
    setShowElectionYearDropDown,
    setShowStateDropDown,
    setShowPCDropDown,
    setShowPartyDropDown,
  } = useFilterContextValue();
  return (
    <fieldset className=" border-[1.2px] border-[lightgray] rounded-md w-[250px]   py-1 pb-[8px] relative">
      <legend className="text-[12px] text-gray-500 mx-2 px-1 relative">
        Election Year <span className="text-[red]">*</span>
      </legend>
      <div className="w-[95%] px-2 text-gray-500 relative flex items-center">
        <span id="select-box-3 " className="text-sm text-black font-semibold">
          {selected_election_year + " LS"}
        </span>
      </div>

      {/* <!-- drop down --> */}
      {showElectionYearDropDown && (
        <div className="absolute z-[1] w-[200px] bg-white border-2 border-[#767575] rounded-lg   top-9">
          <ul
            id="dropdown-scroll"
            className="h-[200px] overflow-y-auto text-sm flex flex-col gap-1 py-0"
          >
            {years.map((year, index) => (
              <li
                key={"year-" + index}
                className={clsx(
                  "py-2  px-6 hover:text-white hover:bg-[#ffc400]  rounded-md",
                  {
                    "bg-[#ffc400] text-black  font-semibold":
                      selected_election_year === year,
                    "bg-white text-black  font-semibold":
                      selected_election_year !== year,
                  }
                )}
                onClick={() => handleSelectElectionYear(year)}
              >
                {year + " LS"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </fieldset>
  );
}
