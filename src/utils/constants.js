/**
 * Default selection from general or assembly election
 */
export const ELECTION_VIEW_TYPE_DEFAULT = "general";

/**
 * Default selected election
 */
export const ELECTION_DEFAULT_SELECT = { type: "general", year: "2019" };
export const ELECTION_DEFAULT_SELECT_ASSEMBLY = {
  type: "assembly",
  year: "Upcoming",
};

/**
 * Option when no particular State/UT is selected
 */
export const FIRST_SELECT_STATEUT = "First select a State/UT";

/**
 * Value of selectedStateUT when no State/UT is Selected
 */
export const SELECT_STATE_UT = "Select a State/UT";

/**
 * Value of selectedElection when no Election is Selected
 */
export const SELECT_ELECTION = "Select an Election";

/**
 * Value of selectedConstituencies when no constituencies is Available
 */
export const NO_CONSTITUENCIES = "No Constituencies";

/**
 * Live Election
 */
export const LIVE_ELECTION = "Live";

/**
 * Live Election Year
 */
export const LIVE_ELECTION_YEAR = "2024";

/**
 * Live Election Type
 */
export const LIVE_ELECTION_TYPE = "assembly";

/**
 * Live Election States/UTs
 */
export const LIVE_ELECTION_STATEUT = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Odisha",
  "Sikkim",
];

/**
 * Upcoming Election Type
 */
export const UPCOMING_ELECTION_TYPE = "assembly";

/**
 * Upcoming Election Year
 */
export const UPCOMING_ELECTION_YEAR = "2019";

/**
 * Upcoming Election
 */
export const UPCOMING_ELECTION = "Upcoming";

/**
 * Upcoming Elections
 */
const UPCOMING_ELECTIONS_STATEUT = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Odisha",
  "Sikkim",
];

/**
 * Public GEOJSON URL
 */
export const GEOJSON_PATH = "/data/geojson";

/**
 * Candidate data of a party when no data is available
 */
export const NA_PARTY_DATA = {
  candidate: "N/A",
  party: "N/A",
  color: "#dddddd",
  votesReceived: 0,
};

/**
 * Candidate data of a alliance when no data is available
 */
export const NA_ALLIANCE_DATA = {
  candidate: "N/A",
  alliance: "N/A",
  color: "#dddddd",
  votesReceived: 0,
};

/**
 * Public CSV URL
 */
export const CSV_PATH = "/data/csv";

/**
 * Custom Alliance Text
 */
export const CUSTOM_ALLIANCE_TEXT =
  "After customizing alliances, clicking on the Alliance tab in the main page will display Alliance results.";

/**
 * Swings Text
 */
export const SWINGS_TEXT =
  "Adjust vote shares percentages by assigning swings. Total of all swings should be zero.";

/**
 * Election details: their type, year and state/UTs that had the election
 */
export const ELECTION_YEAR_STATEUT = {
  general: {
    2019: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu & Kashmir",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Tripura",
      "Uttar Pradesh",
      "West Bengal",
      "Chhattisgarh",
      "Jharkhand",
      "Uttarakhand",
      "Telangana",
      "Andaman & Nicobar Islands",
      "Chandigarh",
      "Dadra & Nagar Haveli",
      "Daman & Diu",
      "NCT of Delhi",
      "Lakshadweep",
      "Puducherry",
    ],
    2014: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu & Kashmir",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Tripura",
      "Uttar Pradesh",
      "West Bengal",
      "Chhattisgarh",
      "Jharkhand",
      "Uttarakhand",
      "Andaman & Nicobar Islands",
      "Chandigarh",
      "Dadra & Nagar Haveli",
      "Daman & Diu",
      "NCT of Delhi",
      "Lakshadweep",
      "Puducherry",
    ],
  },
  assembly: {
    2015: ["Bihar", "NCT of Delhi"],
    2016: ["Assam", "Kerala", "Tamil Nadu", "West Bengal", "Puducherry"],
    2017: [
      "Uttar Pradesh",
      "Manipur",
      "Himachal Pradesh",
      "Goa",
      "Uttarakhand",
      "Gujarat",
      "Punjab",
    ],
    2018: [
      "Tripura",
      "Meghalaya",
      "Nagaland",
      "Karnataka",
      "Chhattisgarh",
      "Madhya Pradesh",
      "Mizoram",
      "Rajasthan",
      "Telangana",
    ],
    2019: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Haryana",
      "Jharkhand",
      "Maharashtra",
      "Odisha",
      "Sikkim",
    ],
    2020: ["Bihar", "NCT of Delhi"],
    2021: ["Assam", "Kerala", "Puducherry", "Tamil Nadu", "West Bengal"],
    2022: [
      "Goa",
      "Gujarat",
      "Himachal Pradesh",
      "Manipur",
      "Punjab",
      "Uttar Pradesh",
      "Uttarakhand",
    ],
    2023: [
      "Meghalaya",
      "Nagaland",
      "Tripura",
      "Karnataka",
      "Chhattisgarh",
      "Madhya Pradesh",
      "Mizoram",
      "Rajasthan",
      "Telangana",
    ],
    Upcoming: UPCOMING_ELECTIONS_STATEUT,
    // Live: LIVE_ELECTION_STATEUT
  },
};

