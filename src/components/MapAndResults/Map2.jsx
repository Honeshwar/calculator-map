import * as React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { createRoot } from "react-dom/client";
import Map, { Source, Layer } from "react-map-gl";
import ControlPanel from "./CP";

import { dataLayer } from "./m-s";
import { updatePercentiles } from "../../utils/common-function";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGVzdGRldjExIiwiYSI6ImNsdmtwdmx4cjA0NHIycnJyZWhubW5hcHcifQ.-0EFQ2yAAQZxYivRZE7riQ"; // Set your mapbox token here

export default function Map2() {
  const [year, setYear] = useState(2015);
  const [allData, setAllData] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch(
      "https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson"
    )
      .then((resp) => resp.json())
      .then((json) => {
        console.log("Geojsoon", json);
        setAllData(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

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

  const data = useMemo(() => {
    const geojson = updatePercentiles(
      allData,
      (f) => f.properties.income[year]
    );
    console.log("update geojson", geojson);
    return allData && geojson;
  }, [allData, year]);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["data"]}
        onMouseMove={onHover}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
        {hoverInfo && (
          <div
            className="tooltip"
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <div>State: {hoverInfo.feature.properties.name}</div>
            <div>
              Median Household Income: {hoverInfo.feature.properties.value}
            </div>
            <div>
              Percentile: {(hoverInfo.feature.properties.percentile / 8) * 100}
            </div>
          </div>
        )}
      </Map>

      <ControlPanel year={year} onChange={(value) => setYear(value)} />
    </>
  );
}

// export function renderToDom(container) {
//   createRoot(container).render(<App />);
// }
