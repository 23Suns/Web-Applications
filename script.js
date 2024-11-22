// script.js

// DOM Manipulation
const header = document.querySelector("header");
header.style.backgroundColor = "lightblue";

const paragraphs = document.querySelectorAll("p");
paragraphs.forEach((p) => {
	p.style.color = "blue";
});

// // Event Listener
// const button = document.getElementById("myButton");
// button.addEventListener("click", () => {
// 	alert("Button clicked!");
// });

// // Fetching Data (Example)
// fetch("https://api.example.com/data")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		console.log(data);
// 		// Use the fetched data to update the DOM or trigger other actions
// 	})
// 	.catch((error) => {
// 		console.error("Error fetching data:", error);
// 	});

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches(".dropbtn")) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
};
