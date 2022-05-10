let words = document.querySelectorAll("span");

let getXPercentage = x => {
  return x / window.innerWidth;
};

let updateFontWeight = x => {
  let xPercentage = getXPercentage(x);
  let fontWeight = 800 * xPercentage + 100;
  words.forEach((letter, i) => {
    setTimeout(function() {
      letter.style.fontVariationSettings = "'wght' " + fontWeight;
    }, 120 * (i * 0.6));
  });
};

document.body.addEventListener("mousemove", e => {
  let X = e.clientX;
  updateFontWeight(X);
});

$(function () {
  $(".btn").click(function () {
    $(".btn").toggleClass("active");
        $(".play").toggleClass("active");
    $(".small-box").toggleClass("active");
    if($(".small-box").hasClass("active")) {
      $(".small-box").removeClass("pauseToPlay");
    } else {
      $(".small-box").addClass("pauseToPlay");
    }
  });
});
