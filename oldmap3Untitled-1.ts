"use client";

import DeckGL from "@deck.gl/react";

import { useState, useRef, useEffect } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoJsonLayer } from "@deck.gl/layers";
import { useProvideContext } from "@/context/FilterContext";
import {
  DEFAULT_DISTRICT_LINE_COLOR_GENERAL,
  STATE_COLORS,
  DEFAULT_STATE_LINE_COLOR,
  TRANSPARENT_COLOR,
  PARTY_ALLIANCE_COLORS,
  MAP_TRANSPARENT_NA_COLOR,
  STATE_COORDINATES,
} from "@/utils/constants";
import { useFilterContextValue } from "@/context/FilterContext";
import hexRgb from "hex-rgb";
import Loading from "../Loading";
export default function Map3() {
  const windowWidth = window.innerWidth;

  //   const mapRef = useRef < any > null;
  const [viewport, setViewport] = useState({
    longitude: windowWidth < 640 ? 78.9629 : 78.9629,
    latitude: windowWidth < 640 ? 20.5937 : 20.5937,
    zoom: windowWidth < 640 ? 2.5 : 3.5,
  });
  const [layers, setLayers] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const { PCGeojson, ACGeojson, StateGeojson } = useProvideContext(); // PCGeojson: geojson
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
  } = useFilterContextValue();
  //console.log("loading", isFetchingGeojson);
  //   const electionType = "Lok Sabha";
  // loading = false;
  const [select_state, setSelect_state] = useState("Select State");
  const [select_constituency, setSelect_constituency] = useState({
    pcNo: -1,
    pcName: "Select Constituency",
  });
  const [callToGetMapResult, setCallToGetMapResult] = useState(false);
  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
  // const [stateName, setStateName] = useState(select_state);
  // const [selectedConstituency, setSelectedConstituency] = useState(select_constituency);

  useEffect(() => {
    // if (electionType === "LOK SABHA" || electionType === "INDIA") {

    // } else {
    //   if (loading === false) {
    //     ////console.log("state at toggle sabha", Object.keys(mapResult), mapResult);
    //     setSelect_state(Object.keys(mapResult)[0]);
    //   }
    // }
    if (electionType === "STATE") {
      setSelect_constituency({
        acNo: -1,
        acName: "Select Constituency",
      });
      setSelect_state(selected_state);
    } else {
      setSelect_constituency({
        pcNo: -1,
        pcName: "Select Constituency",
      });
      setSelect_state("Select State");
      setViewport({
        longitude: windowWidth < 640 ? 78.9629 : 78.9629,
        latitude: windowWidth < 640 ? 20.5937 : 20.5937,
        zoom: windowWidth < 640 ? 2.5 : 3.5,
      });
    }
    setLayers([]);
  }, [electionType]);

  useEffect(() => {
    if (electionType === "STATE" && selected_state !== "Select State") {
      const stateCoordinates = STATE_COORDINATES.find(
        (row) => row.state.toUpperCase() === selected_state.toUpperCase()
      );

      ////console.log("stateCoordinates", stateCoordinates);
      if (!stateCoordinates) return;

      setViewport({
        latitude: stateCoordinates.latitude,
        longitude: stateCoordinates.longitude,
        zoom:
          windowWidth < 800
            ? stateCoordinates.zoom * 0.72
            : stateCoordinates.zoom * 0.82,
      });

      // setStateName(select_state);
      setLayers([]);
    }
  }, [selected_state]);
  useEffect(() => {
    // if (
    //   electionType === "LOK SABHA" || electionType === "INDIA"
    //     ? select_constituency.pcNo !== -1
    //     : select_constituency.acNo !== -1
    // ) {
    //   const stateCoordinates = STATE_COORDINATES.find(
    //     (row) => row.state.toUpperCase() === select_state.toUpperCase()
    //   );
    //   ////console.log("stateCoordinates", stateCoordinates);
    //   if (!stateCoordinates) return;
    //   setViewport({
    //     latitude: stateCoordinates.latitude,
    //     longitude: stateCoordinates.longitude,
    //     zoom:
    //       windowWidth < 800
    //         ? stateCoordinates.zoom * 0.82
    //         : stateCoordinates.zoom * 0.82,
    //   });
    //   // setStateName(select_state);
    //   setLayers([]);
    // }
  }, [select_constituency]);
  // useEffect(() => {
  //   if (
  //     JSON.stringify(mapResult) !== JSON.stringify({}) //SO AT MMOUNTED IT NOT CALL BELOW CODE
  //   ) {
  //     setLayers([]);
  //   }
  // }, [mapResult]);

  // ELECTION TYPE BASIC MAP RESULT FETCH
  useEffect(() => {
    const getMapResult = async () => {
      setLoading(true);
      //console.log("getMapResult ata mat=p", callToGetMapResult);
      const state = electionType === "STATE" ? `&state=${selected_state}` : "";
      try {
        const res = await fetch(
          `https://dhruvresearch.com/api/v2/analysis/result?type=${
            electionType === "STATE" ? "state" : "nation"
          }&party=${selected_party}&delta=${
            selected_Voter_Percentage.delta
          }&delta_type=${selected_Voter_Percentage.delta_type}${state}`
        );
        // fetch(
        //   `https://dhruvresearch.com/api/v2/result/map?election_type=${
        //     electionType === "STATE" ? "VS" : "LS"
        //   }`
        // ); //party param &patry = selected_party, &state = selected_state , &year = selected_election_year, &constituency = selected_pc, &voter_percentage = selected_Voter_Percentage
        const a = await res.json();
        // //console.log("geojson", a, c, d);
        console.log("mapResult", a);

        setMapResult(a.data);
        setLoading(false);
        setCallToGetMapResult(false);
        setLayers([]);
        // setViewport({
        //   longitude: windowWidth < 640 ? 78.9629 : 78.9629,
        //   latitude: windowWidth < 640 ? 20.5937 : 20.5937,
        //    zoom: windowWidth < 640 ? 2.5 : 3.5,
        // });
      } catch (error) {
        //console.log(error);
      }
    };

    if (callToGetMapResult) {
      // setMapResult({});
      getMapResult();
    }
  }, [callToGetMapResult]);

  useEffect(() => {
    if (JSON.stringify(mapResult) !== "{}") setCallToGetMapResult(true);
  }, [
    electionType,
    selected_party,
    // // selected_state,
    // selected_pc,
    // setSelected_election_year,
    selected_Voter_Percentage,
  ]);

  useEffect(() => {
    if (
      layers.length === 0 &&
      loading === false &&
      isFetchingGeojson === false
    ) {
      //console.log("mapResult", mapResult);
      ////console.log("stateName", select_state);
      ////console.log("geojson: ", PCGeojson, ACGeojson, StateGeojson);
      let layers = [];

      if (electionType === "LOK SABHA" || electionType === "INDIA") {
        layers = [
          new GeoJsonLayer({
            id: "geojson-layer-1" + selected_Voter_Percentage.delta, //@ts-ignore
            data: PCGeojson,
            stroked: true,
            filled: true,
            pickable: true,
            lineWidthScale: 200,
            //@ts-ignore
            getFillColor: (d) => _fillGeoJsonColor(d), //@ts-ignore
            getLineColor: DEFAULT_DISTRICT_LINE_COLOR_GENERAL,
            getLineWidth:
              electionType === "LOK SABHA" || electionType === "INDIA" ? 10 : 2, //@ts-ignore
            // onClick:
            //   select_constituency.pcNo === -1
            //     ? ({ object }) => _handleMap(object)
            //     : null,
            // onClick:
            //   select_state === "Select State"
            //     ? ({ object }) => _handleMap(object)
            //     : null,
          }),
          new GeoJsonLayer({
            id: "state-geojson-layer-1" + selected_Voter_Percentage.delta, //@ts-ignore
            data: StateGeojson,
            stroked: true,
            filled: false,
            lineWidthScale: 600, //@ts-ignore
            getLineColor: DEFAULT_STATE_LINE_COLOR, //@ts-ignore
            getFillColor: TRANSPARENT_COLOR,
            getLineWidth: 4,
          }),
        ];
      } else {
        layers = [
          new GeoJsonLayer({
            id: "geojson-layer-2" + selected_Voter_Percentage.delta, //@ts-ignore
            data: ACGeojson,
            stroked: true,
            filled: true,
            pickable: true,
            lineWidthScale: 110,
            // extruded: true,
            // pickable: true,
            //@ts-ignore
            getFillColor: (d) => _fillGeoJsonColor(d), //@ts-ignore
            getLineColor: (d) => abc(d),
            // DEFAULT_DISTRICT_LINE_COLOR_GENERAL, //@ts-ignore
            getLineWidth: 2, //@ts-ignore
            //@ts-ignore
            // onClick:
            //   select_constituency.acNo === -1
            //     ? ({ object }) => _handleMap(object)
            //     : null,
            // onClick:
            //   select_state === "Select State"
            //     ? ({ object }) => _handleMap(object)
            //     : null,
            // onHover: ({ object }) => {
            //   //console.log("hover");
            //   setHoveredFeatureId(object.properties.AC_NAME);
            // },
            // getLineColor: (props) => {
            //   // Change line color based on hover state
            //   if (hoveredFeatureId === null) {
            //     return abc(props);
            //   }
            //   //console.log(
            //     "line set after hover",
            //     props.object.properties.AC_NAME,
            //     hoveredFeatureId,
            //     props.object.properties.AC_NAME === hoveredFeatureId
            //   );
            //   return props.object.properties.AC_NAME === hoveredFeatureId
            //     ? [255, 0, 0]
            //     : [0, 0, 0];
            // },
          }),
          new GeoJsonLayer({
            //states boundaries
            id: "state-geojson-layer-2" + selected_Voter_Percentage.delta, //@ts-ignore
            data: StateGeojson,
            stroked: false,
            filled: false,
            lineWidthScale: 600, //@ts-ignore
            getLineColor: DEFAULT_STATE_LINE_COLOR, //@ts-ignore
            getFillColor: TRANSPARENT_COLOR,
            getLineWidth: 4,
          }),
        ];
      }

      ////console.log("layers", layers);
      //@ts-ignore
      setLayers(layers);
    }
  }, [PCGeojson, StateGeojson, layers, hoveredFeatureId]);

  ////console.log(process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN);
  function abc(d) {
    //console.log(
    //   d.properties.ST_NAME.toUpperCase() === select_state.toUpperCase(),
    //   "abc function",
    //   d
    // );
    if (d.properties.ST_NAME.toUpperCase() === select_state.toUpperCase()) {
      //console.log("true", d);
      return "#000";
    } else {
      //console.log("false", d);
      return "lightgray"; //DEFAULT_DISTRICT_LINE_COLOR_GENERAL;
    }
  }
  function _handleMap(object) {
    ////console.log("onclick called", object);
    const stateName = object.properties.ST_NAME;

    if (electionType === "LOK SABHA" || electionType === "INDIA") {
      if (select_state === "Select State") {
        // const stateName = object.properties.ST_NAME;
        // const stateCoordinates = STATE_COORDINATES.find(
        //   (row) => row.state === stateName
        // );

        // ////console.log("stateCoordinates", stateCoordinates);
        // if (!stateCoordinates) return;
        // setStateName(stateName);
        // setViewport({
        //   latitude: stateCoordinates.latitude,
        //   longitude: stateCoordinates.longitude,
        //   zoom: stateCoordinates.zoom,
        // });
        // setLayers([]);
        setSelect_state(stateName);
      } else if (select_constituency.pcNo === -1) {
        if (stateName.toUpperCase() === select_state.toUpperCase()) {
          setSelect_constituency({
            pcNo: object.properties.PC_NO,
            pcName: object.properties.PC_NAME,
          });
        }
      }
    } else {
      if (select_state === "Select State") {
        // const stateName = object.pro/perties.ST_NAME;
        // const stateCoordinates = STATE_COORDINATES.find(
        //   (row) => row.state === stateName
        // );

        // ////console.log("stateCoordinates", stateCoordinates);
        // if (!stateCoordinates) return;
        // setStateName(stateName);
        // setViewport({
        //   latitude: stateCoordinates.latitude,
        //   longitude: stateCoordinates.longitude,
        //   zoom: stateCoordinates.zoom,
        // });
        // setLayers([]);

        setSelect_state(stateName);
      } else if (select_constituency.acNo === -1) {
        if (stateName.toUpperCase() === select_state.toUpperCase()) {
          setSelect_constituency({
            acNo: object.properties.AC_NO,
            acName: object.properties.AC_NAME,
          });
        }
      }
    }
  }
  const _fillGeoJsonColor = (d) => {
    let obj = null,
      stateName = select_state;
    // ////console.log("_fillGeoJsonColor", d);
    // ////console.log("mapResult", mapResult, d);
    // for (let key in mapResult) {
    // For PC
    console.log("object d at fillGeoJsonColor", d);

    const mapResultData = mapResult["pcWiseData"];

    if (electionType === "LOK SABHA" || electionType === "INDIA") {
      if (
        mapResultData &&
        mapResultData[d.properties.ST_NAME] &&
        mapResultData[d.properties.ST_NAME][d.properties.PC_NO]
      ) {
        // ////console.log("mapResult", stateName, d.properties.ST_NAME);
        // for single state selection only fill color
        if (
          stateName !== "Select State" &&
          stateName.toUpperCase() !== d.properties.ST_NAME.toUpperCase()
        ) {
          // obj = null;
        } else {
          ////console.log("mapResult", "no state selected", stateName, d);
          // for single constitency selection only fill color

          //constituency selected but not correct
          // ////console.log(
          //   "mapResult",
          //   select_constituency,
          //   d.properties,
          //   " ",
          //   // mapResultData[d.properties.ST_NAME],
          //   // select_constituency,
          //   mapResultData[d.properties.ST_NAME][d.properties.PC_NO].pcNo !==
          //     select_constituency.pcNo
          // );
          if (
            select_constituency.pcNo !== -1 &&
            mapResultData[d.properties.ST_NAME][d.properties.PC_NO].pcNo !==
              select_constituency.pcNo
          ) {
            obj = null;
          } else {
            ////console.log(
            //   "mapResult",
            //   "no constituency selected",
            //   mapResultData[d.properties.ST_NAME][d.properties.PC_NO]
            // );
            obj = mapResultData[d.properties.ST_NAME][d.properties.PC_NO];
            //console.log("obj else else");
          }
        }
        // break;
      }
    }
    // For AC
    else {
      ////console.log("AC", mapResult, d.properties);
      if (
        mapResult &&
        mapResultData[d.properties.ST_NAME] &&
        mapResultData[d.properties.ST_NAME][d.properties.AC_NO]
      ) {
        // ////console.log("mapResult", stateName, d.properties.ST_NAME);
        // for single state selection only fill color
        if (
          stateName !== "Select State" &&
          stateName.toUpperCase() !== d.properties.ST_NAME.toUpperCase()
        ) {
          // obj = null;
        } else {
          // ////console.log("mapResult", "no state selected");
          // for single constitency selection only fill color

          //constituency selected but not correct
          ////console.log(
          //   "mapResult",
          //   select_constituency,
          //   d.properties,
          //   " ",
          //   // mapResultData[d.properties.ST_NAME],
          //   // select_constituency,
          //   mapResultData[d.properties.ST_NAME][d.properties.AC_NO].acNo !==
          //     select_constituency.acNo
          // );
          if (
            select_constituency.acNo !== -1 &&
            mapResultData[d.properties.ST_NAME][d.properties.AC_NO].acNo !==
              select_constituency.acNo
          ) {
            obj = null;
          } else {
            ////console.log(
            //   "mapResult",
            //   "no constituency selected",
            //   mapResultData[d.properties.ST_NAME][d.properties.AC_NO]
            // );
            obj = mapResultData[d.properties.ST_NAME][d.properties.AC_NO];
          }
        }
        // break;
      }
    }

    // }

    // //console.log("obj", obj);
    let rgba = [];
    if (obj) {
      let party = "",
        maxVotes = 0;
      for (let details of obj.candidates) {
        if (details.votesCount > maxVotes) {
          maxVotes = details.votesCount;
          party = details.party;
        }
      } //@ts-ignore
      ////console.log("party", party, maxVotes);
      if (PARTY_ALLIANCE_COLORS[party])
        //@ts-ignore
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

    //console.log(rgba);
    return rgba;
  };

  const _getTooltip = ({ object }) => {
    //console.log("tooltip called", object);
    if (object && mapResult) {
      let results = null,
        stateName = select_state;
      const mapResultData = mapResult["pcWiseData"];
      if (electionType === "LOK SABHA" || electionType === "INDIA") {
        if (
          mapResultData[object.properties.ST_NAME] &&
          mapResultData[object.properties.ST_NAME][object.properties.PC_NO]
        ) {
          if (
            stateName !== "Select State" &&
            stateName.toUpperCase() !== object.properties.ST_NAME.toUpperCase()
          ) {
          } else {
            ////console.log("tooltip correct state");
            if (
              select_constituency.pcNo !== -1 &&
              mapResultData[object.properties.ST_NAME][object.properties.PC_NO]
                .pcNo !== select_constituency.pcNo
            ) {
              results = null;
            } else {
              results =
                mapResultData[object.properties.ST_NAME][
                  object.properties.PC_NO
                ];
            }
          }
          // break;
        }
      } else {
        // let results = null,
        //   stateName = select_state;
        if (
          mapResultData[object.properties.ST_NAME] &&
          mapResultData[object.properties.ST_NAME][object.properties.AC_NO]
        ) {
          if (
            stateName &&
            stateName.toUpperCase() !== object.properties.ST_NAME.toUpperCase()
          ) {
          } else {
            if (
              select_constituency.acNo !== -1 &&
              mapResultData[object.properties.ST_NAME][object.properties.AC_NO]
                .acNo !== select_constituency.acNo
            ) {
              results = null;
            } else {
              results =
                mapResultData[object.properties.ST_NAME][
                  object.properties.AC_NO
                ];
            }
          }
          // break;
        }
      }

      if (results) {
        let voteShare = "",
          modeled = "",
          winningPartySeats = 0,
          winningParty = "";

        for (let details of results.candidates) {
          voteShare =
            voteShare +
            ` <p class="w-[200px] grid grid-cols-[70px_70px_70px]  ">
            <span class="font-[600] text-[12px] grid grid-cols-2 ">
              ${details.party} <span class="pl-1">:</span>
            </span>
            <span class="text-[gray] text-[12px] -ml-4">${new Intl.NumberFormat(
              "en-IN"
            ).format(details.votesCount)}</span>
           
            <span class="text-[gray] text-[12px] -ml-8"> <span class="px-2">|</span> ${details.voteShare?.toFixed(
              2
            )}%</span>
          </p>`;

          let deltaHtml = ``;
          if (details.delta < 0) {
            deltaHtml = `<span class="px-2 text-[12px] -ml-4 text-red-500 flex items-baseline gap-1">
            (
            <svg
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="10"
              height="10"
              className="w-5 h-5"
            >
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg> 
            ${details.delta?.toFixed(2)}%)
          </span>`;
          } else {
            deltaHtml = `<span class="px-2 text-[12px] -ml-4 text-green-500 flex items-baseline gap-1">
            (
            <svg
              fill="green"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              width="10"
              height="10"
              className="w-5 h-5"
            >
              <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
            </svg> 
            ${details.delta?.toFixed(2)}%)
          </span>`;
          }

          modeled =
            modeled +
            ` <p class=" w-[200px] grid grid-cols-[70px_70px_70px]   ">
             
            <span class="text-[gray] text-[12px]   ">${new Intl.NumberFormat(
              "en-IN"
            ).format(details.revisedVotesCount?.toFixed(0))}</span>
           
            <span class="text-[gray] text-[12px] -ml-6"> <span class="px-2">|</span> ${details.revisedVoteShare?.toFixed(
              2
            )}%</span>
            
            ${deltaHtml}
          </p>`;
          if (details.votesCount > winningPartySeats) {
            winningPartySeats = details.votesCount;
            winningParty = details.party;
          }
        } //results.winner
        return {
          html: `
          <div class="bg-white p-0 pt-0 rounded-lg w-fit min-w-[250px] max-w-[fit-content]">
          <p class="bg-[#fff9e0] rounded-md p-2.5 pl-3 text-[14px] ">
            <span class="font-[600]">${results.state}</span>
          </p>
          <div class="flex flex-col gap-1 text-[gray] pb-3 pt-2 px-4">
            <p class="flex gap-3 text-[13px]">
              <span class="">Constituency</span>
              <span class="text-black  font-[600]">
                <span class="pr-2 ">:</span> ${
                  electionType === "STATE" ? results.acName : results.pcName
                }
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

          <div class="flex flex-col gap-1 w-1/2">
            <span class="font-[600] pb-1">
              Vote Share
              <span class=" ">:</span>
            </span>
          <div class="pr-3 flex flex-col gap-[7px]" > ${voteShare}</div>
          </div>
                 
       
          <div class="flex flex-col gap-1  w-1/2  ">
          <span class="font-[600] pb-1 text-center">
            Modelled Vote
            <span class="px-2"></span>
          </span>
        <div class="flex flex-col gap-[7px] border-l-[1px] border-black pl-3 -ml-4 ">
        ${modeled}</div>
        </div>
          </div>

          <div>
            `,
        };
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

  const handleWheel = (e) => {
    e.preventDefault();
    //console.log("wheel", e);
    const delta = e.originalEvent.deltaY; // Get the delta value of the wheel event
    const newZoom = delta > 0 ? viewport.zoom - 1 : viewport.zoom + 1; // Adjust zoom level
    setViewport({
      ...viewport,
      zoom: newZoom,
    });
  };
  //console.log(layers, "layers", viewport);
  return (
    <>
      {!isFetchingGeojson && !loading && layers.length > 0 ? (
        <div
          id="react-map"
          className=" w-full h-[50vh]   lg:h-auto  overflow-hidden relative"
        >
          <DeckGL
            initialViewState={viewport}
            layers={layers} //@ts-ignore
            getTooltip={_getTooltip}
            getCursor={(e) => _getCursor(e)}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            pickingRadius={5}
            controller={true}
            width="100%"
            height="100%"
            style={{ backgroundColor: "lightgray" }}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            // mapStyle="mapbox://styles/mapbox/light-v9"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            // reuseMaps
            // preventStyleDiffing={true}
            // attributionControl={false}
            // onWheel={handleWheel}
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
              // reuseMaps
              // preventStyleDiffing={true}
              // attributionControl={false}
              onWheel={handleWheel}
            ></ReactMapGL>

            {/* <div id="map" className="absolute z-50 bottom-0 left-0">
              <div className="mapbox-attribution-container relative flex row-reverse">
                <div
                  className="flex justify-start"
                  style={{ placeItems: "baseline" }}
                >
                  <img
                    src={`/dhruv_logo.jpg`}
                    alt="copyright newsclick dot in"
                    className="m-1"
                    width="15%"
                    height="100%"
                  />
                </div>
              </div>
            </div> */}
          </DeckGL>{" "}
          <div
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              // border: "1px solid rgba(0, 0, 0, .7)",
              display: "flex",
              flexDirection: "column",
              zIndex: 2,

              borderRadius: "5px",
              boxShadow: "0 0 0 1.5px rgba(0, 0, 0, .3)",
            }}
          >
            <button
              className="py-[5px] px-2 bg-white rounded-t-md"
              onClick={handleZoomIn}
            >
              <svg
                fill="rgba(0, 0, 0, .7)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="18px"
                height="18px"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
            <button
              className="py-[4px] px-2 bg-white border-t-[2px] border-gray-300 border-b-[2px]"
              onClick={handleZoomOut}
            >
              <svg
                fill="rgba(0, 0, 0, .7)"
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
              className="py-[5px] px-2 bg-white rounded-b-md"
              onClick={handleResetToInitial}
            >
              <svg
                fill="rgba(0, 0, 0, .7)"
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
  mapStyle="mapbox://styles/mapbox/light-v9"
/>
</DeckGL> */
