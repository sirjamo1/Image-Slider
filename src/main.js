
const images =  ['Samet-Kasik', 'Aleksey-Kuprikov', 'Amit-Kumar', 'Chris-Janda', 'Martin-Alargent', 'Matthis-Volquardsen',
];
let imageIndex = 0;
let pause = false;

const renderFrame = () => {
const pictureFrame = document.createElement('div');
pictureFrame.id = 'picture-frame';
const image = document.createElement('img');
image.id = 'current-image'
image.src = `src/images/${images[imageIndex]}.jpg`;
image.style.width = "500px";
const pausePopup = document.createElement('img');
pausePopup.src = "src/icons/pause-icon.png";
pausePopup.id = 'pause-popup'
pictureFrame.appendChild(pausePopup)
const playPopup = document.createElement("img");
playPopup.src = "src/icons/play-icon.png";
playPopup.id = "play-popup";
pictureFrame.appendChild(playPopup);
image.onclick = () => {
 pause = !pause;
 pause === true
     ? ((pausePopup.style.animationName = "play-pause"),
       (playPopup.style.animationName = ""),
       clearInterval(pictureAutoChange))
     : ((pausePopup.style.animationName = ""),
       (playPopup.style.animationName = "play-pause"), pictureAutoChange = setInterval(() => {
     pictureAutoChangeInterval();
 }, 5000));
}
const leftButton = document.createElement('div');
leftButton. innerHTML = '<';
leftButton.id = 'left-btn';
leftButton.classList.add('arrow-btns');
leftButton.onclick = () => {
removeCircleStyles();
changeImageIndex('left');
 changePicture(image);
 addCircleStyles();
 changePhotographersName()
 continuePlay(pausePopup, playPopup)
}
pictureFrame.appendChild(leftButton);
const rightButton = document.createElement('div');
rightButton.innerHTML = '>';
rightButton.id = "right-btn";
rightButton.classList.add("arrow-btns");
rightButton.onclick = () => {
removeCircleStyles();
changeImageIndex('right');
changePicture(image);
addCircleStyles();
changePhotographersName();
continuePlay(pausePopup, playPopup)
}
pictureFrame.appendChild(createImageCircles(image))
pictureFrame.appendChild(rightButton);
pictureFrame.appendChild(image);
pictureFrame.appendChild(addPhotographersName())
return pictureFrame
}
const createImageCircles = (image) => {
 const circleContainer = document.createElement('div');
 circleContainer.id = 'circle-container'
 for (let i = 0; i < images.length; i += 1){
  const indexCircle = document.createElement("div"); 
  indexCircle.id = `index-circle-${i}`;
  indexCircle.classList.add('index-circles')
  if(imageIndex === i) {
   indexCircle.style.cssText = `
 background-color: blue;
 width: 30px;
 height: 30px;`;
  }
  indexCircle.onclick = () => {
   removeCircleStyles()
   imageIndex = i
changePicture(image)
   addCircleStyles()
   changePhotographersName()
   continuePlay(pausePopup, playPopup)
  }
  circleContainer.appendChild(indexCircle);
 }
 return circleContainer
}
const changeImageIndex = (direction) => {
 if (direction === 'right') {
  imageIndex === 5 ? (imageIndex = 0) : (imageIndex += 1);
 } else if (direction === 'left') {
  imageIndex === 0
      ? (imageIndex = images.length - 1)
      : (imageIndex = imageIndex -= 1);
 }
}
const removeCircleStyles = () => {
 console.log(imageIndex)
 document.getElementById(`index-circle-${imageIndex}`).style.cssText = `
 background-color: white;
 width: 20px;
 height: 20px;`;
 
}
const addCircleStyles = () => {
    document.getElementById(`index-circle-${imageIndex}`).style.cssText = `
 background-color: blue;
 width: 30px;
 height: 30px;`;
};
const changePicture = (image) => {
 image.src = `src/images/${images[imageIndex]}.jpg`;
}
const addPhotographersName = () => {
const text = document.createElement('h3');
text.id = 'photographer-name'
text.innerHTML = `Photographer: ${images[imageIndex].replace("-", " ")}`;
return text
}
const changePhotographersName = () => {
  document.getElementById(
      "photographer-name"
  ).innerHTML = `Photographer: ${images[imageIndex].replace("-", " ")}`;
}
let pictureAutoChange = setInterval(() => {
 pictureAutoChangeInterval()
},5000)

const pictureAutoChangeInterval = () => {
 removeCircleStyles();
 changeImageIndex("right");
 changePicture(document.getElementById("current-image"));
 addCircleStyles();
 changePhotographersName();
}

const continuePlay = (pausePopup, playPopup) => {
 if (pause === true) {
  clearInterval(pictureAutoChange);
     (pausePopup.style.animationName = "");
         (playPopup.style.animationName = "play-pause");
         (pictureAutoChange = setInterval(() => {
             pictureAutoChangeInterval();
         }, 5000));
 }
}
document.body.appendChild(renderFrame())