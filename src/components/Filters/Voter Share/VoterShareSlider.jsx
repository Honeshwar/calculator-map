import RangeSlider from "./RangeSlider";

export default function VoterShareSlider() {
  return (
    <div className="w-full mt-1">
      <h5 className="font-[600] text-[1rem] text-gray-500">Voter Share</h5>

      <div className="rounded-lg p-2 w-full text-sm text-gray-500 ">
        Drag left and right progress bar <br />
        to change votershare percentage
      </div>
      <div className="w-full mt-[5px]  mb-4">
        <RangeSlider />
      </div>
    </div>
  );
}