/**
 * Distinct colors for states
 */
export const STATE_COLORS = [
  "#A0A0A0",
  "#195F75",
  "#4E874E",
  "#E5993E",
  "#8A553F",
  "#9556AF",
  "#C53F3E",
  "#1582A5",
  "#60C361",
  "#B0A433",
  "#986B27",
  "#A54B6C",
  "#B65857",
];

/**
 * List of all States and UTs
 */
export const STATE_UT_LIST = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Tripura",
  "Uttar Pradesh",
  "West Bengal",
  "Chhattisgarh",
  "Jharkhand",
  "Uttarakhand",
  "Telangana",
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli",
  "Daman & Diu",
  "NCT of Delhi",
  "Lakshadweep",
  "Puducherry",
];

/**
 * Time interval for Live Update in Minutes
 */

export const DELAY_INTERVAL_MINUTES = 3;

/**
 * Default Group type
 */
export const DEFAULT_GROUP_TYPE = "party";

/**
 * Default Selection for Region
 */
export const REGION_DEFAULT_SELECT = "All Regions";

/**
 * Default Selection for States/UTs
 */
export const ALL_STATE_UT = "All States & UTs";

/**
 * Default Selection for Constituencies
 */
export const ALL_CONSTITUENCIES = "All Constituencies";

/**
 * Default Selection for Seats Types
 */
export const SEAT_DEFAULT_SELECT = "All Seats";

/**
 * Options for Seat Type
 */
export const SEAT_TYPE_OPTIONS = ["All Seats", "Reserved", "Unreserved"];

/**
 * Geojson Default State Fill Color
 */
export const DEFAULT_STATE_FILL_COLOR = [255, 255, 255, 0];

/**
 * Geojson Default State Line Color
 */
export const DEFAULT_STATE_LINE_COLOR = [60, 60, 60, 255];

/**
 * Geojson District Fill Color
 */
export const DEFAULT_DISTRICT_FILL_COLOR = [255, 255, 255, 125];

/**
 * Geojson District line Color for General Elections
 */
export const DEFAULT_DISTRICT_LINE_COLOR_GENERAL = [255, 255, 255, 255];

/**
 * Geojson District line Color for Assembly Elections
 */
export const DEFAULT_DISTRICT_LINE_COLOR_ASSEMBLY = [0, 0, 0, 255];

/**
 * Geojson Transparent Color
 */
export const TRANSPARENT_COLOR = [255, 255, 255, 0];

/**
 * Geojson Transparent color when no data is available
 */
export const MAP_TRANSPARENT_NA_COLOR = {
  red: 255,
  green: 255,
  blue: 255,
  alpha: 0,
};

/**
 * Default Party or Alliance Color
 */
export const DEFAULT_PARTY_ALLIANCE_COLOR = "#606060";

/**
 * Default Prediction Mode
 */
export const DEFAULT_PREDICTION_MODE = "off";

/**
 * State/UT names and their coordinates
 */
