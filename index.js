// const api = "https://api.iextrading.com/1.0/stock/?symbols=fb"
let api = "https://api.iextrading.com/1.0/stock/aapl/company";

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


// Used to switch the data currently on the screen with the loaded information
const switchData = function(result) {
  d3.select("#companyTitle")
  .text(result.companyName)
  .attr("class", "title-text")
}


document.addEventListener("DOMContentLoaded", (event) => {
  return fetch(api).then((response) => { response.json().then((response) => {
    let result = parseData(response);
    window.setTimeout(() => {switchData(result)}, 2000)
  });})
});


let textInput = document.getElementById("textInput");
document.getElementById("textSubmit").addEventListener("click", (event) => {
  fetchNewData(textInput.value);
})

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
