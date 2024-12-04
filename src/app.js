const sunIcon = document.querySelector('.sun')
const moonIcon = document.querySelector('.moon')
const UserTheme = localStorage.getItem("them")
const systemTheme = window.matchMedia("[prefers-coloe-scheme: dark]").matches
const drop = document.querySelector('.drop')
let down = document.querySelector('.down')
console.log(drop);



const cardContainer = document.getElementById("root");
console.log(cardContainer);
const cardMarkUp = `
  <li class="cards  flex align-items  flex-col ">
        <img w-20 src=":IMG",  alt=":NAME">
        <p>:NAME</p>
        <ul>
            <li><p>population: :population</p></li>
            <li><p>Region: :REGION</p></li>
            <li><p>capital: :CAPITAL</p></li>
        </ul>


    </li>`;

const countries = [];
let region = []

async function getCountries() {
  const response = await fetch("/data.json");
  const data = await response.json();



  data.forEach((country) => {
    let temp = cardMarkUp.replaceAll(":NAME", country.name);
    temp = temp.replaceAll(":IMG", country.flag)
    temp = temp.replaceAll(":population", country.population);
    temp = temp.replaceAll(":REGION", country.region);
    temp = temp.replaceAll(":CAPITAL", country.capital);

    countries.push(country);
    const reg = country.region

    region.push(reg)
    cardContainer.insertAdjacentHTML("beforeend", temp);
  });
  const allRegions = [...new Set(region)]
  down.innerHTML = ''
  
  allRegions.forEach(reg =>{
console.log(reg);
const regionTemp = ` <li class=" list-none" data-region="${reg}">${reg}</li>`
down.insertAdjacentHTML('afterbegin', regionTemp)


  })
}

await console.log(region);
getCountries();
getCountries.bind(region)






const toggleIcon = function () {
  moonIcon.classList.toggle("display-none")
  sunIcon.classList.toggle("display-none")
}

const themeCheck = function () {
  if (UserTheme === "dark" || (!UserTheme && systemTheme)) {
    document.documentElement.classList.add("dark")
    moonIcon.classList.add("display-none")
    return
  }
  sunIcon.classList.add("display-none")
}

const themeSwitch = function () {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
    toggleIcon();
    return
  }

  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "light")
  toggleIcon()

}
moonIcon.addEventListener("click", themeSwitch)
sunIcon.addEventListener("click", themeSwitch)

themeCheck()

const toggleDropdown = function () {
  down.classList.toggle('display-none')
}
drop.addEventListener('click',
  toggleDropdown
)


//   const renderRegion =async function () {
//   console.log(region);
//  console.log( getCountries.bind(allRegions));
//   region.forEach(reg => {

//   })

// }
// window.addEventListener('load', renderRegion)