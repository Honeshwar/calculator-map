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
  const [selected_party, setSelected_party] = useState({
    party: "BJP",
    state: "Delhi",
  });
  const [showPartyDropDown, setShowPartyDropDown] = useState(false);

  const [default_delta_value, setDefault_delta_value] = useState(-1);
  const [selected_Voter_Percentage, setSelected_Voter_Percentage] = useState({
    delta: -1,
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

        fetch(`data/geojson/parliament.geojson`),
      ])
        .then(async ([res1, res3]) => {
          const a = await res1.json();

          const c = await res3.json();

          // console.log("geojson", a, c);

          setStateGeojson(a);

          setPCGeojson(c);

          setIsFetchingGeojson(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const [closeAnimation, setCloseAnimation] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "auto";
    const timeout = setTimeout(() => {
      if (closeAnimation === false) setCloseAnimation(true);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "auto";
    };
  });
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
        default_delta_value,
        setDefault_delta_value,

        setCloseAnimation,
        // stateLayer,
      }}
    >
      {children}

      {(!closeAnimation || closeAnimation === -1) && (
        <RangeSliderAnimation
          // closeAnimation={closeAnimation}
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
