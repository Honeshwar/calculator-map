"use client";
import Map from "./Map";
import Result from "./Result";

export default function MapViewAndResult() {
  return (
    <div
      className="w-full border flex flex-wrap sm:flex-nowrap justify-center md:justify-between   pl-5 pr-7 py-4 rounded-lg gap-10 "
      style={{ boxShadow: "0px 0px 10px .5px lightgray" }}
    >
      <Map />
      <div className="block sm:hidden lg:block">
        <Result />
      </div>
    </div>
  );
}
