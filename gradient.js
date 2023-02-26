let background_h = parseFloat(getCookie("color"));

if (isNaN(background_h)) {
  background_h = 170;
}

const interval = setInterval(function () {
  background_h += 1;
  //document.body.style.backgroundColor = "hsl("+background_h+", 50%, 50%)";

  document.body.style.backgroundImage =
    "linear-gradient(to right, hsl(" +
    background_h +
    ", 50%, 50%) , hsl(" +
    (background_h - 200) +
    ", 50%, 50%))";
  textbg();
  //console.log("linear-gradient(to right, hsl("+background_h+", 50%, 50%) , hsl("+(background_h-200)+", 50%, 50%))");

  document.cookie = "color=" + background_h+";path=/";
}, 100);

function textbg() {
  var elems = document.getElementsByClassName("gradient-text");
  for (i = 0; i < elems.length; i++) {
    elems[i].style.color =
      "hsl(" +
      (background_h -
        (elems[i].getBoundingClientRect().right / screen.width) * 200) +
      ", 25%, 25%)";
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
