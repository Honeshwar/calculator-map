import Filters from "../components/Filters/Filters";
import Footer from "../components/Footer/Footer";
import MapViewAndResult from "../components/MapAndResults/MapViewAndResult";
import Result from "../components/MapAndResults/Result";
import Navbar from "../components/Navbar/Navbar";
import RangeSliderAnimation from "../components/RangeSliderAnimation";
import { FilterContextProvider } from "../context/FilterContext";

export default function Home() {
  return (
    <>
      <Navbar />

      <FilterContextProvider>
        <main className="px-0 sm:px-10 py-5 pt-4 lg:h-[calc(100vh-80px)] mb-5">
          <div className="flex pl-4 md:pl-0 text-sm pb-3">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>

            <span className="mx-2 tracking-[-4px] font-[400] text-gray-800">
              {" "}
              &gt; &gt;
            </span>
            <span className=" text-gray-500">Election Timeline</span>
          </div>
          <section className="flex flex-wrap lg:flex-nowrap justify-center md:justify-between gap-5 h-full  pb-5 mt-1">
            <Filters />
            <div className="hidden sm:block lg:hidden">
              <Result />
            </div>

            {/* <MapViewAndResult /> */}
          </section>
        </main>
      </FilterContextProvider>
    </>
  );
}
