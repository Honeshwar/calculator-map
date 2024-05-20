"use client";
import RangeSliderAnimation from "../components/RangeSliderAnimation";
import { createContext, useContext, useEffect, useState } from "react";
//create context
const context = createContext();

//provide context
function FilterContextProvider({ children }) {
  const [electionType, setElectionType] = useState("INDIA");
  const [selected_election_year, setSelected_election_year] = useState(2019);
  const [showElectionYearDropDown, setShowElectionYearDropDown] =
    useState(false);
  const [selected_state, setSelected_state] = useState("Delhi");
  const [showStateDropDown, setShowStateDropDown] = useState(false);
  const [selected_pc, setSelected_pc] = useState("Sharamgarh");
  const [showPCDropDown, setShowPCDropDown] = useState(false);
  const [selected_party, setSelected_party] = useState("BJP");
  const [showPartyDropDown, setShowPartyDropDown] = useState(false);

  const [selected_Voter_Percentage, setSelected_Voter_Percentage] = useState({
    delta: 0,
    delta_type: "positive",
  });

  const [PCGeojson, setPCGeojson] = useState([]);
  const [StateGeojson, setStateGeojson] = useState([]);
  const [ACGeojson, setACGeojson] = useState([]);
  const [isFetchingGeojson, setIsFetchingGeojson] = useState(true);

  const [mapResult, setMapResult] = useState({});
  //   fetching geojson
  useEffect(() => {
    if (
      PCGeojson.length === 0 &&
      StateGeojson.length === 0 &&
      ACGeojson.length === 0
    ) {
      Promise.all([
        fetch(`data/geojson/states.geojson`),
        // fetch(`data/geojson/assembly.geojson`),
        fetch(`data/geojson/parliament.geojson`),
        // fetch(`https://dhruvresearch.com/api/v2/result/map?election_type=LS`),
        fetch(
          `https://dhruvresearch.com/api/v2/analysis/result?party=BJP&delta=0&delta_type=positive&state=Delhi&type=nation`
        ),
      ])
        .then(async ([res1, res3, res4]) => {
          const a = await res1.json();
          // const b = await res2.json();
          const c = await res3.json();
          const d = await res4.json();
          // console.log("geojson", a, c, d);
          console.log("geojson", a, c);
          setStateGeojson(a);
          // setACGeojson(b);
          setPCGeojson(c);
          setMapResult(d.data);
          // setLoading(false);

          setIsFetchingGeojson(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // // ELECTION TYPE BASIC MAP RESULT FETCH
  // useEffect(() => {
  //   const getMapResult = async () => {
  //     setIsFetchingGeojson(true);
  //     try {
  //       const res = await fetch(
  //         `https://dhruvresearch.com/api/v2/result/map?election_type=${
  //           electionType === "STATE" ? "VS" : "LS"
  //         }`
  //       ); //party param &patry = selected_party, &state = selected_state , &year = selected_election_year, &constituency = selected_pc, &voter_percentage = selected_Voter_Percentage
  //       const a = await res.json();
  //       // console.log("geojson", a, c, d);
  //       console.log("mapResult", a);

  //       setMapResult(a.data);
  //       setIsFetchingGeojson(false);
  //       setCallToGetMapResult(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (callToGetMapResult) {
  //     // setMapResult({});
  //     getMapResult();
  //   }
  // }, [callToGetMapResult]);

  // useEffect(() => {
  //   if (JSON.stringify(mapResult) !== "{}") setCallToGetMapResult(true);
  // }, [
  //   electionType,
  //   selected_party,
  //   selected_state,
  //   selected_pc,
  //   setSelected_election_year,
  //   selected_Voter_Percentage,
  // ]);

  //   fetching map result
  //   useEffect(() => {
  //     const getMapResult = async () => {
  //       try {
  //         const res = await fetch(
  //           `https://dhruvresearch.com/api/v2/result/map?election_type=LS`
  //         );
  //         // ${
  //         //     select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //         //   }${select_state !== "Select State" ? `&state=${select_state}` : ""}${
  //         //     select_election_year !== "Select Election year"
  //         //       ? `&year=${select_election_year}`
  //         //       : ""
  //         //   }
  //         const d = await res.json();

  //         // //console.log("mapResult", d);

  //         setMapResult(d.data);
  //         //console.log("select-state", Object.keys(d.data));
  //         // select_sabha === "Vidhan Sabha"
  //         //   ? setSelect_state(Object.keys(d.data)[0])
  //         //   : null;
  //         // setLoading(false);
  //       } catch (error) {
  //         //console.log("error in fetch map election result", error);
  //       }
  //     };
  //     setLoading(true);
  //     getMapResult();
  //   }, [select_sabha, select_state, select_election_year]);

  const [closeAnimation, setCloseAnimation] = useState(false);
  // useEffect(() => {
  //   const closeA = localStorage.getItem("onceCloseAnimation");
  //   if (closeA === null) setCloseAnimation(-1);
  // }, []);
  return (
    <context.Provider
      value={{
        electionType,
        selected_election_year,
        selected_state,
        selected_pc,
        selected_party,

        setElectionType,
        setSelected_election_year,
        setSelected_state,
        setSelected_pc,
        setSelected_party,

        showElectionYearDropDown,
        showStateDropDown,
        showPCDropDown,
        showPartyDropDown,

        setShowElectionYearDropDown,
        setShowStateDropDown,
        setShowPCDropDown,
        setShowPartyDropDown,

        PCGeojson,
        StateGeojson,
        ACGeojson,
        isFetchingGeojson,
        setIsFetchingGeojson,
        mapResult,
        setMapResult,
        selected_Voter_Percentage,
        setSelected_Voter_Percentage,

        setCloseAnimation,
      }}
    >
      {children}

      {(!closeAnimation || closeAnimation === -1) && (
        <RangeSliderAnimation
          closeAnimation={closeAnimation}
          setCloseAnimation={setCloseAnimation}
        />
      )}
    </context.Provider>
  );
}

//consumer
function useFilterContextValue() {
  return useContext(context);
}

function useProvideContext() {
  return {
    PCGeojson: useContext(PCGeojsonContext),
    ACGeojson: useContext(ACGeojsonContext),
    StateGeojson: useContext(StateGeojsonContext),
  };
}

export { FilterContextProvider, useFilterContextValue, useProvideContext };
