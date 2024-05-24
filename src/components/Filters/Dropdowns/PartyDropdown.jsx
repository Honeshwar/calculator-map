"use client";
import { useEffect, useState } from "react";
import { useFilterContextValue } from "../../../context/FilterContext";
import clsx from "clsx";

export default function PartyDropdown() {
  const {
    electionType,
    selected_state,
    selected_party,
    setSelected_party,
    showPartyDropDown,
    setShowPartyDropDown,
    setShowPCDropDown,
    setShowStateDropDown,
    setShowElectionYearDropDown,
  } = useFilterContextValue();
  const [parties, setParties] = useState([]); //"BJP", "INC", "AAP", "CPI"

  useEffect(() => {
    const fetchParties = async () => {
      const param =
        electionType === "STATE"
          ? "?type=state&state=" + selected_state
          : "?type=nation";
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/analysis/party" + param
        );
        const responseData = await response.json();
        // console.log("response party", responseData);
        setParties(responseData.data);
        setSelected_party({
          party: responseData.data[0],
          state: responseData.data[0],
        });
      } catch (error) {
        console.log("error in fetch parties", error);
      }
    };
    fetchParties();
  }, [electionType, selected_state]);

  const handleSelectParty = (name) => {
    setSelected_party({ ...selected_party, party: name });
    setShowStateDropDown(false);
    setShowPartyDropDown(false);
  };
  return (
    <fieldset className="cursor-pointer border-[1.2px] border-[lightgray] rounded-md w-[250px]   py-1 pb-[8px] relative">
      <legend className="text-[12px] text-gray-500 mx-2 px-1 relative  ">
        Party <span className="text-[red]">*</span>
      </legend>
      <div
        className="w-[95%] px-2 text-gray-700 relative flex items-center"
        onClick={() => {
          //reconcilation and batching

          setShowPartyDropDown((prev) => !prev);

          //hide all other dropdowns
          setShowPCDropDown(false);
          setShowStateDropDown(false);
          setShowElectionYearDropDown(false);
        }}
      >
        <span
          id="select-box-1  "
          className="text-sm text-[black]   font-semibold"
        >
          {selected_party.party}
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
      {showPartyDropDown && (
        <div className="absolute z-[100] w-[200px] h-fit bg-white border-2 border-[#767575] rounded-lg  pb-[2px] top-9 ">
          <ul
            id="dropdown-scroll"
            className="h-[200px] w-full overflow-y-auto text-sm flex flex-col gap-1 py-0"
          >
            {parties?.map((party, index) => (
              <li
                key={index}
                className={clsx(
                  "py-2  px-6 hover:text-white hover:bg-[#ffc400] rounded-md text-sm",
                  {
                    "bg-[#ffc400] text-black font-semibold":
                      selected_party.party === party,
                    "bg-white text-black font-semibold":
                      selected_party.party !== party,
                  }
                )}
                onClick={() => handleSelectParty(party)}
              >
                {party}
              </li>
            ))}
          </ul>
        </div>
      )}
    </fieldset>
  );
}
