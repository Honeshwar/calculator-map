"use client";
import { useFilterContextValue } from "../../context/FilterContext";
import { PARTY_ALLIANCE_COLORS } from "../../utils/constants";
import { clsx } from "clsx";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";

export default function Result() {
  const {
    electionType,
    selected_Voter_Percentage,
    mapResult,
    isFetchingGeojson,
    default_delta_value,
  } = useFilterContextValue();
  // const [isVoterShareFilterApplied, setIsVoterShareFilterApplied] =
  //   useState(false);
  const d = [
    {
      party: "BJP",
      seatCount: 303,
      color: "yellow",
      percentage: 30.3,
    },
    {
      party: "INC",
      seatCount: 60,
      color: "skyblue",
      percentage: 6.0,
    },
    {
      party: "BSP",
      seatCount: 4,
      color: "violet",
      percentage: 0.4,
    },
    {
      party: "RJD",
      seatCount: 1,
      color: "blue",
      percentage: 0.1,
    },
    {
      party: "OTHERS",
      seatCount: 0,
      color: "lightgray",
      percentage: 0.0,
    },
  ];
  const [data, setData] = useState(d);
  useEffect(() => {
    if (mapResult.summary && mapResult.summary.length > 0) {
      setData([mapResult.summary]);
    }
  }, [mapResult.summary]);

  // console.log(
  //   "data summary",
  //   selected_Voter_Percentage,
  //   default_delta_value,
  //   typeof selected_Voter_Percentage.delta,
  //   typeof default_delta_value
  // );
  return (
    <>
      {isFetchingGeojson ? (
        <div className=" flex items-center justify-center   h-full">
          <Loading />
        </div>
      ) : (
        <div className="  py-1 min-w-[250px] overflow-y-auto">
          <h5 className="  text-center  sm:text-right text-gray-500 font-bold">
            {electionType}
          </h5>

          <ul className="flex flex-col gap-2 float-right mt-2">
            {mapResult.summary === undefined && <p>No result found</p>}
            {Number(selected_Voter_Percentage.delta) === default_delta_value
              ? mapResult.summary?.map((item, i) => (
                  <li
                    key={item.party + "-" + i}
                    className="flex items-center gap-2 justify-end px-0 py-1"
                  >
                    {/* party logo and name */}
                    <span className="flex items-center gap-2 ml-1">
                      {item.party !== "OTHERS" && (
                        <img
                          className="rounded-full"
                          width={20}
                          src={"/party_logo/" + item.party + ".png"}
                          alt="party logo"
                        />
                      )}
                      <span className="font-[600] text-sm text-black">
                        {item.party}
                      </span>
                    </span>

                    {/* seat count */}
                    <span
                      className={clsx(
                        "px-8 py-[6px] font-semibold flex justify-center items-center rounded-2xl min-w-[120px] max-w-[120px] text-sm ml-4 text-white "
                      )}
                      style={{
                        backgroundColor: PARTY_ALLIANCE_COLORS[item.party],
                        textShadow: "0px 0px 1px black",
                      }}
                    >
                      {item.seatCount}
                    </span>
                  </li>
                ))
              : mapResult.summary?.map((item, i) => (
                  <li
                    key={item.party + "-" + i}
                    className="flex items-center gap-2 justify-end px-0 py-1"
                  >
                    {/* // new vote share - original  vote share */}
                    {item.revisedVoteShare - item.voteShare >= 0 ? (
                      <span className="flex text-sm">
                        <svg
                          fill="green"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          className="w-5 h-5"
                        >
                          <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                        </svg>
                        {(item.revisedVoteShare - item.voteShare)?.toFixed(0)}%
                      </span>
                    ) : (
                      <span className="flex text-sm">
                        <svg
                          fill="red"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          className="w-5 h-5"
                        >
                          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                        </svg>
                        {Math.abs(
                          item.revisedVoteShare - item.voteShare
                        )?.toFixed(0)}
                        %
                      </span>
                    )}

                    {/* party logo and name */}
                    <span className="flex items-center gap-2 ml-1">
                      {item.party !== "OTHERS" && (
                        <img
                          className="rounded-full"
                          width={20}
                          src={"/party_logo/" + item.party + ".png"}
                          alt="party logo"
                        />
                      )}
                      <span className="font-[600] text-sm text-black">
                        {item.party}
                      </span>
                    </span>

                    {/* seat count */}
                    <span
                      className={clsx(
                        "px-8 py-[6px] font-semibold flex justify-center items-center rounded-2xl min-w-[180px] max-w-[180px] text-sm ml-4 text-white "
                      )}
                      style={{
                        backgroundColor: PARTY_ALLIANCE_COLORS[item.party],
                        textShadow: "0px 0px 1px black",
                      }}
                    >
                      {item.seatCount}
                      <span className="font-[300] text-[12px] px-1">
                        &gt;&gt;
                      </span>
                      {item.revisedSeatCount?.toFixed(0)}

                      {/* <span className="flex items-center px-1 pt-1"> */}
                      {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="white"
                      className="w-4 h-4"
                      width={20}
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207"
                      />
                    </svg> */}

                      {item.revisedSeatCount?.toFixed(0) - item.seatCount >=
                      0 ? (
                        <span className="flex items-center px-1 pt-1">
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
                            />
                          </svg>{" "}
                        </span>
                      ) : (
                        <span className="flex items-center pl-1 pt-1">
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white transform rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
                            />
                          </svg>{" "}
                        </span>
                      )}

                      {Math.abs(
                        item.revisedSeatCount?.toFixed(0) - item.seatCount
                      )}
                    </span>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </>
  );
}
