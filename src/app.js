const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");
const UserTheme = localStorage.getItem("them");
const systemTheme = window.matchMedia("[prefers-coloe-scheme: dark]").matches;
const drop = document.querySelector(".drop");
let down = document.querySelector(".down");
const navBtn = document.getElementById("home");
const contentBox = document.querySelector(".modal");
const searchBox = document.getElementById("default-search");
const searchIcon = document.getElementById("searchIcon");
const contentContainer = document.querySelector(".contentBox");

const cardContainer = document.getElementById("cardCont");
const cardMarkUp = `
  <li
  data-name=":NAME"
  class="cards transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-130 overflow-hidden duratioy-200 shadow-2xl rounded bg-[--appbar] flex list-none flex-col"
>
  <figure class="w-full h-1/2 flex-1">
    <img
      class="w-full h-full block object-cover object-center"
      src=":IMG"
      ,
      alt=":NAME"
      loading="lazy"
    />
  </figure>

  <div class="textbox h-1/2 px-4 py-4 flex-1">
    <p class="mb-2 text-[--text] font-bold">:NAME</p>
    <ul>
      <li>
        <p class="text-[--text] font-medium">
          population: <span class="span text-gray-400">:population</span>
        </p>
      </li>
      <li>
        <p class="text-[--text] font-medium">
          Region: <span class="span text-gray-400">:REGION</span>
        </p>
      </li>
      <li>
        <p class="text-[--text] font-medium">
          capital: <span class="span text-gray-400">:CAPITAL</span>
        </p>
      </li>
    </ul>
  </div>
</li>
`;

let countries = [];
let filteredCountries = null;
const regions = new Set([]);

async function getCountries() {
  const response = await fetch("/data.json");
  const data = await response.json();

  // Clear Regions
  regions.clear();

  countries = data;

  // Render Countries
  renderCountries();
}

function renderCountries() {
  cardContainer.innerHTML = "";

  (filteredCountries || countries).forEach((country) => {
    let temp = cardMarkUp.replaceAll(":NAME", country.name);
    temp = temp.replaceAll(":IMG", country.flag);
    temp = temp.replaceAll(":population", country.population);
    temp = temp.replaceAll(":REGION", country.region);
    temp = temp.replaceAll(":CAPITAL", country.capital);

    regions.add(country.region);

    cardContainer.insertAdjacentHTML("beforeend", temp);
  });

  // Render Region
  renderRegions();
}

function renderRegions() {
  down.innerHTML = "";

  regions.forEach(function (reg) {
    const regionTemp = ` <li class="regionList list-none" data-region="${reg}">${reg}</li>`;

    down.insertAdjacentHTML("afterbegin", regionTemp);
  });
}

function searchFunctionality(event) {
  const searchQuery = event.target.value.trim();

  if (!searchQuery || searchQuery.length >= 30) {
    filteredCountries = null;
    renderCountries();
    return;
  }

  const filtered = countries.filter((country) => {
    const cName = country.name.toLowerCase();
    const value = searchQuery.toLowerCase();

    return cName.includes(value) || value === cName;
  });

  filteredCountries = filtered;

  renderCountries();
}

function openCountriesModal(event) {
  const cad = event.target.closest(".cards");

  if (!cad) return;

  cardContainer.classList.add("hidden");
  document.getElementById("root").classList.add("hidden");
  document.querySelector(".modal").classList.remove("hidden");

  const countryName = cad.dataset.name;

  const country = countries.find((country) => country.name == countryName);

  const name = country.name;
  const flag = country.flag;
  const population = country.population;
  const region = country.region;
  const subregion = country.subregion;
  const capital = country.capital;
  const currencies = country.currencies
    ?.map((currency) => currency.name)
    .join(", ");

  const languages = country.languages
    ?.map((language) => language.name)
    .join(", ");
  const domain = country.topLevelDomain;
  const native = country.nativeName;
  const border = country?.borders || [];

  border.map((coun) => {
    countries.filter((cub) => {
      if (cub.alpha3Code == coun) {
        // RENDER BORDER COUNTRIES
      }
    });
  });

  const markup = `
   <div class="content justify-center flex items-center gap-32">
     <figure class=" flex-1"><img class="w-full" src="${flag}" alt="${flag}"></figure>
     <div class="textbox  flex-1 capitalize  text-base font-medium text-[--text]">
       <h2 class=" text-lg mb-3 font-bold">${name}</h2>
       <ul class="flex  h-40 flex-col flex-wrap gap-2">
         <li class=" text-gray-400"><span class=" text-gray-200">Native Name:</span> ${native}</li>
         <li class=" text-gray-400"><span class=" text-gray-200">Population :</span>${population}</li>
         <li class=" text-gray-400"><span class=" text-gray-200">region: </span>${region}</li>
         <li class=" text-gray-400"><span class=" text-gray-200">sub region:</span> ${subregion}</li>
         <li class=" text-gray-400"><span class=" text-gray-200">capital:</span> ${capital}</li>
         <li class=" text-gray-400"><span class=" text-gray-200">languages:</span> ${languages}</li>
         <li class=" text-gray-400"><span class=" text-gray-200">top level domain:</span> ${domain}</li>
         <li class=" text-gray-400"><span class=" text-gray-200">currencies</span>: ${currencies}</li>
       </ul>
       <p class=" mt-10 text-gray-400 flex gap-2 flex-wrap whitespace-nowrap"><span class=" text-gray-200">border countries:</span></p>
     </div>
   </div>
  `;

  contentContainer.insertAdjacentHTML("beforeend", markup);
}

const toggleDisplay = function () {
  if (navBtn) {
    cardContainer.classList.remove("hidden");
    document.getElementById("root").classList.remove("hidden");
  }
};

const toggleDropdown = function () {
  down.classList.toggle("display-none");
};

down.addEventListener("click", (e) => {
  // down.classList.toggle('hidden')
  toggleDropdown();
  cardContainer.innerHTML = " ";
});

const toggleIcon = function () {
  moonIcon.classList.toggle("display-none");
  sunIcon.classList.toggle("display-none");
};

const themeCheck = function () {
  if (UserTheme === "dark" || (!UserTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    moonIcon.classList.add("display-none");
    return;
  }
  sunIcon.classList.add("display-none");
};

const themeSwitch = function () {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    toggleIcon();
    return;
  }

  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "light");
  toggleIcon();
};

function main() {
  getCountries();
  themeCheck();
}

// WHY TWO LISTINERS???
navBtn.addEventListener("click", toggleDisplay);
navBtn.addEventListener("click", () => {
  contentContainer.innerHTML = " ";
});

drop.addEventListener("click", toggleDropdown);
moonIcon.addEventListener("click", themeSwitch);
sunIcon.addEventListener("click", themeSwitch);
searchBox.addEventListener("input", searchFunctionality);
cardContainer.addEventListener("click", openCountriesModal);
// down.addEventListener("click", filterForRegion);

function filterForRegion() {
  down.addEventListener("click", (e) => {
    const reg = e.target.closest(".regionList");

    if (!reg) {
      filteredCountries = null;
      return;
    }
    const regID = reg.dataset.region;
    const filtered = countries.filter((country) => {
      const region = country.region;
      return region === regID;
    });
    filteredCountries = filtered;
    renderCountries();
  });
}
filterForRegion();

main();
