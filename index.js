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
    window.setTimeout(() => {switchData(result)}, 500)
  });})
});

document.getElementById("textSubmit").addEventListener("click", (event) => {
  fetchNewData(textInput.value);
});


const parseData = function(data) {
  let returnObject = {
    companyName: "",
    CEO: "",
    description: "",
    exchange: "",
    industry: "",
    issueType: "",
    sector: "",
    symbol: "",
    tags: "",
    website: "",
  };

  console.log(data);
  if (data.companyName) {
    returnObject.companyName = data.companyName;
  }
  if (data.CEO) {
    returnObject.CEO = data.CEO;
  }
  if (data.description) {
    returnObject.description = data.description;
  }
  if (data.exchange) {
    returnObject.exchange = data.exchange;
  }
  if (data.industry) {
    returnObject.industry = data.industry;
  }
  if (data.issueType) {
    returnObject.issueType = data.issueType;
  }
  if (data.sector) {
    returnObject.sector = data.sector;
  }
  if (data.symbol) {
    returnObject.symbol = data.symbol;
  }
  if (data.tags) {
    returnObject.tags = data.tags;
  }
  if (data.website) {
    returnObject.website = data.website;
  }
  console.log(returnObject)
  return returnObject;
}

// MENU MANIPULATION
const toggleMenu = function() {

}


// Used to switch the data currently on the screen with the loaded information
const switchData = function(result) {
  d3.select("#main").attr("class", "main-container");
  d3.select("#loader").attr("class", "loader hide");
  d3.select("#companyTitle")
  .text(result.companyName)
  .attr("class", "title-text")
}


const fetchNewData = function(input) {
  return (
    hideInfo(),
    fetch(createCompanyApi(input)).then((response) => { response.json().then((response) => {
      let result = parseData(response);
        window.setTimeout(() => {switchData(result)}, 500)
      })
    })
  )
}

const hideInfo = function () {
  d3.select("#main").attr("class", "main-container hide");
  d3.select("#loader").attr("class", "loader");
}

const createCompanyApi = function(input) {
  let api = `https://api.iextrading.com/1.0/stock/${input}/company`;
  return api;
}
