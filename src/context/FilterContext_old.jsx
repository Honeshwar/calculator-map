"use client";
import { createContext, useContext, useEffect, useState } from "react";

// first of all module is a coponent
//create context
const context = createContext();
// //@ts-ignore
// const PCGeojsonContext = createContext();

// /**
//  * Assembly Constituencies GeoJson
//  */ //@ts-ignore
// const ACGeojsonContext = createContext();

// /**
//  * States & UTs GeoJson
//  */ //@ts-ignore
// const StateGeojsonContext = createContext();

//provide context
function FilterContextProvider({ children }) {
  // const [select_sabha, setSelect_sabha] = useState("Vidhan Sabha"); //or Lok Sabha/Vidhan Sabha
  const [select_state, setSelect_state] = useState("Select State");
  // const [select_constituency, setSelect_constituency] = useState(
  //   select_sabha === "Vidhan Sabha"
  //     ? {
  //         acNo: -1,
  //         acName: "Select AC",
  //       }
  //     : {
  //         pcNo: -1,
  //         pcName: "Select PC",
  //       }
  // );
  const [select_election_year, setSelect_election_year] = useState(
    "Select Election year"
  );
  // const [select_compare_year, setSelect_compare_year] = useState([]); //"2018"
  // const [filterData, setFilterData] = useState({});

  // dropdowns
  const [showStateDropDown, setShowStateDropDown] = useState(false);
  // const [showConstituencyDropDown, setShowConstituencyDropDown] =
  //   useState(false);
  const [showElectionYearDropDown, setShowElectionYearDropDown] =
    useState(false);

  // map
  // const [stateGeojson, setStateGeojson] = useState([]);
  // const [assemblyConstituenciesGeojson, setAssemblyConstituenciesGeojson] =
  //   useState([]);
  // const [
  //   parliamentaryConstituenciesGeojson,
  //   setParliamentaryConstituenciesGeojson,
  // ] = useState([]);

  // const [mapResult, setMapResult] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [mapFilteredData, setMapFilteredData] = useState({});

  // const [constituencyFilterData, setConstituencyFilterData] = useState({});
  // select_state === "Jammu & Kashmir"
  // ? "Jammu %26 Kashmir"
  // :
  // useEffect(() => {
  //   if (
  //     select_state !== "Select State" &&
  //     (select_sabha === "Vidhan Sabha"
  //       ? select_constituency.acNo !== -1
  //       : select_constituency.pcNo !== -1) &&
  //     select_election_year !== "Select Election year"
  //   ) {
  //     //call api
  //     const getFilterResult = async () => {
  //       try {
  //         const response = await fetch(
  //           `${
  //             process.env.NEXT_PUBLIC_API_URL
  //           }/result/election-result/filter?election_type=${
  //             select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //           }&state=${select_state}&constituency=${
  //             select_sabha === "Vidhan Sabha"
  //               ? select_constituency.acNo
  //               : select_constituency.pcNo
  //           }&years=${JSON.stringify([
  //             select_election_year,
  //             ...select_compare_year,
  //           ])}`
  //         );
  //         const responseData = await response.json();
  //         //console.log("filter result", responseData);
  //         setFilterData(responseData.data);
  //         setMapFilteredData({
  //           select_state,
  //           select_constituency,
  //         });

  //         //fiter data of contituency table
  //         const res2 = await fetch(
  //           process.env.NEXT_PUBLIC_API_URL +
  //             `/result/candidates/filter?election_type=${
  //               select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //             }&limit=7&page=` +
  //             1 +
  //             "&state=" +
  //             select_state +
  //             "&constituency=" +
  //             (select_sabha === "Vidhan Sabha"
  //               ? select_constituency.acNo
  //               : select_constituency.pcNo) +
  //             "&year=" +
  //             select_election_year
  //         );

  //         const res2Data = await res2.json();
  //         setConstituencyFilterData(res2Data.data);

  //         // //for charts filter data
  //         // const chartResponse = await fetch(
  //         //   `https://dhruvresearch.com/api/v2/result/demographics/filter?election_type=${
  //         //     select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //         //   }&state=${select_state}&constituency=${
  //         //     select_sabha === "Vidhan Sabha"
  //         //       ? select_constituency.acNo
  //         //       : select_constituency.pcNo
  //         //   }&years=${JSON.stringify([
  //         //     select_election_year,
  //         //     ...select_compare_year,
  //         //   ])}`
  //         // );
  //         // const chartResponseData = await chartResponse.json();

  //         // setChartsFilterData(chartResponseData.data);
  //       } catch (error) {
  //         //console.log(error);
  //       }
  //     };
  //     getFilterResult();
  //   }
  // }, [
  //   select_sabha,
  //   select_state,
  //   select_constituency,
  //   select_election_year,
  //   select_compare_year,
  // ]);

  // // useEffect(() => {
  // //   //call api
  // //   const getFilterResult = async () => {
  // //     const response = await fetch(
  // //       `${
  // //         process.env.NEXT_PUBLIC_API_URL
  // //       }/result/election-result?election_type=${
  // //         select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  // //       }${select_state !== "Select State" ? "&state=" + select_state : ""}${
  // //         select_sabha === "Vidhan Sabha"
  // //           ? select_constituency.acNo !== -1
  // //             ? "&constituency=" + select_constituency.acNo
  // //             : ""
  // //           : select_constituency.pcNo !== -1
  // //           ? "&constituency=" + select_constituency.pcNo
  // //           : ""
  // //       }${
  // //         select_election_year !== "Select Election year"
  // //           ? "&years=" +
  // //             JSON.stringify([select_election_year, ...select_compare_year])
  // //           : ""
  // //       }`
  // //     );
  // //     const responseData = await response.json();
  // //     //console.log("filter result", responseData);
  // //     setFilterData(responseData.data);
  // //     setMapFilteredData({
  // //       select_state,
  // //       select_constituency,
  // //     });
  // //   };
  // //   try {
  // //     getFilterResult();
  // //   } catch (error) {
  // //     //console.log(error);
  // //   }
  // // }, [
  // //   select_sabha,
  // //   select_state,
  // //   select_constituency,
  // //   select_election_year,
  // //   select_compare_year,
  // // ]);

  // useEffect(() => {
  //   const getMapResult = async () => {
  //     try {
  //       const res = await fetch(
  //         `https://dhruvresearch.com/api/v2/result/map?election_type=${
  //           select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //         }${select_state !== "Select State" ? `&state=${select_state}` : ""}${
  //           select_election_year !== "Select Election year"
  //             ? `&year=${select_election_year}`
  //             : ""
  //         }`
  //       );

  //       const d = await res.json();

  //       // //console.log("mapResult", d);

  //       setMapResult(d.data);
  //       //console.log("select-state", Object.keys(d.data));
  //       select_sabha === "Vidhan Sabha"
  //         ? setSelect_state(Object.keys(d.data)[0])
  //         : null;
  //       setLoading(false);
  //     } catch (error) {
  //       //console.log("error in fetch map election result", error);
  //     }
  //   };
  //   setLoading(true);
  //   getMapResult();
  // }, [select_sabha, select_state, select_election_year]);
  // const resetFilterToInitial = (number) => {
  //   switch (number) {
  //     case 1:
  //       setSelect_compare_year([]);
  //       break;
  //     case 2:
  //       setSelect_election_year("Select Election year");
  //       setSelect_compare_year([]);
  //       break;
  //     case 3:
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
  //       setSelect_election_year("Select Election year");
  //       setSelect_compare_year([]);
  //       break;
  //     case 4:
  //       setSelect_state("Select State");
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
  //       setSelect_election_year("Select Election year");
  //       setSelect_compare_year([]);
  //       setShowConstituencyDropDown(false);
  //       setShowElectionYearDropDown(false);
  //       setShowStateDropDown(false);
  //       break;
  //     default:
  //     //console.log("reset filter error");
  //   }
  // };

  // useEffect(() => {
  //   Promise.all([
  //     fetch(`data/geojson/states.geojson`),
  //     fetch(`data/geojson/assembly.geojson`),
  //     fetch(`data/geojson/parliament.geojson`),
  //     // fetch(
  //     //   `https://dhruvresearch.com/api/v2/result/map?election_type=${
  //     //     select_sabha === "Vidhan Sabha" ? "VS" : "LS"
  //     //   }`
  //     // ),
  //   ])
  //     .then(async ([res1, res2, res3]) => {
  //       const a = await res1.json();
  //       const b = await res2.json();
  //       const c = await res3.json();
  //       // const d = await res4.json();
  //       //console.log("mapResult", a, b, c);
  //       setStateGeojson(a);
  //       setAssemblyConstituenciesGeojson(b);
  //       setParliamentaryConstituenciesGeojson(c);
  //       // setMapResult(d.data);
  //       // setLoading(false);
  //     })
  //     .catch((error) => {
  //       //console.log(error);
  //     });
  // }, []);

  // function csvToJSON(csvText: string) {
  //   // Split the CSV text into lines
  //   const lines = csvText.split("\n");

  //   // Extract headers
  //   const headers = lines[0].split(",");

  //   // Convert lines to JSON objects
  //   const jsonData = [];
  //   for (let i = 1; i < lines.length; i++) {
  //     const data = lines[i].split(",");
  //     const entry = {};
  //     for (let j = 0; j < headers.length; j++) {
  //       entry[headers[j]] = data[j];
  //     }
  //     jsonData.push(entry);
  //   }

  //   return jsonData;
  // }
  return (
    <context.Provider
      value={{
        // select_sabha,
        // setSelect_sabha,
        select_state,
        setSelect_state,
        // select_constituency,
        // setSelect_constituency,
        select_election_year,
        setSelect_election_year,
        // select_compare_year,
        // setSelect_compare_year,

        showStateDropDown,
        setShowStateDropDown,
        // showConstituencyDropDown,
        // setShowConstituencyDropDown,
        showElectionYearDropDown,
        setShowElectionYearDropDown,

        // filterData,
        // setFilterData,

        // resetFilterToInitial,

        // mapResult,
        // loading,
        // setLoading,
        // mapFilteredData,
        // constituencyFilterData,
        // setConstituencyFilterData,
      }}
    >
      {/* <StateGeojsonContext.Provider value={stateGeojson}>
        <ACGeojsonContext.Provider value={assemblyConstituenciesGeojson}>
          <PCGeojsonContext.Provider value={parliamentaryConstituenciesGeojson}> */}
      {children}
      {/* </PCGeojsonContext.Provider>
        </ACGeojsonContext.Provider>
      </StateGeojsonContext.Provider> */}
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
