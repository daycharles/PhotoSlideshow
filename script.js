const slideshow = $("#slideshow");
var imageFolder = "https://daycharles.github.io/PhotoSlideshow/images";
// var imageFolder = "images/";
let imageIndex = 0;
let images = [];

function loadImages() {
  $.ajax({
    url: imageFolder,
    success: function(data) {
      $(data).find("a:contains('.jpg'), a:contains('.jpeg'), a:contains('.png'), a:contains('.gif')").each(function() {
        const filename = $(this).attr("href");
        images.push(filename.substring(8));
      });
      startSlideshow();
    }
  });
}

function getNextImage() {
  if (imageIndex >= images.length) {
    imageIndex = 0;
  }
  
  const image = images[imageIndex];
  const imageUrl = imageFolder + image;
  
  const imgElement = $("<img>").attr("src", imageUrl).addClass("next");
  
  return imgElement;
}

function startSlideshow() {
  const fullscreenButton = $("#fullscreen-button");
  fullscreenButton.click(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  });

  setInterval(() => {
    const currentImage = slideshow.find("img.active").eq(0);
    const nextImage = getNextImage();
    
    slideshow.append(nextImage);
    
    setTimeout(() => {
      currentImage.removeClass("active");
      nextImage.addClass("active");
    }, 1000);
    
    imageIndex++;
  }, 5000);
}

loadImages();

$(document).on("fullscreenchange", function() {
  if (document.fullscreenElement) {
    $("#fullscreen-button").hide();
  } else {
    $("#fullscreen-button").show();
  }
});
