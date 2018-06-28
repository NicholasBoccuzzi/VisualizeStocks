// const api = "https://api.iextrading.com/1.0/stock/?symbols=fb"
let api = "https://api.iextrading.com/1.0/stock/aapl/company";
let textInput = document.getElementById("textInput");
let menuContainer = document.getElementById("menuContainer");

document.getElementsByName("toggleMenuButton").forEach((element) => {element.addEventListener("click", (event) => {
  if (menuContainer.className.includes("start-menu")) {
    d3.select("#menuContainer")
    .attr("class", "default-menu open-menu")
  } else if (menuContainer.className.includes("open-menu")) {
    d3.select("#menuContainer")
    .attr("class", "default-menu close-menu")
  } else if (menuContainer.className.includes("close-menu")) {
    d3.select("#menuContainer")
    .attr("class", "default-menu open-menu")
  }})
});


document.addEventListener("DOMContentLoaded", (event) => {
  return fetch(api).then((response) => { response.json().then((response) => {
    let result = parseData(response);
    window.setTimeout(() => {switchData(result)}, 2000)
  });})
});

document.getElementById("textSubmit").addEventListener("click", (event) => {
  fetchNewData(textInput.value);
});


const parseData = function(data) {
  let returnObject = {};

  if (data.companyName) {
    returnObject.companyName = data.companyName;
  } else {
    returnObject.companyName = "Missing";
  }
  console.log(returnObject)
  return returnObject;
}

// MENU MANIPULATION
const toggleMenu = function() {

}


// Used to switch the data currently on the screen with the loaded information
const switchData = function(result) {
  d3.select("#companyTitle")
  .text(result.companyName)
  .attr("class", "title-text")
}


const fetchNewData = function(input) {
  return fetch(createCompanyApi(input)).then((response) => { response.json().then((response) => {
    let result = parseData(response);
      window.setTimeout(() => {switchData(result)}, 2000)
    })
  })
}

const createCompanyApi = function(input) {
  let api = `https://api.iextrading.com/1.0/stock/${input}/company`;
  return api;
}
