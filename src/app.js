const sunIcon = document.querySelector('.sun')
const moonIcon = document.querySelector('.moon')
const UserTheme = localStorage.getItem("them")
const systemTheme = window.matchMedia("[prefers-coloe-scheme: dark]").matches
const drop = document.querySelector('.drop')
let down = document.querySelector('.down')
const navBtn = document.getElementById('home')
const contentBox =  document.querySelector('.modal')
const searchBox = document.getElementById('default-search')
const searchIcon = document.getElementById('searchIcon')

const cardContainer = document.getElementById("cardCont");
const cardMarkUp = `
  <li data-name = ":NAME" class="cards   transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-130  overflow-hidden duration-200    shadow-2xl rounded bg-[--appbar] flex list-none  flex-col ">
      <figure class="w-full h-1/2 flex-1">  <img class="  w-full h-full block object-cover object-center"  src=":IMG" , alt=":NAME"></figure>
         
         <div class="textbox h-1/2 px-4 py-4 flex-1">
            <p class="mb-2 text-[--text]  font-bold">:NAME</p>
            <ul>
              <li>
                <p class="text-[--text] font-medium">population: <span class="span">:population</span></p>
              </li>
              <li>
                <p class="text-[--text] font-medium">Region: <span class="span">:REGION</span></p>
              </li>
              <li>
                <p class="text-[--text] font-medium">capital: <span class="span">:CAPITAL</span></p>
              </li>
            </ul>
            </li>
            </div>
            `;


const countries = [];
let region = []

async function getCountries() {
  cardContainer.innerHTML = " "

  const response = await fetch("/data.json");
  const data = await response.json();
  console.log(data);




  data.forEach((country, i) => {
    let temp = cardMarkUp.replaceAll(":NAME", country.name);
    temp = temp.replaceAll(":IMG", country.flag)
    temp = temp.replaceAll(":population", country.population);
    temp = temp.replaceAll(":REGION", country.region);
    temp = temp.replaceAll(":CAPITAL", country.capital);

    countries.push(country);
    const reg = country.region
    region.push(reg)

    // cardContainer.insertAdjacentHTML("beforeend", temp);

    // if (reg == 'Americas') {
      cardContainer.insertAdjacentHTML("beforeend", temp);
    // }

  

    down.addEventListener("click", (e) => {
      const regionList = e.target.closest(".regionList");
      if (regionList) {
        const filterRegion = regionList.dataset.region;
        if (reg == filterRegion) {
          cardContainer.insertAdjacentHTML("afterbegin", temp);
        }

      }
    })
    // return

    



    const allRegions = [...new Set(region)]
    down.innerHTML = ''
    allRegions.forEach(reg => {
      // console.log(reg);
      const regionTemp = ` <li class="regionList list-none" data-region="${reg}">${reg}</li>`
      down.insertAdjacentHTML('afterbegin', regionTemp)

    })
  })

//  const searchFunctionality = function(evt){
//   evt.preventDefault();
//   searchBox.addEventListener('click' ,()=> console.log('come')
//   )
//  if (searchBox.value != " "|| searchBox.value <= 30) {
//   e.prevent
//   searchBox.addEventListener('input', () =>{
//     console.log(searchBox.value);
//   })
//  }
//  }
//  searchFunctionality()


  const moreModal = function () {

    cardContainer?.addEventListener('click', function (e) {
      const cad = e.target.closest(".cards")
      if (cad) {
        cardContainer.classList.add('hidden')
        document.getElementById('root').classList.add('hidden')
        document.querySelector('.modal').classList.remove('hidden')
        const countryName = cad.dataset.name
        data.filter((country) => {
          if (country.name == countryName) {
            console.log(country);
            return country
          }
        }).map((country, i) => {
          const name = country.name
          const flag = country.flag
          const population = country.population
          const region = country.region
          const subregion = country.subregion
          const capital = country.capital
          const currencies = country.currencies
          const languages = country.languages
          const domain = country.topLevelDomain
          const native = country.nativeName
          const border = country.borders

          const markup = `  <div class="content justify-center grid content-center grid-cols-2 gap-32">
      <figure><img class="w-full" src="${flag}" alt="${flag}"></figure>

      <div class="textbox capitalize text-sm text-[--text]">
        <h2 class=" text-lg mb-3 font-bold">${name}</h2>
        <ul  class= "flex  h-40 flex-col flex-wrap gap-2">
          <li>Native Name: ${native}</li>
          <li>Population :${population}</li>
          <li>region: ${region}</li>
          <li>sub region: ${subregion}</li>
          <li>capital: ${capital}</li>
          <li>languages: ${domain}</li>
          <li>top level domain: ${currencies}</li>
          <li>currencies: ${languages}</li>

        </ul>

        <p>border countries: ${border}</p>
    
      </div>
    </div>`


    contentBox.insertAdjacentHTML('beforeend', markup)

          console.log(languages,);
        })
      }
    })



  }
  moreModal()


}

getCountries();

const toggleDisplay = function () {
  if (navBtn) {
    cardContainer.classList.remove('hidden')
    document.getElementById('root').classList.remove('hidden')
  }
}
navBtn.addEventListener('click', toggleDisplay)


const toggleDropdown = function () {
  down.classList.toggle('display-none')
}
down.addEventListener("click", (e) => {
  // down.classList.toggle('hidden')
  toggleDropdown()
  cardContainer.innerHTML = " "
})
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

drop.addEventListener('click',
  toggleDropdown
)
