const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

<!--
Data Object
--> 

const images = [
{ filename: "pic1.jpg", alt: "Closeup of a human eye"},
{ filename: "pic2.jpg", alt: "Rock that looks like a wave"},
{ filename: "pic3.jpg", alt: "Purple and white pansies"},
{ filename: "pic4.jpg", alt: "Section of wall from a pharaoh's tomb"},
{ filename: "pic5.jpg", alt: "Large moth on a leaf" },
];


<!--
URL for the images
--> 

const baseURL =
"https://mdn.github.io/shared-assets/images/examples/image/examples/learn/gallery/";


<!--
For Of loop
--> 

for (const image of images) {

const newImage = document.createElement("img");
newImage.src = `${baseURL}${image.filename}`;
newImage.alt = image.alt;

newImage.tabIndex = "0";

<!--
append the image as the child of the thumbBar
--> 

thumbBar.appendChild(newImage);

<!--
Updates the display of the image to fullscreen when an image is clicked
-->

newImage.addEventListener("click", updateDisplayedImage);


<!--
If you hit enter the image will display
-->

newImage.addEventListener("keydown", (e) =>{
if (e.code === "Enter" {
updateDisplayedImage(e);
}
});
}


<!--
creating the update displayed image function
-->

function updateDisplayedImage(e) {
displayedImage.src = e.target.src;
displayedImage.alt = e.target.alt;
}


<!--
creating the darken button function
-->

btn.addEventListener("click", () => {
if (btn.classList.contains("dark")) {
btn.textContent = "Lighten";
overlay.style.backgroundColor = "rgb(0 0 0 / 0)";
}

