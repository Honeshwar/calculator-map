"use client";
import { useFilterContextValue } from "../../context/FilterContext";
import { useCallback, useEffect, useState } from "react";

import ReactMapGl, { Source, Layer } from "react-map-gl";
import Loading from "../Loading";
// import ControlPanel from "./control-panel";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGVzdGRldjExIiwiYSI6ImNsdmtwdmx4cjA0NHIycnJyZWhubW5hcHcifQ.-0EFQ2yAAQZxYivRZE7riQ"; // Set your mapbox token here

export default function Map() {
  const [mapStyle, setMapStyle] = useState(null);

  const { isFetchingGeojson, PCGeojson } = useFilterContextValue();

  const [hoverInfo, setHoverInfo] = useState(null);
  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];
    console.log("onhover,hoveredFeature ", hoveredFeature, "X-->");
    console.log(x, "y-->", y);
    console.log("features", features);
    console.log("events", event);
    // prettier-ignore
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  const layerStyle = {
    id: "maine",
    type: "fill",
    source: "maine", // reference the data source
    layout: {},
    paint: {
      "fill-color": [
        "match",
        ["get", "PC_NO"],
        1,
        "#00ff00", // Color for Category1
        2,
        "#ff0000", // Color for Category2
        // Add more categories and colors as needed
        "#0000ff", // Default color for any other category
      ],
      "fill-opacity": 1,
    },
  };
  // Add a black outline around the polygon.
  const layerOutlineStyle = {
    id: "outline",
    type: "line",
    source: "maine",
    layout: {},
    paint: {
      "line-color": "#fff",
      "line-width": 1,
    },
  };
  return (
    <div className="  w-full md:min-w-[300px] max-w-[800px] overflow-hidden">
      {isFetchingGeojson ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <ReactMapGl
            initialViewState={{
              latitude: 23,
              longitude: 78.9629,
              zoom: 3.5,
            }}
            style={{ backgroundColor: "#f3f3f3" }}
            // mapStyle="mapbox://styles/mapbox/light-v9"
            // {mapStyle && mapStyle.toJS()}
            styleDiffing
            mapboxAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={["data"]}
            onMouseMove={onHover}
          >
            <Source type="geojson" data={PCGeojson}>
              <Layer {...layerOutlineStyle} />
              <Layer {...layerStyle} />
            </Source>

            {hoverInfo && (
              <div
                className="tooltip"
                style={{
                  backgroundColor: "black",
                  padding: "10px",
                  borderRadius: "5px",
                  position: "absolute",
                  //   left: hoverInfo.x,
                  //   top: hoverInfo.y,
                }}
              >
                <div>State: </div>
                <div>Median Household Income:</div>
                <div>Percentile:</div>
              </div>
            )}
          </ReactMapGl>
          {/* <ControlPanel onChange={setMapStyle} /> */}
        </>
      )}
    </div>
  );
}
