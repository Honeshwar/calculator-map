import { useFilterContextValue } from "../../../context/FilterContext";
import Loading from "../../../components/Loading";
import React, { useEffect, useRef, useState, useCallback } from "react";
// import "./RangeSlider.css"; // Import CSS for styling (see below)

function RangeSlider() {
  const inputRef = useRef(null);
  const defaultRangeRef = useRef(null);
  const rangeRef = useRef(null);
  const deltaRef = useRef(null);

  // const [loading, setLoading] = useState(false);
  const {
    selected_party,
    selected_Voter_Percentage,
    setSelected_Voter_Percentage,
    electionType,
    selected_state,
    setCloseAnimation,
    default_delta_value,
    setDefault_delta_value,
  } = useFilterContextValue();

  useEffect(() => {
    const fetchParties = async () => {
      // setLoading(true);
      const type = electionType === "STATE" ? "state" : "nation";
      const state = electionType === "STATE" ? `&state=${selected_state}` : "";
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            "/analysis/voteshare?type=" +
            type +
            "&party=" +
            selected_party.party +
            state
        );
        const responseData = await response.json();
        const defaultRange = responseData.data;
        // const defaultRange = 33;
        // setValue(parseInt(event.target.value)); // Update slider value
        if (defaultRangeRef.current) {
          defaultRangeRef.current.innerText = defaultRange + "%";
          inputRef.current.value = defaultRange;
          // setValue(event.target.value);

          // if (defaultRange < 0) {
          //   // console.log("defaultRange +", defaultRange, typeof defaultRange);
          //   defaultRangeRef.current.style.color = "rgb(239, 68, 68)";
          // } else if (defaultRange > 0) {
          //   // console.log("defaultRange -", defaultRange, typeof defaultRange);
          //   defaultRangeRef.current.style.color = "rgb(34 ,197, 94)";
          // } else defaultRangeRef.current.style.color = "rgb(0,0,0)";
        }
        // dbn(defaultRange);
        setSelected_Voter_Percentage({
          delta: defaultRange,
          delta_type:
            defaultRange - selected_Voter_Percentage.delta > 0
              ? "positive"
              : "negative",
        });
        setValue(Number(defaultRange));
        setDefault_delta_value(Number(defaultRange));
        if (deltaRef.current) deltaRef.current.innerText = "0%";
        // setLoading(false);
      } catch (error) {
        console.log("error in fetch parties", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchParties();
  }, [selected_party, electionType]);
  // useEffect(() => {
  //   if (selected_Voter_Percentage.delta !== 0) {
  //     setSelected_Voter_Percentage(0);
  //     rangeRef.current.innerText = 0 + "%";
  //     rangeRef.current.style.color = "rgb(0,0,0)";
  //     const input = document.getElementById("range-slider");
  //     input.value = 0;
  //   }
  // }, [electionType]);
  const [value, setValue] = useState(-1); // State to manage slider value

  // Create a debounced version of the handleChange function
  const debouncedHandleChange = useCallback(
    debouncing((v) => setSelected_Voter_Percentage(v), 500),
    []
  );
  // const dbn = debouncing((v) => {
  //   // const delta = v.delta - selected_Voter_Percentage.delta;
  //   // if (delta >= 0) {
  //   //   deltaRef.current.innerText = "+" + delta.toFixed(0) + "%";
  //   // } else {
  //   //   deltaRef.current.innerText = delta.toFixed(0) + "%";
  //   // }

  //   const delta = Number(v.delta);
  //   console.log("delta", typeof delta);
  //   if (delta === 0) {
  //     deltaRef.current.innerText = "0%";
  //   } else if (delta > 0) {
  //     deltaRef.current.innerText = "+" + delta.toFixed(0) + "%";
  //   } else {
  //     deltaRef.current.innerText = delta.toFixed(0) + "%";
  //   }

  //   setSelected_Voter_Percentage(v);
  // }, 1000);
  const handleChange = (event, click = false) => {
    const newValue = click
      ? Number(event).toFixed(0)
      : Number(event.target.value);

    // color change
    if (newValue < value) {
      rangeRef.current.style.color = "rgb(239, 68, 68)"; //red
    } else if (newValue >= value) {
      rangeRef.current.style.color = "rgb(34 ,197, 94)"; //green
    }

    // check is user click or slide
    if (click) {
      inputRef.current.value = newValue;
    }
    // else rangeRef.current.style.color = "rgb(0,0,0)";

    const newDelta = newValue - default_delta_value;

    // setting delta at input  slider
    if (newDelta === 0) {
      deltaRef.current.innerText = "0%";
    } else if (newDelta > 0) {
      deltaRef.current.innerText = "+" + newDelta.toFixed(0) + "%";
    } else {
      deltaRef.current.innerText = newDelta.toFixed(0) + "%";
    }

    debouncedHandleChange({
      delta: Math.abs(newDelta).toFixed(0),
      delta_type: newDelta >= 0 ? "positive" : "negative",
    });
    setValue(Number(newValue));
  };

  console.log("value", value);
  function debouncing(func, delay) {
    let timeoutId;
    return (...args) => {
      // console.log("args", args, timeoutId);
      let a = clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log("called", a);
        func.apply(null, args);
      }, delay);
      // console.log("timeoutId", timeoutId);
    };
  }

  return (
    <>
      {default_delta_value === -1 ? (
        <Loading />
      ) : (
        <>
          <div className="w-full flex gap-3 items-center mt-6">
            <div className="slider-container px-3  py-[10px] border-2 rounded-full flex justify-center items-center">
              <input
                ref={inputRef}
                id="range-slider"
                type="range"
                min="0"
                max="100"
                defaultValue={value}
                onChange={handleChange}
                className="slider range-slider rounded-full py-[7px] "
              />

              {/* value change */}
              <span
                ref={rangeRef}
                className={"value-display "}
                style={{
                  left:
                    value <= 20
                      ? value + 10 + `%`
                      : value <= 40
                      ? value + 7 + `%`
                      : value <= 60
                      ? value + 3 + `%`
                      : value <= 80
                      ? value - 2 + `%`
                      : value - 5 + `%`,
                  color: "gray",
                  top: "38px",
                  paddingInline: "20px",
                }}
              >
                {value === default_delta_value ? "" : value + "%"}
              </span>

              {/* dotted line and default value change*/}
              <span
                // onClick={() => handleChange(default_delta_value, true)}
                className="border-r border-dashed border-gray-400  absolute  h-full w-[1px] z-[0]"
                style={{
                  left:
                    default_delta_value === 0
                      ? default_delta_value + 6 + `%`
                      : default_delta_value <= 5
                      ? default_delta_value + 8 + `%`
                      : default_delta_value <= 10
                      ? default_delta_value + 7 + `%`
                      : default_delta_value <= 15
                      ? default_delta_value + 6 + `%`
                      : default_delta_value <= 20
                      ? default_delta_value + 5 + `%`
                      : default_delta_value <= 25
                      ? default_delta_value + 4.5 + `%`
                      : default_delta_value <= 30
                      ? default_delta_value + 3.5 + `%`
                      : default_delta_value <= 35
                      ? default_delta_value + 2.9 + `%`
                      : default_delta_value <= 40
                      ? default_delta_value + 1.9 + `%`
                      : default_delta_value <= 45
                      ? default_delta_value + 1.3 + `%`
                      : default_delta_value <= 50
                      ? default_delta_value + 0.5 + `%`
                      : default_delta_value <= 55
                      ? default_delta_value - 0.5 + `%`
                      : default_delta_value <= 60
                      ? default_delta_value - 1.2 + `%`
                      : default_delta_value <= 65
                      ? default_delta_value - 2.5 + `%`
                      : default_delta_value <= 70
                      ? default_delta_value - 3.3 + `%`
                      : default_delta_value <= 75
                      ? default_delta_value - 4.1 + `%`
                      : default_delta_value <= 80
                      ? default_delta_value - 5.2 + `%`
                      : default_delta_value <= 85
                      ? default_delta_value - 5.8 + `%`
                      : default_delta_value <= 90
                      ? default_delta_value - 6.3 + `%`
                      : default_delta_value <= 95
                      ? default_delta_value - 7.4 + `%`
                      : default_delta_value <= 99
                      ? default_delta_value - 8 + `%`
                      : default_delta_value - 6 + `%`,
                }}
              ></span>
              <span
                onClick={() => handleChange(default_delta_value, true)}
                ref={defaultRangeRef}
                className={"value-display  cursor-pointer"}
                style={{
                  left:
                    default_delta_value <= 5
                      ? default_delta_value + 8 + `%`
                      : default_delta_value <= 10
                      ? default_delta_value + 7 + `%`
                      : default_delta_value <= 15
                      ? default_delta_value + 6 + `%`
                      : default_delta_value <= 20
                      ? default_delta_value + 5 + `%`
                      : default_delta_value <= 25
                      ? default_delta_value + 4.5 + `%`
                      : default_delta_value <= 30
                      ? default_delta_value + 3.5 + `%`
                      : default_delta_value <= 35
                      ? default_delta_value + 2.9 + `%`
                      : default_delta_value <= 40
                      ? default_delta_value + 1.9 + `%`
                      : default_delta_value <= 45
                      ? default_delta_value + 1.3 + `%`
                      : default_delta_value <= 50
                      ? default_delta_value + 0.5 + `%`
                      : default_delta_value <= 55
                      ? default_delta_value - 0.5 + `%`
                      : default_delta_value <= 60
                      ? default_delta_value - 1.5 + `%`
                      : default_delta_value <= 65
                      ? default_delta_value - 2.5 + `%`
                      : default_delta_value <= 70
                      ? default_delta_value - 3.3 + `%`
                      : default_delta_value <= 75
                      ? default_delta_value - 4.3 + `%`
                      : default_delta_value <= 80
                      ? default_delta_value - 5.2 + `%`
                      : default_delta_value <= 85
                      ? default_delta_value - 5.8 + `%`
                      : default_delta_value <= 90
                      ? default_delta_value - 6.3 + `%`
                      : default_delta_value <= 95
                      ? default_delta_value - 7.4 + `%`
                      : default_delta_value - 8 + `%`,
                  color: "gray",
                  top: "-28px",
                }}
              >
                {default_delta_value}%
              </span>

              {/* tooltip/delta */}
              <span
                onClick={() => handleChange(default_delta_value, true)}
                ref={deltaRef}
                className={"absolute text-[10px] top-[calc(50%-6px)]"}
                style={{
                  left:
                    value <= 15
                      ? value + 13 + `%`
                      : value <= 20
                      ? value - 8 + `%`
                      : value <= 40
                      ? value - 12 + `%`
                      : value <= 60
                      ? value - 16 + `%`
                      : value <= 80
                      ? value - 21 + `%`
                      : value - 25 + `%`,
                  color: value <= 15 ? "gray" : "white",
                }}
              >
                {/* {"-5%"} */}
              </span>
            </div>

            {/* info icon btn */}
            <svg
              onClick={() => setCloseAnimation(false)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192 512"
              fill="gray"
              className="w-5 h-5 border-2 border-gray-300 hover:border-gray-600 cursor-pointer  rounded-full p-[4px]"
            >
              <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
            </svg>
          </div>

          {/* after input slider */}
          <div className="w-full flex justify-center items-center gap-5    mt-8">
            {/* decrease input */}
            <form
              onSubmit={(e) => {
                e.preventDefault(), console.log("e", e);
                const inputValue = Number("-" + e.target[0].value);

                const value1 = inputValue + value;
                // console.log("inputValue", inputValue, value1);
                if (inputValue === 0 || value === 0) return;
                handleChange(value1 < 0 ? 0 : value1, true);
              }}
              className="flex gap-1 items-center"
            >
              <input
                className="w-10 pl-1 number-input border-[1px] border-gray-400  rounded-sm outline-none"
                type="number"
                placeholder="0"
                min={0}
                max={100}
                required
              />
              <button
                className="font-extrabold bg-gray-400 hover:bg-gray-500 rounded-sm flex justify-center items-center w-6 h-6 text-white"
                type="submit"
              >
                -
              </button>
            </form>
            {/* reset button */}
            <div className="w-fit  flex justify-center ">
              <button
                onClick={() => handleChange(default_delta_value, true)}
                className="text-sm bg-gray-400 rounded-md px-2 py-[5px] text-white w-full hover:bg-gray-500"
              >
                Reset
              </button>
            </div>

            {/* increase input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("e", e);
                const inputValue = Number(e.target[0].value);

                const value1 = inputValue + value;
                // console.log(
                //   "inputValue",
                //   inputValue,
                //   value1,
                //   value,
                //   typeof value
                // );
                if (inputValue === 0 || value === 100) return;
                handleChange(value1 > 100 ? 100 : value1, true);
              }}
              className="flex gap-1 items-center"
            >
              <input
                className="w-10 pl-1 number-input border-[1px] border-gray-400  rounded-sm outline-none"
                type="number"
                placeholder="0"
                min={0}
                max={100}
                required
              />
              <button
                className="font-extrabold bg-gray-400 hover:bg-gray-500 rounded-sm flex justify-center items-center w-6 h-6 text-white"
                type="submit"
              >
                +
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
//
export default RangeSlider;
{
  /* <div className=" flex gap-5 justify-between items-center w-[80%]   mt-2 mx-2">
<div className="flex items-center justify-center">
  <span
    onClick={() => {
      const newDelta = selected_Voter_Percentage.delta - 10;
      handleChange(newDelta >= -100 ? newDelta : -100, true);
    }}
    className="h-6 w-6 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-400 cursor-pointer"
  >
    -
  </span>
  <span className="ml-1 text-sm">10%</span>
</div>
<span
  ref={rangeRef}
  className={clsx("text-sm pt-1", {
    "text-red-500": value < 0,
    "text-green-500": value > 0,
    "text-black": value === 0,
  })}
>
  {value}%
</span>
<div className="flex items-center justify-center">
  <span
    onClick={() => {
      const newDelta = selected_Voter_Percentage.delta + 10;
      handleChange(newDelta <= 100 ? newDelta : 100, true);
    }}
    className="h-6 w-6 flex justify-center items-center rounded-full bg-orange-200 hover:bg-orange-300 cursor-pointer"
  >
    +
  </span>
  <span className="ml-1 text-sm">10%</span>
</div>
</div> */
}
