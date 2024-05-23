"use client";
import DeckGL from "@deck.gl/react";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoJsonLayer } from "@deck.gl/layers";
import {
  DEFAULT_DISTRICT_LINE_COLOR_GENERAL,
  STATE_COLORS,
  DEFAULT_STATE_LINE_COLOR,
  TRANSPARENT_COLOR,
  PARTY_ALLIANCE_COLORS,
  MAP_TRANSPARENT_NA_COLOR,
  STATE_COORDINATES,
} from "../../utils/constants";
import { useFilterContextValue } from "../../context/FilterContext";
import hexRgb from "hex-rgb";
import Loading from "../Loading";
export default function Map3() {
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 500;
  // const [windowWidth, setWindowWidth] = useState(500);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setWindowWidth(window.innerWidth);
  //     setViewport({
  //       longitude: windowWidth < 640 ? 78.9629 : 78.9629,
  //       latitude: windowWidth < 640 ? 20.5937 : 20.5937,
  //       zoom: windowWidth < 640 ? 2.5 : 3.5,
  //     });
  //   }
  // }, []);
  const deckRef = useRef(null);
  const containerRef = useRef();
  const [viewport, setViewport] = useState({
    longitude: windowWidth < 640 ? 78.9629 : 78.9629,
    latitude: windowWidth < 640 ? 20.5937 : 20.5937,
    zoom: windowWidth < 640 ? 2.5 : 3.5,
  });
  const [layers, setLayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    electionType,
    selected_party,
    mapResult,
    setMapResult,
    selected_state,
    // setSelected_state,
    // select_constituency,
    // setSelect_constituency,
    // loading,
    PCGeojson,
    ACGeojson,
    StateGeojson,
    isFetchingGeojson,
    setIsFetchingGeojson,
    selected_Voter_Percentage,
    default_delta_value,
    // stateLayer,
  } = useFilterContextValue();

  const [select_state, setSelect_state] = useState("Select State");
  const [select_constituency, setSelect_constituency] = useState({
    pcNo: -1,
    pcName: "Select Constituency",
  });
  const [callToGetMapResult, setCallToGetMapResult] = useState(false);
  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);

  useEffect(() => {
    if (electionType === "STATE") {
      // const stateCoordinates = STATE_COORDINATES.find(
      //   (row) => row.state.toUpperCase() === selected_state.toUpperCase()
      // );

      // console.log("stateCoordinates", stateCoordinates);
      // if (!stateCoordinates) return;

      // setViewport({
      //   latitude: stateCoordinates.latitude,
      //   longitude: stateCoordinates.longitude,
      //   zoom:
      //     windowWidth < 800
      //       ? stateCoordinates.zoom * 0.82
      //       : stateCoordinates.zoom * 0.98,
      // });

      setSelect_state(selected_state);
      // setLayers([]);
    } else {
      setSelect_state("Select State");
      // setViewport({
      //   longitude: windowWidth < 640 ? 78.9629 : 78.9629,
      //   latitude: windowWidth < 640 ? 20.5937 : 20.5937,
      //   zoom: windowWidth < 640 ? 2.5 : 3.5,
      // });
      // setLayers([]);
    }
  }, [electionType, selected_state]);

  // useEffect(() => {
  //   // if (
  //   //   electionType === "LOK SABHA" || electionType === "INDIA"
  //   //     ? select_constituency.pcNo !== -1
  //   //     : select_constituency.acNo !== -1
  //   // ) {
  //   //   const stateCoordinates = STATE_COORDINATES.find(
  //   //     (row) => row.state.toUpperCase() === select_state.toUpperCase()
  //   //   );
  //   //   ////console.log("stateCoordinates", stateCoordinates);
  //   //   if (!stateCoordinates) return;
  //   //   setViewport({
  //   //     latitude: stateCoordinates.latitude,
  //   //     longitude: stateCoordinates.longitude,
  //   //     zoom:
  //   //       windowWidth < 800
  //   //         ? stateCoordinates.zoom * 0.82
  //   //         : stateCoordinates.zoom * 0.82,
  //   //   });
  //   //   // setStateName(select_state);
  //   //   setLayers([]);
  //   // }
  // }, [select_constituency]);

  // ELECTION TYPE BASIC MAP RESULT FETCH
  // useEffect(() => {
  //   const getMapResult = async () => {
  //     setLoading(true);
  //     const state = electionType === "STATE" ? `&state=${selected_state}` : "";
  //     const deltaParam =
  //       default_delta_value === selected_Voter_Percentage.delta
  //         ? `&delta=0&delta_type=positive`
  //         : `&delta=${selected_Voter_Percentage.delta}&delta_type=${selected_Voter_Percentage.delta_type}`;
  //     try {
  //       const res = await fetch(
  //         `https://dhruvresearch.com/api/v2/analysis/result?type=${
  //           electionType === "STATE" ? "state" : "nation"
  //         }${deltaParam}&party=${selected_party.party}${state}`
  //       );
  //       const a = await res.json();
  //       console.log("mapResult", a);

  //       setMapResult(a.data);
  //       setLoading(false);
  //       setCallToGetMapResult(false);
  //       // setLayers([]);
  //       // setViewport({
  //       //   longitude: windowWidth < 640 ? 78.9629 : 78.9629,
  //       //   latitude: windowWidth < 640 ? 20.5937 : 20.5937,
  //       //    zoom: windowWidth < 640 ? 2.5 : 3.5,
  //       // });

  //       // viewport
  //       if (electionType === "STATE") {
  //         const stateCoordinates = STATE_COORDINATES.find(
  //           (row) => row.state.toUpperCase() === selected_state.toUpperCase()
  //         );

  //         console.log("stateCoordinates", stateCoordinates);
  //         if (!stateCoordinates) return;

  //         setViewport({
  //           latitude: stateCoordinates.latitude,
  //           longitude: stateCoordinates.longitude,
  //           zoom:
  //             windowWidth < 800
  //               ? stateCoordinates.zoom * 0.82
  //               : stateCoordinates.zoom * 0.98,
  //         });
  //       } else {
  //         setViewport({
  //           longitude: windowWidth < 640 ? 78.9629 : 78.9629,
  //           latitude: windowWidth < 640 ? 20.5937 : 20.5937,
  //           zoom: windowWidth < 640 ? 2.5 : 3.5,
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (callToGetMapResult) {
  //     // setMapResult({});
  //     if (tooltipRef.current) tooltipRef.current.innerHTML = "";
  //     getMapResult();
  //   }
  // }, [callToGetMapResult]);

  // useEffect(() => {
  //   // if (JSON.stringify(mapResult) !== "{}")
  //   if (selected_Voter_Percentage.delta !== -1) setCallToGetMapResult(true);
  // }, [electionType, selected_party, selected_Voter_Percentage]);

  // ELECTION TYPE BASIC MAP RESULT FETCH
  useEffect(() => {
    const getMapResult = async () => {
      setLoading(true);
      const state = electionType === "STATE" ? `&state=${selected_state}` : "";
      const deltaParam =
        default_delta_value === selected_Voter_Percentage.delta
          ? `&delta=0&delta_type=positive`
          : `&delta=${selected_Voter_Percentage.delta}&delta_type=${selected_Voter_Percentage.delta_type}`;
      try {
        const res = await fetch(
          `https://dhruvresearch.com/api/v2/analysis/result?type=${
            electionType === "STATE" ? "state" : "nation"
          }${deltaParam}&party=${selected_party.party}${state}`
        );
        const a = await res.json();
        console.log("mapResult", a);

        setMapResult(a.data);
        setLoading(false);
        // setCallToGetMapResult(false);
        // setLayers([]);
        // setViewport({
        //   longitude: windowWidth < 640 ? 78.9629 : 78.9629,
        //   latitude: windowWidth < 640 ? 20.5937 : 20.5937,
        //    zoom: windowWidth < 640 ? 2.5 : 3.5,
        // });

        // // viewport
        // if (electionType === "STATE") {
        //   const stateCoordinates = STATE_COORDINATES.find(
        //     (row) => row.state.toUpperCase() === selected_state.toUpperCase()
        //   );

        //   console.log("stateCoordinates", stateCoordinates);
        //   if (!stateCoordinates) return;

        //   setViewport({
        //     latitude: stateCoordinates.latitude,
        //     longitude: stateCoordinates.longitude,
        //     zoom:
        //       windowWidth < 800
        //         ? stateCoordinates.zoom * 0.82
        //         : stateCoordinates.zoom * 0.98,
        //   });
        // } else {
        //   setViewport({
        //     longitude: windowWidth < 640 ? 78.9629 : 78.9629,
        //     latitude: windowWidth < 640 ? 20.5937 : 20.5937,
        //     zoom: windowWidth < 640 ? 2.5 : 3.5,
        //   });
        // }
      } catch (error) {
        console.log(error);
      }
    };

    if (selected_Voter_Percentage.delta !== -1) {
      // setMapResult({});
      if (tooltipRef.current) tooltipRef.current.innerHTML = "";
      getMapResult();
    }
  }, [electionType, selected_party, selected_Voter_Percentage]);

  useEffect(() => {
    console.log("mapResult", mapResult, deckRef);
  }, [mapResult]);
  useEffect(() => {
    if (
      // layers.length === 0 &&
      loading === false &&
      isFetchingGeojson === false &&
      JSON.stringify(mapResult) !== "{}"
    ) {
      let layers = [];

      layers = [
        new GeoJsonLayer({
          id: "geojson-layer-1" + selected_Voter_Percentage.delta,
          data: PCGeojson,
          stroked: true,
          filled: true,
          pickable: true,
          extruded: false,
          pointType: "circle",
          lineWidthScale: electionType === "STATE" ? 110 : 200,

          getFillColor: _fillGeoJsonColor, //(d) => _fillGeoJsonColor(d),
          getLineColor:
            electionType === "STATE"
              ? (d) => abc(d)
              : DEFAULT_DISTRICT_LINE_COLOR_GENERAL,
          getLineWidth: electionType === "STATE" ? 2 : 10,
          updateTriggers: {
            getFillColor: [mapResult], // Trigger update when filter changes
          },
          transitions: {
            getFillColor: {
              duration: 5000,
              easing: (t) => t,
            },
          },
        }),
        new GeoJsonLayer({
          id: "state-geojson-layer-1" + selected_Voter_Percentage.delta,
          data: StateGeojson,
          stroked: true,
          filled: false,
          lineWidthScale: 600,
          getLineColor:
            electionType === "STATE"
              ? TRANSPARENT_COLOR
              : DEFAULT_STATE_LINE_COLOR,
          getFillColor: TRANSPARENT_COLOR,
          getLineWidth: 4,
        }),
      ];

      // viewport
      if (electionType === "STATE") {
        const stateCoordinates = STATE_COORDINATES.find(
          (row) => row.state.toUpperCase() === selected_state.toUpperCase()
        );

        console.log("stateCoordinates", stateCoordinates);
        if (!stateCoordinates) return;

        setViewport({
          latitude: stateCoordinates.latitude,
          longitude: stateCoordinates.longitude,
          zoom:
            windowWidth < 800
              ? stateCoordinates.zoom * 0.82
              : stateCoordinates.zoom * 0.98,
        });
      } else {
        setViewport({
          longitude: windowWidth < 640 ? 78.9629 : 78.9629,
          latitude: windowWidth < 640 ? 20.5937 : 20.5937,
          zoom: windowWidth < 640 ? 2.5 : 3.5,
        });
      }

      //reset tooltip
      if (tooltipRef.current) {
        // reset
        tooltipRef.current.style.display = "none";
        tooltipRef.current.innerHTML = "";
      }

      setLayers(layers);
    }
  }, [PCGeojson, StateGeojson, mapResult]);

  function abc(d) {
    // console.log(d.properties.ST_NAME.toUpperCase(), select_state.toUpperCase());
    if (d.properties.ST_NAME.toUpperCase() === select_state.toUpperCase()) {
      return "#000";
    } else {
      return "lightgray";
    }
  }
  // function _handleMap(object) {
  //   ////console.log("onclick called", object);
  //   const stateName = object.properties.ST_NAME;

  //   if (electionType === "LOK SABHA" || electionType === "INDIA") {
  //     if (select_state === "Select State") {
  //       // const stateName = object.properties.ST_NAME;
  //       // const stateCoordinates = STATE_COORDINATES.find(
  //       //   (row) => row.state === stateName
  //       // );

  //       // ////console.log("stateCoordinates", stateCoordinates);
  //       // if (!stateCoordinates) return;
  //       // setStateName(stateName);
  //       // setViewport({
  //       //   latitude: stateCoordinates.latitude,
  //       //   longitude: stateCoordinates.longitude,
  //       //   zoom: stateCoordinates.zoom,
  //       // });
  //       // setLayers([]);
  //       setSelect_state(stateName);
  //     } else if (select_constituency.pcNo === -1) {
  //       if (stateName.toUpperCase() === select_state.toUpperCase()) {
  //         setSelect_constituency({
  //           pcNo: object.properties.PC_NO,
  //           pcName: object.properties.PC_NAME,
  //         });
  //       }
  //     }
  //   } else {
  //     if (select_state === "Select State") {
  //       // const stateName = object.pro/perties.ST_NAME;
  //       // const stateCoordinates = STATE_COORDINATES.find(
  //       //   (row) => row.state === stateName
  //       // );

  //       // ////console.log("stateCoordinates", stateCoordinates);
  //       // if (!stateCoordinates) return;
  //       // setStateName(stateName);
  //       // setViewport({
  //       //   latitude: stateCoordinates.latitude,
  //       //   longitude: stateCoordinates.longitude,
  //       //   zoom: stateCoordinates.zoom,
  //       // });
  //       // setLayers([]);

  //       setSelect_state(stateName);
  //     } else if (select_constituency.acNo === -1) {
  //       if (stateName.toUpperCase() === select_state.toUpperCase()) {
  //         setSelect_constituency({
  //           acNo: object.properties.AC_NO,
  //           acName: object.properties.AC_NAME,
  //         });
  //       }
  //     }
  //   }
  // }

  const _fillGeoJsonColor = useCallback(
    (d) => {
      let obj = null,
        stateName = select_state;
      // console.log("object d at fillGeoJsonColor", d);

      const mapResultData = mapResult["pcWiseData"];

      if (stateName === "Select State") {
        if (
          mapResultData &&
          mapResultData[d.properties.ST_NAME] &&
          mapResultData[d.properties.ST_NAME][d.properties.PC_NO]
        ) {
          obj = mapResultData[d.properties.ST_NAME][d.properties.PC_NO];
        }
      } else {
        // console.log(
        //   "dsfaj",

        //   d.properties
        // );
        if (
          mapResultData &&
          mapResultData[d.properties.ST_NAME] &&
          mapResultData[d.properties.ST_NAME][d.properties.PC_NO]
        ) {
          console.log(
            "alsdkg",
            mapResultData[d.properties.ST_NAME],
            stateName.toUpperCase() === d.properties.ST_NAME.toUpperCase()
          );
          if (stateName.toUpperCase() !== d.properties.ST_NAME.toUpperCase()) {
            // obj = null;
          } else {
            console.log(
              "dsfaj",

              d.properties
            );
            obj = mapResultData[d.properties.ST_NAME][d.properties.PC_NO];
          }
        }
      }

      // console.log("obj", obj);
      let rgba = [];
      if (obj) {
        let party = obj.revisedWinner;
        // maxVotes = 0;
        // for (let details of obj.candidates) {
        //   if (details.votesCount > maxVotes) {
        //     maxVotes = details.votesCount;
        //     party = details.party;
        //   }
        // }
        ////console.log("party", party, maxVotes);
        if (PARTY_ALLIANCE_COLORS[party])
          rgba = hexRgb(PARTY_ALLIANCE_COLORS[party], {
            format: "array",
            alpha: 255,
          });
        else rgba = [180, 180, 180];
      } else {
        //   const rgba = hexRgb(STATE_COLORS[Math.floor(Math.random() * 3)], {
        //     format: "array",
        //     alpha: 255,
        // });
        rgba = [
          MAP_TRANSPARENT_NA_COLOR.red,
          MAP_TRANSPARENT_NA_COLOR.green,
          MAP_TRANSPARENT_NA_COLOR.blue,
          MAP_TRANSPARENT_NA_COLOR.alpha,
        ];

        // ////console.log("no obj when pc_no -1");
      }
      // let rgba = [];

      // console.log(rgba);
      return rgba;
    },
    [mapResult]
  );

  const _getTooltip = ({ object, x, y }) => {
    //console.log("tooltip called", object);
    if (object && mapResult) {
      let results = null,
        stateName = select_state;
      const mapResultData = mapResult["pcWiseData"];
      if (select_state === "Select State") {
        if (
          mapResultData[object.properties.ST_NAME] &&
          mapResultData[object.properties.ST_NAME][object.properties.PC_NO]
        ) {
          results =
            mapResultData[object.properties.ST_NAME][object.properties.PC_NO];
        }
      } else {
        // let results = null,
        //   stateName = select_state;
        if (
          mapResultData[object.properties.ST_NAME] &&
          mapResultData[object.properties.ST_NAME][object.properties.PC_NO]
        ) {
          if (
            stateName.toUpperCase() !== object.properties.ST_NAME.toUpperCase()
          ) {
          } else {
            results =
              mapResultData[object.properties.ST_NAME][object.properties.PC_NO];
          }
        }
      }

      const tooltip = tooltipRef.current;
      if (!object && !tooltip) {
        tooltip.style.display = "none";
        return null;
      }

      // reset
      tooltip.style.display = "none";
      tooltip.innerHTML = "";

      // Set tooltip content
      // tooltip.innerHTML = "hgdj"; //object.properties.name;

      // Set tooltip position
      let tooltipWidth = tooltip.offsetWidth;
      let tooltipHeight = 300;
      tooltip.offsetHeight;
      const margin = 30;

      // Adjust x to center the tooltip horizontally
      // x -= tooltipWidth / 2 - tooltipWidth;

      // Adjust for screen boundaries
      if (x + tooltipWidth > containerRef.current.clientWidth) {
        // x = containerRef.current.clientWidth - tooltipWidth - margin;

        x -= tooltipWidth - margin; // + tooltipWidth;
      } else {
        x += margin;
      }
      // if (x < margin) x = margin;

      // Adjust y to place the cursor at the top-center of the tooltip
      // console.log("y", y, tooltipHeight, containerRef.current.clientHeight);
      // y -= tooltipHeight;
      // y = tooltipHeight;
      y += margin;
      if (y + tooltipHeight > containerRef.current.clientHeight) {
        y = y - tooltipHeight - margin; //tooltipHeight / 2;
        // y = containerRef.current.clientHeight - y;
        // y -= 50;
      }
      // if (y < margin) y = margin;

      // console.log("y", y);

      if (results && selected_Voter_Percentage.delta === default_delta_value) {
        let voteShare = "",
          winningParty = results.winner;

        for (let details of results.candidates) {
          voteShare =
            voteShare +
            ` <p class="  flex items-center gap-1 ">
            <span class="font-[600] text-[12px] min-w-12 flex justify-between items-center">
              ${details.party} <span class="pl-1">:</span>
            </span>
            <span class="text-[gray] text-[12px] min-w-12 pl-2">${new Intl.NumberFormat(
              "en-IN"
            ).format(details.votesCount)}</span>
           
            <span class="text-[gray] text-[12px]  w-14 flex pl-1"> <span class="px-2">|</span> ${details.voteShare?.toFixed(
              2
            )}%</span>
          </p>`;
        } //results.winner
        tooltipRef.current.innerHTML = `
          <div class=" bg-white p-0 pt-0 rounded-lg w-fit min-w-[250px] max-w-[fit-content] pr-2">
          <p class="bg-[#fff9e0] rounded-md p-2.5 pl-3 text-[14px] ">
            <span class="font-[600]">${results.state}</span>
          </p>
          <div class="flex flex-col gap-1 text-[gray] pb-3 pt-2 px-4">
            <p class="flex gap-3 text-[13px]">
              <span class="">Constituency</span>
              <span class="text-black  font-[600]">
                <span class="pr-2 ">:</span> ${results.pcName}
              </span>
            </p>
            <p class="flex gap-2 text-[13px]">
              <span class=" ">Winning Party</span>
              <span class="text-black  font-[600]">
                <span class="pr-2">:</span> ${winningParty}
              </span>
            </p>
          </div>

          <div class="flex gap-0  pt-0 pb-3 px-5 w-full">

          <div class="flex flex-col pt-1 w-1/2 pr-2 gap-1 ">
            <span class="font-[600] pb-1 text-sm">
              Vote Share
              <span class=" ">:</span>
            </span>
          <div class=" flex flex-col gap-2" > ${voteShare}</div>
          </div>
                 
       
          
          </div>

          <div>
            `;

        // Set tooltip position
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.display = "block"; // Show the tooltip

        return null; // DeckGL won't render its own tooltip
      } else if (
        results &&
        selected_Voter_Percentage.delta !== default_delta_value
      ) {
        let voteShare = "",
          modeled = "",
          winningParty = results.winner;

        for (let details of results.candidates) {
          voteShare =
            voteShare +
            ` <p class="  flex items-center gap-1 ">
            <span class="font-[600] text-[10px] min-w-[43px] flex justify-between items-center">
              ${details.party} <span class="pl-1">:</span>
            </span>
            <span class="text-[gray] text-[10px]  min-w-12 pl-1">${new Intl.NumberFormat(
              "en-IN"
            ).format(details.votesCount)}</span>
           
            <span class="text-[gray] text-[10px]  min-w-10 flex "> <span class="px-2">|</span> ${details.voteShare?.toFixed(
              2
            )}%</span>
          </p>`;

          let deltaHtml = ``;
          if (details.delta < 0) {
            deltaHtml = `<span class=" text-[10px] text-red-500 flex items-center gap-1 min-w-16 ">
            (<svg
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="10"
              height="10"
            >
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg> ${Math.abs(details.delta?.toFixed(2) || 0)}%)
          </span>`;
          } else {
            deltaHtml = `<span class=" text-[10px] text-green-500 flex items-center gap-1 min-w-16  ">
            (<svg
              fill="green"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="10"
              height="10"
            >
              <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
            </svg>${details.delta?.toFixed(2) || 0}%)
          </span>`;
          }

          modeled =
            modeled +
            ` <p class="flex gap-0  ">
             
            <span class="text-[gray] text-[10px]   min-w-[55px]  ">${new Intl.NumberFormat(
              "en-IN"
            ).format(details.revisedVotesCount?.toFixed(0))}</span>
           
            <span class="text-[gray] text-[10px]  min-w-14   flex"> <span class="pr-2">|</span> ${details.revisedVoteShare?.toFixed(
              2
            )}%</span>
            
            ${deltaHtml}
          </p>`;
        } //results.winner

        // Set tooltip content
        tooltipRef.current.innerHTML = `
          <div class=" bg-white p-0 pt-0 rounded-lg w-fit min-w-[250px] max-w-[fit-content] " style="box-shadow: 0px 0px 4px .1px lightgray;">
          <p class="bg-[#fff9e0] rounded-md p-2.5 pl-3 text-[14px] ">
            <span class="font-[600]">${results.state}</span>
          </p>
          <div class="flex flex-col gap-1 text-[gray] pb-3 pt-2 px-4">
            <p class="flex gap-3 text-[13px]">
              <span class="">Constituency</span>
              <span class="text-black  font-[600]">
                <span class="pr-2 ">:</span> ${results.pcName}
              </span>
            </p>
            <p class="flex gap-2 text-[13px]">
              <span class=" ">Winning Party</span>
              <span class="text-black  font-[600]">
                <span class="pr-2">:</span> ${winningParty}
              </span>
            </p>
            <p class="flex gap-2 text-[13px]">
              <span class=" "> Modelled Winning Party</span>
              <span class="text-black  font-[600]">
                <span class="pr-2">:</span> ${results.revisedWinner}
              </span>
            </p>
          </div>

          <div class="flex gap-0  pt-0 pb-3 px-5  ">

          <div class="flex flex-col pt-1  ">
            <span class="font-[600] pb-1 text-sm">
              Vote Share
              <span class=" ">:</span>
            </span>
          <div class="mr-4 flex flex-col gap-[7px]" > ${voteShare}</div>
          </div>
                 
       
          <div class="flex flex-col  pt-1    ">
          <span class="font-[600] pb-1 text-center text-sm">
            Modelled Vote
            <span class="px-2"></span>
          </span>
        <div class="flex flex-col gap-[7px] border-l-[1px] border-gray-400  pl-4 ">
        ${modeled}</div>
        </div>
          </div>

          <div>
            `;

        // Set tooltip position
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.style.display = "block"; // Show the tooltip

        return null; // DeckGL won't render its own tooltip
      }
    }
  };

  //   just on drag add dragging cursor
  const _getCursor = (e) => {
    return e.isHovering ? (e.isDragging ? "grabbing" : "pointer") : "";
  };
  const handleZoomIn = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.min(prevViewport.zoom + 1, 20), // Limit max zoom level to 20
    }));
  };

  const handleZoomOut = () => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.max(prevViewport.zoom - 1, 0), // Limit min zoom level to 0
    }));
  };

  const handleResetToInitial = () => {
    if (electionType === "LOK SABHA" || electionType === "INDIA") {
      setViewport({
        longitude: windowWidth < 640 ? 78.9629 : 78.9629,
        latitude: windowWidth < 640 ? 20.5937 : 20.5937,
        zoom: windowWidth < 640 ? 2.5 : 3.5,
      });
    } else {
      const stateCoordinates = STATE_COORDINATES.find(
        (row) => row.state.toUpperCase() === select_state.toUpperCase()
      );

      ////console.log("stateCoordinates", stateCoordinates);
      if (!stateCoordinates) return;

      setViewport({
        latitude: stateCoordinates.latitude,
        longitude: stateCoordinates.longitude,
        zoom:
          windowWidth < 800
            ? stateCoordinates.zoom * 0.82
            : stateCoordinates.zoom * 0.82,
      });
    }
  };

  //console.log(layers, "layers", viewport);
  const tooltipRef = useRef(null);

  // const getTooltip = ({ object, x, y }) => {
  //   const tooltip = tooltipRef.current;
  //   if (!object && !tooltip) {
  //     tooltip.style.display = "none";
  //     return null;
  //   }

  //   // Set tooltip content
  //   tooltip.innerHTML = "hgdj"; //object.properties.name;

  //   // Set tooltip position
  //   let tooltipWidth = tooltip.offsetWidth;
  //   let tooltipHeight = tooltip.offsetHeight;
  //   const margin = 10;

  //   // Adjust x to center the tooltip horizontally
  //   x -= tooltipWidth / 2;

  //   // Adjust for screen boundaries
  //   if (x + tooltipWidth > window.innerWidth) {
  //     x = window.innerWidth - tooltipWidth - margin;
  //   }
  //   if (x < margin) x = margin;

  //   // Adjust y to place the cursor at the top-center of the tooltip
  //   y -= tooltipHeight;

  //   if (y + tooltipHeight > window.innerHeight) {
  //     y = window.innerHeight - tooltipHeight - margin;
  //   }
  //   if (y < margin) y = margin;

  //   // Set tooltip position
  //   tooltip.style.left = `${x}px`;
  //   tooltip.style.top = `${y}px`;
  //   tooltip.style.display = "block"; // Show the tooltip

  //   return null; // DeckGL won't render its own tooltip
  // };

  useEffect(() => {
    const container = document.getElementById("react-map");
    window?.addEventListener("mousemove", () => {
      if (tooltipRef.current) {
        // reset
        tooltipRef.current.style.display = "none";
        tooltipRef.current.innerHTML = "";
      }
    });
  }, []);
  return (
    <>
      {/* && !loading && layers.length */}
      {!isFetchingGeojson ? (
        <div
          ref={containerRef}
          id="react-map"
          className=" w-full h-[50vh]   lg:h-auto  overflow-visible relative"
        >
          <DeckGL
            ref={deckRef}
            initialViewState={viewport}
            layers={[...layers]}
            getTooltip={_getTooltip}
            getCursor={(e) => _getCursor(e)}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            pickingRadius={5}
            // controller={true}
            width="100%"
            height="100%"
            style={{ backgroundColor: "#F0F0F0" }}
            onViewportChange={(nextViewport) => {
              setViewport(nextViewport);
            }}
            // mapStyle="mapbox://styles/mapbox/light-v9"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            // reuseMaps
            // preventStyleDiffing={true}
            // attributionControl={false}
            // onWheel={handleWheel}
            controller={{
              doubleClickZoom: true, // Enable double click to zoom
              scrollZoom: {
                smooth: false, // Ensure smooth zooming
                speed: 5, // Adjust speed as necessary
                transitionDuration: 0, // Adjust duration as necessary
              },
              dragPan: true,
              dragRotate: false,
              keyboard: false,
              touchRotate: false,
              touchZoom: true,
            }}
            // onWheel={handleWheel}
            onHover={_getTooltip}
          >
            <ReactMapGL
              // ref={mapRef}
              // layers={layers}
              // initialViewState={viewport}
              // width="100%"
              // height="100%"
              // onViewportChange={(nextViewport) => setViewport(nextViewport)}
              // mapStyle="mapbox://styles/mapbox/light-v9"
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
              reuseMaps
              preventStyleDiffing={true}
              // attributionControl={false}
              // onWheel={handleWheel}
            ></ReactMapGL>

            <div id="map" className="absolute z-50 bottom-0 left-0">
              <div className="mapbox-attribution-container relative flex row-reverse">
                <div
                  className="flex justify-start"
                  style={{ placeItems: "baseline" }}
                >
                  <img
                    src={`/dhruv_logo.jpg`}
                    alt="copyright newsclick dot in"
                    className="m-1 w-24"
                  />
                </div>
              </div>
            </div>
            <div className="absolute z-50 top-0 right-0 ">
              <div className="mapbox-attribution-container relative flex row-reverse">
                <div className="flex items-center px-5 pt-2  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192 512"
                    fill="gray"
                    className="w-5 h-5 border-2 border-gray-300 hover:border-gray-600 cursor-pointer  rounded-full p-[4px]"
                  >
                    <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-500">
                    Hover on Map to view details
                  </span>
                </div>
              </div>
            </div>
          </DeckGL>
          {/* zoom buttons */}
          <div
            style={{
              position: "absolute",
              right: 20,
              bottom: 10,
              // border: "1px solid rgba(0, 0, 0, .7)",
              display: "flex",
              flexDirection: "column",
              zIndex: 2,

              borderRadius: "5px",
              // boxShadow: "0 0 0 1.5px rgba(0, 0, 0, .3)",
              backgroundColor: "rgba(255, 255, 255, .7)",
              paddingBlock: "5px",
            }}
          >
            <button
              className="py-[5px] px-[10px]   hover:bg-[#2c6ed8]
              "
              onClick={handleZoomIn}
            >
              <svg
                fill="#317EFC"
                className="hover:fill-white "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="18px"
                height="18px"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
            <button
              className="py-[4px] px-[10px]  hover:bg-[#2c6ed8]  "
              onClick={handleZoomOut}
            >
              <svg
                fill="#317EFC"
                className="hover:fill-white "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="18px"
                height="18px"
              >
                {" "}
                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
            <button
              className="py-[5px] px-[10px] hover:bg-[#2c6ed8]"
              onClick={handleResetToInitial}
            >
              <svg
                fill="#317EFC"
                className="hover:fill-white "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="18px"
                height="18px"
              >
                {" "}
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
            </button>
          </div>

          {/* tooltip */}
          <div
            ref={tooltipRef}
            className="absolute z-[1000]  text-black px-2 py-1"
          ></div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

/* <DeckGL
layers={layers}
initialViewState={viewport}
controller={true}
mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
>
<ReactMapGL
  layers={layers}
  mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
  {...viewport}
  // mapStyle="mapbox://styles/mapbox/light-v9"
/>
</DeckGL> */
