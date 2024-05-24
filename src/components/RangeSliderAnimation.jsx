export default function RangeSliderAnimation({ setCloseAnimation }) {
  return (
    <div
      id="election_calculator-range_animation"
      onClick={() => setCloseAnimation(true)}
      className="z-50 fixed  top-0 left-0 bg-black/55 w-full h-full flex justify-center items-center px-2"
    >
      <div
        className="w-[90%] h-[200px]  sm:w-[350px] sm:h-[200px] bg-white text-gray-500 rounded-lg px-6 pb-5  flex flex-col gap-5 relative justify-center"
        style={{ boxShadow: "0px 0px 5px .5px   gray" }}
      >
        <div className="absolute right-2 top-2">
          <svg
            onClick={() => {
              setCloseAnimation(true);
              // if (closeAnimation === -1) {
              //   localStorage.setItem("onceCloseAnimation", "true");
              // }
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="lightgray"
            width={"25px"}
            height={"25px"}
            className="fill-gray-400 hover:fill-gray-500 cursor-pointer"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
        <h5 className="  rounded-lg   w-full text-sm sm:text-[16px] text-gray-500 text-center">
          Drag left and right progress bar to change votershare percentage
        </h5>

        <div className="slider-container  py-[10px] border-2 rounded-full flex justify-center items-center px-5 mt-4">
          <input
            id="range-slider"
            type="range"
            min="0"
            max="100"
            defaultValue={60}
            disabled={true}
            // onChange={(e) => setValue(e.target.value)}
            className="slider range-slider rounded-full py-[7px] "
          />
          <span
            className={"value-display  "}
            style={{ left: 60 - 1 + `%`, color: "green", top: "-25px" }}
          >
            {60 + "%"}
          </span>
          <span
            className="border-r border-dashed border-gray-400  absolute  h-full w-[1px] cursor-pointer"
            style={{ left: 37.2 + 2 + `%` }}
          ></span>

          <span
            className={"value-display mt-4 cursor-pointer"}
            style={{ left: 37.2 + 2 + `%`, color: "gray", top: "23px" }}
          >
            {37.2}%
          </span>
          <div className=" flex justify-center absolute top-7 right-[60px]  animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="gray"
              width="40px"
              height={"40px"}
              className="pointer-cursor-animation "
            >
              <path d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c20.6 0 38.2 13 45 31.2c8.8-9.3 21.2-15.2 35-15.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v48 16 48c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
