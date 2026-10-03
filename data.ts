export type LocationCity = {
  name: string;
  slug: string;
};

export type LocationState = {
  name: string;
  slug: string;
  cities: LocationCity[];
};

export type CountryLocations = {
  countrySlug: string;
  states: LocationState[];
};

type StateInput = readonly [name: string, cities: readonly string[]];

export function locationSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function country(countrySlug: string, states: readonly StateInput[]): CountryLocations {
  return {
    countrySlug,
    states: states.map(([name, cities]) => ({
      name,
      slug: locationSlug(name),
      cities: cities.map((cityName) => ({ name: cityName, slug: locationSlug(cityName) })),
    })),
  };
}

export const locationData: CountryLocations[] = [
  country("china", [
    ["Anhui", ["Hefei", "Wuhu"]],
    ["Beijing", ["Beijing"]],
    ["Chongqing", ["Chongqing"]],
    ["Fujian", ["Fuzhou", "Xiamen", "Quanzhou"]],
    ["Gansu", ["Lanzhou", "Tianshui"]],
    ["Guangdong", ["Guangzhou", "Shenzhen", "Dongguan", "Foshan"]],
    ["Guangxi", ["Nanning", "Guilin", "Liuzhou"]],
    ["Guizhou", ["Guiyang", "Zunyi"]],
    ["Hainan", ["Haikou", "Sanya"]],
    ["Hebei", ["Shijiazhuang", "Tangshan", "Baoding"]],
    ["Heilongjiang", ["Harbin", "Daqing"]],
    ["Henan", ["Zhengzhou", "Luoyang", "Anyang"]],
    ["Hong Kong", ["Hong Kong"]],
    ["Hubei", ["Wuhan", "Yichang"]],
    ["Hunan", ["Changsha", "Zhuzhou"]],
    ["Inner Mongolia", ["Hohhot", "Baotou"]],
    ["Jiangsu", ["Nanjing", "Suzhou", "Wuxi"]],
    ["Jiangxi", ["Nanchang", "Ganzhou"]],
    ["Jilin", ["Changchun", "Jilin City"]],
    ["Liaoning", ["Shenyang", "Dalian"]],
    ["Macau", ["Macau"]],
    ["Ningxia", ["Yinchuan", "Wuzhong"]],
    ["Qinghai", ["Xining", "Haidong"]],
    ["Shaanxi", ["Xi'an", "Baoji"]],
    ["Shandong", ["Jinan", "Qingdao", "Linyi"]],
    ["Shanghai", ["Shanghai"]],
    ["Shanxi", ["Taiyuan", "Datong"]],
    ["Sichuan", ["Chengdu", "Mianyang"]],
    ["Taiwan", ["Taipei", "Kaohsiung", "Taichung"]],
    ["Tianjin", ["Tianjin"]],
    ["Tibet", ["Lhasa", "Shigatse"]],
    ["Xinjiang", ["Urumqi", "Kashgar"]],
    ["Yunnan", ["Kunming", "Dali"]],
    ["Zhejiang", ["Hangzhou", "Ningbo", "Yiwu", "Wenzhou"]],
  ]),
  country("india", [
    ["Andhra Pradesh", ["Visakhapatnam", "Vijayawada", "Tirupati"]],
    ["Arunachal Pradesh", ["Itanagar", "Tawang"]],
    ["Assam", ["Guwahati", "Dibrugarh"]],
    ["Bihar", ["Patna", "Gaya"]],
    ["Chhattisgarh", ["Raipur", "Bhilai"]],
    ["Goa", ["Panaji", "Vasco da Gama"]],
    ["Gujarat", ["Ahmedabad", "Surat", "Vadodara", "Rajkot"]],
    ["Haryana", ["Gurugram", "Faridabad", "Panipat"]],
    ["Himachal Pradesh", ["Shimla", "Dharamshala"]],
    ["Jharkhand", ["Ranchi", "Jamshedpur"]],
    ["Karnataka", ["Bengaluru", "Mysuru", "Mangaluru"]],
    ["Kerala", ["Kochi", "Thiruvananthapuram", "Kozhikode"]],
    ["Madhya Pradesh", ["Indore", "Bhopal", "Gwalior"]],
    ["Maharashtra", ["Mumbai", "Pune", "Nagpur", "Nashik"]],
    ["Manipur", ["Imphal", "Thoubal"]],
    ["Meghalaya", ["Shillong", "Tura"]],
    ["Mizoram", ["Aizawl", "Lunglei"]],
    ["Nagaland", ["Kohima", "Dimapur"]],
    ["Odisha", ["Bhubaneswar", "Cuttack", "Rourkela"]],
    ["Punjab", ["Ludhiana", "Amritsar", "Jalandhar"]],
    ["Rajasthan", ["Jaipur", "Jodhpur", "Udaipur"]],
    ["Sikkim", ["Gangtok", "Namchi"]],
    ["Tamil Nadu", ["Chennai", "Coimbatore", "Tiruppur", "Madurai"]],
    ["Telangana", ["Hyderabad", "Warangal"]],
    ["Tripura", ["Agartala", "Dharmanagar"]],
    ["Uttar Pradesh", ["Noida", "Lucknow", "Kanpur", "Varanasi"]],
    ["Uttarakhand", ["Dehradun", "Haridwar"]],
    ["West Bengal", ["Kolkata", "Howrah", "Siliguri"]],
    ["Andaman and Nicobar Islands", ["Port Blair"]],
    ["Chandigarh", ["Chandigarh"]],
    ["Dadra and Nagar Haveli and Daman and Diu", ["Daman", "Silvassa"]],
    ["Delhi", ["Delhi", "New Delhi"]],
    ["Jammu and Kashmir", ["Srinagar", "Jammu"]],
    ["Ladakh", ["Leh", "Kargil"]],
    ["Lakshadweep", ["Kavaratti"]],
    ["Puducherry", ["Puducherry", "Karaikal"]],
  ]),
  country("australia", [
    ["Australian Capital Territory", ["Canberra"]],
    ["New South Wales", ["Sydney", "Newcastle", "Wollongong"]],
    ["Northern Territory", ["Darwin", "Alice Springs"]],
    ["Queensland", ["Brisbane", "Gold Coast", "Cairns"]],
    ["South Australia", ["Adelaide", "Mount Gambier"]],
    ["Tasmania", ["Hobart", "Launceston"]],
    ["Victoria", ["Melbourne", "Geelong", "Ballarat"]],
    ["Western Australia", ["Perth", "Fremantle", "Bunbury"]],
  ]),
  country("germany", [
    ["Baden-Wurttemberg", ["Stuttgart", "Mannheim", "Karlsruhe"]],
    ["Bavaria", ["Munich", "Nuremberg", "Augsburg"]],
    ["Berlin", ["Berlin"]],
    ["Brandenburg", ["Potsdam", "Cottbus"]],
    ["Bremen", ["Bremen", "Bremerhaven"]],
    ["Hamburg", ["Hamburg"]],
    ["Hesse", ["Frankfurt", "Wiesbaden", "Darmstadt"]],
    ["Lower Saxony", ["Hanover", "Braunschweig", "Osnabruck"]],
    ["Mecklenburg-Vorpommern", ["Rostock", "Schwerin"]],
    ["North Rhine-Westphalia", ["Cologne", "Dusseldorf", "Dortmund"]],
    ["Rhineland-Palatinate", ["Mainz", "Koblenz"]],
    ["Saarland", ["Saarbrucken", "Neunkirchen"]],
    ["Saxony", ["Leipzig", "Dresden", "Chemnitz"]],
    ["Saxony-Anhalt", ["Magdeburg", "Halle"]],
    ["Schleswig-Holstein", ["Kiel", "Lubeck"]],
    ["Thuringia", ["Erfurt", "Jena"]],
  ]),
  country("usa", [
    ["Alabama", ["Birmingham", "Montgomery"]],
    ["Alaska", ["Anchorage", "Fairbanks"]],
    ["Arizona", ["Phoenix", "Tucson"]],
    ["Arkansas", ["Little Rock", "Fayetteville"]],
    ["California", ["Los Angeles", "San Francisco", "San Diego"]],
    ["Colorado", ["Denver", "Colorado Springs"]],
    ["Connecticut", ["Bridgeport", "Hartford"]],
    ["Delaware", ["Wilmington", "Dover"]],
    ["Florida", ["Miami", "Orlando", "Tampa"]],
    ["Georgia", ["Atlanta", "Savannah"]],
    ["Hawaii", ["Honolulu", "Hilo"]],
    ["Idaho", ["Boise", "Idaho Falls"]],
    ["Illinois", ["Chicago", "Springfield"]],
    ["Indiana", ["Indianapolis", "Fort Wayne"]],
    ["Iowa", ["Des Moines", "Cedar Rapids"]],
    ["Kansas", ["Wichita", "Overland Park"]],
    ["Kentucky", ["Louisville", "Lexington"]],
    ["Louisiana", ["New Orleans", "Baton Rouge"]],
    ["Maine", ["Portland", "Augusta"]],
    ["Maryland", ["Baltimore", "Annapolis"]],
    ["Massachusetts", ["Boston", "Worcester"]],
    ["Michigan", ["Detroit", "Grand Rapids"]],
    ["Minnesota", ["Minneapolis", "Saint Paul"]],
    ["Mississippi", ["Jackson", "Gulfport"]],
    ["Missouri", ["Kansas City", "St Louis"]],
    ["Montana", ["Billings", "Missoula"]],
    ["Nebraska", ["Omaha", "Lincoln"]],
    ["Nevada", ["Las Vegas", "Reno"]],
    ["New Hampshire", ["Manchester", "Concord"]],
    ["New Jersey", ["Newark", "Jersey City"]],
    ["New Mexico", ["Albuquerque", "Santa Fe"]],
    ["New York", ["New York City", "Buffalo"]],
    ["North Carolina", ["Charlotte", "Raleigh"]],
    ["North Dakota", ["Fargo", "Bismarck"]],
    ["Ohio", ["Columbus", "Cleveland"]],
    ["Oklahoma", ["Oklahoma City", "Tulsa"]],
    ["Oregon", ["Portland", "Eugene"]],
    ["Pennsylvania", ["Philadelphia", "Pittsburgh"]],
    ["Rhode Island", ["Providence", "Newport"]],
    ["South Carolina", ["Charleston", "Columbia"]],
    ["South Dakota", ["Sioux Falls", "Rapid City"]],
    ["Tennessee", ["Nashville", "Memphis"]],
    ["Texas", ["Houston", "Dallas", "Austin"]],
    ["Utah", ["Salt Lake City", "Provo"]],
    ["Vermont", ["Burlington", "Montpelier"]],
    ["Virginia", ["Virginia Beach", "Richmond"]],
    ["Washington", ["Seattle", "Spokane"]],
    ["West Virginia", ["Charleston", "Morgantown"]],
    ["Wisconsin", ["Milwaukee", "Madison"]],
    ["Wyoming", ["Cheyenne", "Casper"]],
    ["District of Columbia", ["Washington"]],
  ]),
  country("uk", [
    ["England", ["London", "Birmingham", "Manchester", "Liverpool", "Leeds"]],
    ["Scotland", ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"]],
    ["Wales", ["Cardiff", "Swansea", "Newport"]],
    ["Northern Ireland", ["Belfast", "Derry", "Lisburn"]],
  ]),
  country("uae", [
    ["Abu Dhabi", ["Abu Dhabi", "Al Ain"]],
    ["Ajman", ["Ajman"]],
    ["Dubai", ["Dubai", "Jebel Ali"]],
    ["Fujairah", ["Fujairah", "Dibba Al-Fujairah"]],
    ["Ras Al Khaimah", ["Ras Al Khaimah"]],
    ["Sharjah", ["Sharjah", "Khor Fakkan"]],
    ["Umm Al Quwain", ["Umm Al Quwain"]],
  ]),
  country("new-zealand", [
    ["Auckland", ["Auckland", "Manukau"]],
    ["Bay of Plenty", ["Tauranga", "Rotorua"]],
    ["Canterbury", ["Christchurch", "Timaru"]],
    ["Gisborne", ["Gisborne"]],
    ["Hawke's Bay", ["Napier", "Hastings"]],
    ["Manawatu-Whanganui", ["Palmerston North", "Whanganui"]],
    ["Marlborough", ["Blenheim", "Picton"]],
    ["Nelson", ["Nelson"]],
    ["Northland", ["Whangarei", "Kerikeri"]],
    ["Otago", ["Dunedin", "Queenstown"]],
    ["Southland", ["Invercargill", "Gore"]],
    ["Taranaki", ["New Plymouth", "Hawera"]],
    ["Tasman", ["Richmond", "Motueka"]],
    ["Waikato", ["Hamilton", "Taupo"]],
    ["Wellington", ["Wellington", "Lower Hutt"]],
    ["West Coast", ["Greymouth", "Westport"]],
  ]),
  country("canada", [
    ["Alberta", ["Calgary", "Edmonton"]],
    ["British Columbia", ["Vancouver", "Victoria", "Surrey"]],
    ["Manitoba", ["Winnipeg", "Brandon"]],
    ["New Brunswick", ["Moncton", "Fredericton", "Saint John"]],
    ["Newfoundland and Labrador", ["St John's", "Corner Brook"]],
    ["Northwest Territories", ["Yellowknife", "Hay River"]],
    ["Nova Scotia", ["Halifax", "Sydney"]],
    ["Nunavut", ["Iqaluit", "Rankin Inlet"]],
    ["Ontario", ["Toronto", "Ottawa", "Hamilton"]],
    ["Prince Edward Island", ["Charlottetown", "Summerside"]],
    ["Quebec", ["Montreal", "Quebec City", "Laval"]],
    ["Saskatchewan", ["Saskatoon", "Regina"]],
    ["Yukon", ["Whitehorse", "Dawson City"]],
  ]),
  country("south-africa", [
    ["Eastern Cape", ["Gqeberha", "East London"]],
    ["Free State", ["Bloemfontein", "Welkom"]],
    ["Gauteng", ["Johannesburg", "Pretoria"]],
    ["KwaZulu-Natal", ["Durban", "Pietermaritzburg"]],
    ["Limpopo", ["Polokwane", "Tzaneen"]],
    ["Mpumalanga", ["Mbombela", "Emalahleni"]],
    ["North West", ["Rustenburg", "Mahikeng"]],
    ["Northern Cape", ["Kimberley", "Upington"]],
    ["Western Cape", ["Cape Town", "Stellenbosch", "George"]],
  ]),
];

export function getCountryLocations(countrySlug: string) {
  return locationData.find((entry) => entry.countrySlug === countrySlug);
}

export function getLocationState(countrySlug: string, stateSlug: string) {
  return getCountryLocations(countrySlug)?.states.find((state) => state.slug === stateSlug);
}

export function getLocationCity(countrySlug: string, stateSlug: string, citySlug: string) {
  return getLocationState(countrySlug, stateSlug)?.cities.find((city) => city.slug === citySlug);
}

export const stateRouteParams = locationData.flatMap((entry) =>
  entry.states.map((state) => ({ country: entry.countrySlug, slug: state.slug })),
);

export const cityRouteParams = locationData.flatMap((entry) =>
  entry.states.flatMap((state) =>
    state.cities.map((city) => ({
      country: entry.countrySlug,
      state: state.slug,
      city: city.slug,
    })),
  ),
);
