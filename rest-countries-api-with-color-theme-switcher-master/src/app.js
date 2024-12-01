const cardContainer = document.getElementById("root");
console.log(cardContainer);
const cardMarkUp = `
  <li class="cards flex align-items  flex-col ">
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

