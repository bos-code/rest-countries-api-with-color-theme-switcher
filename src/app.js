const sunIcon = document.querySelector('.sun')
const moonIcon = document.querySelector('.moon')
const UserTheme = localStorage.getItem("them")
const systemTheme = window.matchMedia("[prefers-coloe-scheme: dark]").matches
const drop = document.querySelector('.drop')
let down = document.querySelector('.down')
console.log(drop);



const cardContainer = document.getElementById("cardCont");
console.log(cardContainer);
const cardMarkUp = `

      <li class="cards shadow-2xl rounded-sm bg-[--appbar] flex list-none  flex-col ">
<figure class="w-full h-1/2 flex-1">  <img class=" w-full h-full block object-cover object-center"  src=":IMG" , alt=":NAME"></figure>
         
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
          </div>


        </li>`;


const countries = [];
let region = []

async function getCountries() {
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
  });
  const allRegions = [...new Set(region)]
  return allRegions;
    // return
    if (reg == 'Americas') {
      cardContainer.insertAdjacentHTML("afterbegin", temp);
    }

  });
  const allRegions = [...new Set(region)]
  down.innerHTML = ''

  allRegions.forEach(reg => {
    console.log(reg);
    const regionTemp = ` <li class=" list-none" data-region="${reg}">${reg}</li>`
    down.insertAdjacentHTML('afterbegin', regionTemp)


  })

}

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