

const fileInput = document.querySelector("#upload");
const importData = document.querySelector("#pull");
const pixelatedImage = document.querySelector("#pixelatedImage0");
// storying a copy of the original image
const originalImage = pixelatedImage.cloneNode(true);
const pixelationElement = document.querySelector("#pixelationRange");
fileInput.addEventListener("change", async (e) => {
  const [file] = fileInput.files;
  
  // showing the uploaded image
  pixelatedImage.src = await fileToDataUri(file);
  // storing the original image
  originalImage.src = await fileToDataUri(file);
  
  return false;
});

importData.addEventListener("click", async (e) => {
  console.log('test')
  pixelatedImage.src = "https://fakeface.rest/face/view?minimum_age=18"
  // storing the original image
  originalImage.src = "https://fakeface.rest/face/view?minimum_age=18"
  
  return false;
});

pixelationElement.addEventListener("click", (e) => {
  let canvaslist = ["canvas1", "canvas2", "canvas3", "canvas4", "canvas5", "canvas6", "canvas7"]
  for(var i = 0; i < 7; i++){
    canvaslist[i] = document.createElement("canvas");
    pixelateImage(originalImage, (i+2)**2, canvaslist[i], i);
  }
});
document.querySelector("#download").addEventListener("click", (e) => {
  let canvaslist = ["canvas1", "canvas2", "canvas3", "canvas4", "canvas5", "canvas6", "canvas7"]
  for(var i = 0; i < 7; i++){
    canvaslist[i] = document.createElement("canvas");
    downloadImage(originalImage, (i+2)**2, canvaslist[i], i);
  }
});
function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(field);
  });
}
function pixelateImage(originalImage, pixelationFactor, x, d) {
  console.log(x)
  const canvas = x
  const context = canvas.getContext("2d");
  const originalWidth = originalImage.width;
  const originalHeight = originalImage.height;
  const canvasWidth = originalWidth;
  const canvasHeight = originalHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
  const originalImageData = context.getImageData(
    0,
    0,
    originalWidth,
    originalHeight
  ).data;
  if (pixelationFactor !== 0) {
    for (let y = 0; y < originalHeight; y += pixelationFactor) {
      for (let x = 0; x < originalWidth; x += pixelationFactor) {
        // extracting the position of the sample pixel
        const pixelIndexPosition = (x + y * originalWidth) * 4;
        // drawing a square replacing the current pixels
        context.fillStyle = `rgba(
          ${originalImageData[pixelIndexPosition]},
          ${originalImageData[pixelIndexPosition + 1]},
          ${originalImageData[pixelIndexPosition + 2]},
          ${originalImageData[pixelIndexPosition + 3]}
        )`;
        context.fillRect(x, y, pixelationFactor, pixelationFactor);
      }
    }
  }
  console.log("#pixelatedImage" + (d + 1))
  var piximage = document.querySelector("#pixelatedImage" + (d+1))
  piximage.src = canvas.toDataURL()
}
function downloadImage(originalImage, pixelationFactor, x, d){
  console.log(x)
  const canvas = x
  const context = canvas.getContext("2d");
  const originalWidth = originalImage.width;
  const originalHeight = originalImage.height;
  const canvasWidth = originalWidth;
  const canvasHeight = originalHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
  const originalImageData = context.getImageData(
    0,
    0,
    originalWidth,
    originalHeight
  ).data;
  if (pixelationFactor !== 0) {
    for (let y = 0; y < originalHeight; y += pixelationFactor) {
      for (let x = 0; x < originalWidth; x += pixelationFactor) {
        // extracting the position of the sample pixel
        const pixelIndexPosition = (x + y * originalWidth) * 4;
        // drawing a square replacing the current pixels
        context.fillStyle = `rgba(
          ${originalImageData[pixelIndexPosition]},
          ${originalImageData[pixelIndexPosition + 1]},
          ${originalImageData[pixelIndexPosition + 2]},
          ${originalImageData[pixelIndexPosition + 3]}
        )`;
        context.fillRect(x, y, pixelationFactor, pixelationFactor);
      }
    }
  }
  console.log("#pixelatedImage" + (d + 1))
  var piximage = document.querySelector("#pixelatedImage" + (d+1))
  piximage.src = canvas.toDataURL()
  var image = canvas.toDataURL("image/png");
  var aDownloadLink = document.createElement('a');
  aDownloadLink.download = 'canvas_image.png';
  aDownloadLink.href = image;
  aDownloadLink.click();
}