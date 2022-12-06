//console.log("Clientside javascript is loaded");

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then(data =>{
//         console.log(data)
//     })
// })




var weatherForm = document.getElementById("search");
var searchElement = document.querySelector("input");

if (weatherForm) {
  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchElement.value;
    fetch("http://localhost:3000/weather?address=" + location).then(
        (response) => {
          response.json().then((data) => {
            if (data.error) {
              return console.log(data.error);
            }
            console.log(data.address, data.forecast);
          });
        }
      );
    };
  );
}