export const STATE_COORDINATES = [
  {
    state: "Andaman & Nicobar Islands",
    latitude: 10.5 - 0.03,
    longitude: 93,
    zoom: 5.8,
  },
  {
    state: "Andhra Pradesh",
    latitude: 16.25 - 0.03,
    longitude: 80.75,
    zoom: 5.9,
  },
  {
    state: "Arunachal Pradesh",
    latitude: 28.25 - 0.03,
    longitude: 94.5,
    zoom: 6.4,
  },
  {
    state: "Assam",
    latitude: 26.75 - 0.03,
    longitude: 92.75,
    zoom: 6.2,
  },
  {
    state: "Bihar",
    latitude: 26 - 0.03,
    longitude: 86,
    zoom: 6.5,
  },
  {
    state: "Chandigarh",
    latitude: 30.75 - 0.03,
    longitude: 76.78,
    zoom: 10,
  },
  {
    state: "Chhattisgarh",
    latitude: 21.0 - 0.03,
    longitude: 82.35,
    zoom: 6.2,
  },
  {
    state: "Dadra & Nagar Haveli",
    latitude: 20.2 - 0.03,
    longitude: 73.1,
    zoom: 10,
  },
  {
    state: "Daman & Diu",
    latitude: 20.4 - 0.03,
    longitude: 72.75,
    zoom: 10,
  },
  {
    state: "NCT of Delhi",
    latitude: 28.67 - 0.03,
    longitude: 77.1,
    zoom: 9.5,
  },
  {
    state: "Delhi",
    latitude: 28.67 - 0.03,
    longitude: 77.1,
    zoom: 9.5,
  },
  {
    state: "Gujarat",
    latitude: 22.5 - 0.03,
    longitude: 71.25,
    zoom: 6.3,
  },
  {
    state: "Goa",
    latitude: 15.35 - 0.03,
    longitude: 74,
    zoom: 8.6,
  },
  {
    state: "Haryana",
    latitude: 29.5 - 0.03,
    longitude: 76.25,
    zoom: 7.0,
  },
  {
    state: "Himachal Pradesh",
    latitude: 31.9 - 0.03,
    longitude: 77.25,
    zoom: 7,
  },
  {
    state: "Jammu & Kashmir",
    latitude: 34.75 - 0.03,
    longitude: 76.5,
    zoom: 6.0,
  },
  {
    state: "Jharkhand",
    latitude: 23.5 - 0.03,
    longitude: 85.75,
    zoom: 6.75,
  },
  {
    state: "Karnataka",
    latitude: 15 - 0.03,
    longitude: 76.25,
    zoom: 6.2,
  },
  {
    state: "Kerala",
    latitude: 10.5 - 0.03,
    longitude: 76.5,
    zoom: 6.7,
  },
  {
    state: "Ladakh",
    latitude: 34.2 - 0.03,
    longitude: 76.5,
    zoom: 6.0,
  },
  {
    state: "Lakshadweep",
    latitude: 10.5 - 0.03,
    longitude: 72.6,
    zoom: 6.5,
  },
  {
    state: "Madhya Pradesh",
    latitude: 23.75 - 0.03,
    longitude: 78.5,
    zoom: 5.8,
  },
  {
    state: "Maharashtra",
    latitude: 19.25 - 0.03,
    longitude: 76.65,
    zoom: 5.8,
  },
  {
    state: "Manipur",
    latitude: 24.75 - 0.03,
    longitude: 94,
    zoom: 7.6,
  },
  {
    state: "Meghalaya",
    latitude: 25.75 - 0.03,
    longitude: 91.25,
    zoom: 7.2,
  },
  {
    state: "Mizoram",
    latitude: 23.5 - 0.03,
    longitude: 93,
    zoom: 7.2,
  },
  {
    state: "Nagaland",
    latitude: 26.0 - 0.03,
    longitude: 94.5,
    zoom: 7.2,
  },
  {
    state: "Odisha",
    latitude: 20 - 0.03,
    longitude: 84.65,
    zoom: 6.2,
  },
  {
    state: "Puducherry",
    latitude: 11.25 - 0.03,
    longitude: 79.75,
    zoom: 8.0,
  },
  {
    state: "Punjab",
    latitude: 31.0 - 0.03,
    longitude: 75.5,
    zoom: 7.2,
  },
  {
    state: "Rajasthan",
    latitude: 27 - 0.03,
    longitude: 73.75,
    zoom: 5.8,
  },
  {
    state: "Sikkim",
    latitude: 27.5 - 0.03,
    longitude: 88.5,
    zoom: 7.8,
  },
  {
    state: "Tamil Nadu",
    latitude: 10.75 - 0.03,
    longitude: 78.5,
    zoom: 6.5,
  },
  {
    state: "Telangana",
    latitude: 18.0 - 0.03,
    longitude: 79.5,
    zoom: 6.8,
  },
  {
    state: "Tripura",
    latitude: 23.75 - 0.03,
    longitude: 91.75,
    zoom: 8.0,
  },
  {
    state: "Uttar Pradesh",
    latitude: 27.25 - 0.03,
    longitude: 80.75,
    zoom: 6.0,
  },
  {
    state: "Uttarakhand",
    latitude: 30.25 - 0.03,
    longitude: 79.25,
    zoom: 7,
  },
  {
    state: "West Bengal",
    latitude: 24.5 - 0.03,
    longitude: 88.3,
    zoom: 6.4,
  },
];

