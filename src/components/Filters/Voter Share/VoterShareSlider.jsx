import RangeSlider from "./RangeSlider";

export default function VoterShareSlider() {
  return (
    <div className="w-full mt-1">
      <h5 className="font-[600] text-[1rem] text-gray-500">Voter Share</h5>
      {/* <p className="text-sm mt-1">
        18-29 <span className="text-[12px] text-gray-500">(19% of voters)</span>
      </p> */}
      <div className="rounded-lg p-2 w-full text-sm text-gray-500 ">
        Drag left and right progress bar <br />
        to change votershare percentage
      </div>
      <div className="w-full mt-[5px]  mb-4">
        <RangeSlider />
        {/* {showInfo && ( */}
        {/* <div
          style={{ boxShadow: "0px 0px 4px .1px lightgray" }}
          className="border rounded-lg p-2 mt-9 w-full text-sm text-gray-500 text-center"
        >
          Drag left and right progress bar <br />
          to change votershare percentage
        </div> */}
        {/* )} */}
      </div>
    </div>
  );
}
