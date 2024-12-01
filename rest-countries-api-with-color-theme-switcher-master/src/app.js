const sunIcon  = document.querySelector('.sun')
const moonIcon  = document.querySelector('.moon')
const UserTheme = localStorage.getItem("them")
const systemTheme  = window.matchMedia("[prefers-coloe-scheme: dark]").matches

const cardContainer = document.getElementById("root");
console.log(cardContainer);
const cardMarkUp = `
  <li class="cards  flex align-items  flex-col ">
        <img w-20 src=":IMG",  alt=":NAME">
        <p>:NAME</p>
        <ul>
            <li><p>:population</p></li>
            <li><p>:REGION</p></li>
            <li><p>:CAPITAL</p></li>
        </ul>


    </li>`;

const countries = [];

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
    
    // cardContainer.insertAdjacentHTML("beforeend", temp);
});
}


getCountries();


const toggleIcon = function(){
  moonIcon.classList.toggle("display-none")
  sunIcon.classList.toggle("display-none")
}

const themeCheck = function() {
  if (UserTheme === "dark" || (!UserTheme && systemTheme)) {
    document.documentElement.classList.add("dark")
    moonIcon.classList.add("display-none")
    return
  }
  sunIcon.classList.add("display-none")
} 

const themeSwitch = function(){
  if (document.documentElement.classList.contains("dark")){
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