/**
 * Default Party/Alliance Color
 */
export const PARTY_ALLIANCE_COLORS = {
  OTHERS: "#B4B4B4",
  BJP: "#ED8918",
  SP: "#487b38",
  BSP: "#4171FE",
  RLD: "#396502",
  IUML: "#518D23",
  "KC(J)": "#CC990B",
  TRS: "#E55672",
  "KC(M)": "#CC990B",
  AGP: "#99CCFF",
  "KC(B)": "#CC990B",
  AINRC: "#F7BF0E",
  CMPKSC: "#FF0000",
  BPF: "#BD0026",
  ADMK: "#447603",
  AITC: "#75C848",
  "Congress(Secular)": "#E97A7E",
  JDS: "#00923F",
  INC: "#5EA449",
  "CPI(M)": "#E64A1D",
  CPM: "#E64A1D",
  CPIM: "#E64A1D",
  AIFB: "#DA461B",
  GJM: "#7CD11B",
  RSP: "#E54E47",
  IND: "#A6A6A6",
  DMK: "#cf451b",
  NCP: "#5CB4B2",
  CPI: "#E64A1D",
  AIUDF: "#4A8118",
  NSC: "#BD0026",
  AD: "#FFA500",
  AAP: "#1B66A4",
  AAAP: "#1B66A4",
  SBSP: "#F5D50A",
  "AD(S)": "#E36FCB",
  TDP: "#FBEC23",
  YSRCP: "#084202",
  SHS: "#E96D1F",
  RJD: "#4B8204",
  BJD: "#396502",
  SAD: "#EF9716",
  LJP: "#3294DD",
  "JD(U)": "#255a8e",
  RLSP: "#999966",
  BLSP: "#999966",
  JKPDP: "#4D8733",
  JMM: "#447E5A",
  JKNC: "#E64C3A",
  INLD: "#3A6600",
  "TMC(M)": "#207bc6",
  "JD(S)": "#006400",
  "BJP+": "#ED8918",
  "INC+": "#5EA449",
  "BSP-SP-RLD": "#0000FF",
  LEFT: "#DE0000",
  AIMIM: "#3A6C49",
  AJSUP: "#DA251C",
  SKM: "#E64A23",
  SDF: "#FAEC0D",
  NDPP: "#E64A21",
  ADAL: "#E36FCB",
  RLTP: "#DBE934",
  JKN: "#FF0000",
  BOPF: "#E8611C",
  "KEC(M)": "#CC990B",
  NPF: "#bd678b",
  NPEP: "#505d98",
  MNF: "#2E5694",
  VCK: "#427bb3",
  "KEC(J)": "#f76940",
  "KEC(B)": "f76940",
  GOJAM: "#7CD11B",
  HAMS: "#4B8204",
  MGB: "#E64A1D",
};
