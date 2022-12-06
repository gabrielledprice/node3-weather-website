//console.log("Clientside javascript is loaded");

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then(data =>{
//         console.log(data)
//     })
// })

var weatherForm = document.getElementById("search");
var searchElement = document.querySelector("input");
var messageOne = document.getElementById("message-1");
var messageTwo = document.getElementById("message-2");

messageOne.textContent = "Loading...";
messageTwo.textContent = "";
if (weatherForm) {
  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchElement.value;
    fetch("http://localhost:3000/weather?address=" + location).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            return (messageOne.textContent = data.error);
          }
          const { temperature, Description, rain } = data.forecast;
          console.log(data);
          messageOne.textContent = data.address;
          // messageTwo.textContent = JSON.stringify(data.forecast);
          messageTwo.textContent = `The temperature is ${temperature}, and it is ${Description[0]} outside. There is a ${rain} percent chance of rain.`;
        });
      }
    );
  });
}
