"use client";
import { clsx } from "clsx";
import ElectionYearDropdown from "./Dropdowns/ElectionYearDropdown";
import PartyDropdown from "./Dropdowns/PartyDropdown";
import StateDropdown from "./Dropdowns/StateDropdown";
import VoterShareSlider from "./Voter Share/VoterShareSlider";
import PC_Dropdown from "./Dropdowns/PC_Dropdown";
import { useFilterContextValue } from "../../context/FilterContext";

export default function Filters() {
  const { electionType, setElectionType } = useFilterContextValue();

  // w-1/4 h-full min-w-[300px]
  return (
    <div
      className="w-fit h-full min-w-[300px] px-5 py-4 rounded-lg lg:overflow-auto "
      style={{ boxShadow: "0px 0px 10px .5px lightgray" }}
    >
      <h5 className="font-[600]">Filter by</h5>
      <div className="py-4 flex flex-col gap-3">
        {/* justify-between  */}
        <div className="w-full flex  gap-3 items-center">
          <button
            onClick={() => setElectionType("INDIA")}
            className={clsx(
              "text-[13px]  p-2 px-4 hover:text-blue-500 hover:font-[600] ",
              {
                "text-blue-500 font-[600] bg-blue-50 rounded-full":
                  electionType === "INDIA",
                "text-gray-400": electionType !== "INDIA",
              }
            )}
            type="button"
          >
            INDIA
          </button>
          <button
            onClick={() => setElectionType("STATE")}
            className={clsx(
              "text-[13px]  p-2 px-4 hover:text-blue-500 hover:font-[600] ",
              {
                "text-blue-500 font-[600] bg-blue-50 rounded-full":
                  electionType === "STATE",
                "text-gray-400": electionType !== "STATE",
              }
            )}
            type="button"
          >
            STATE
          </button>
          {/* <button
            // onClick={() => setElectionType("LOK SABHA")}
            className={clsx(
              "text-[13px]  p-2 px-4 hover:text-blue-500 hover:font-[600] ",
              {
                "text-blue-500 font-[600] bg-blue-50 rounded-full":
                  electionType === "LOK SABHA",
                "text-gray-400": electionType !== "LOK SABHA",
              }
            )}
            type="button"
          >
            LOK SABHA
          </button> */}
        </div>
        <div className="flex flex-col gap-2">
          <ElectionYearDropdown />

          {electionType === "STATE" && (
            <>
              <StateDropdown />
            </>
          )}

          {electionType === "LOK SABHA" && (
            <>
              <StateDropdown />
              <PC_Dropdown />
            </>
          )}

          <PartyDropdown />
        </div>
        <VoterShareSlider />
      </div>
    </div>
  );
}
