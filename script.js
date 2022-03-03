let cubik = document.getElementsByClassName("cubik");
let contentdisplay = document.getElementById("ccc");
let btn1 = document.getElementById("btn1");
btn1.addEventListener("click", f);
let btn2 = document.getElementById("btn2");
btn2.addEventListener("click", f);
let count;
let arr_x = [];
let arr_o = [];
let combo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function f() {
  f.id = this.id;
  arr_x = [];
  arr_o = [];
  count = 0;
  contentdisplay.style.display = "flex";
  for (let i = 0; i < cubik.length; i++) {
    cubik[i].id = i;
    cubik[i].style.display = "block";
    cubik[i].innerHTML = "";
    cubik[i].style.backgroundColor = "";
    cubik[i].addEventListener("mouseout", def);
    cubik[i].addEventListener("mouseover", hover);
    cubik[i].addEventListener("click", click_now);
  }
}
function click_now(event) {
  if (count % 2) {
    arr_o.push(+this.id);
    if (check(arr_o) === "p2") {
      setTimeout(function () {
        alert("p2");
      }, 500);

      return "p2";
    }
    check(arr_o);
  } else {
    arr_x.push(+this.id);
    if (check(arr_x) === "p1") {
      setTimeout(function () {
        alert("p1");
      }, 500);

      return "p1";
    }
    if (arr_o.length == 4 && arr_x.length == 5) {
      removeevents(event);
      return alert("nichya");
    }
    if (f.id == "btn2") {
      let rand = random_num();
      arr_o.push(rand);
      cubik[rand].innerHTML = "О";
      cubik[rand].style.color = "black";
      cubik[rand].style.backgroundColor = "white";
      cubik[rand].removeEventListener("click", click_now);
      cubik[rand].removeEventListener("mouseover", hover);
      cubik[rand].removeEventListener("mouseout", def);
      cubik[rand].style.cursor = "default";
      if (check(arr_o) === "p1") {
        setTimeout(function () {
          alert("Comp win");
        }, 500);
      }
    }
  }
  if (f.id == "btn1") {
    count++;
  }
  removeevents("a");
}
function hover(event) {
  if (!event.target.innerHTML) {
    if (count % 2) {
      hover_o();
    } else {
      hover_x();
    }
  }
  event.target.style.backgroundColor = "white";
}
function def(event) {
  if (event.target.innerHTML) {
    event.target.innerHTML = "";
  }
  event.target.style.backgroundColor = "";
}
function hover_x() {
  event.target.innerHTML = "X";
  event.target.style.color = "#007EC9";
}
function hover_o() {
  event.target.innerHTML = "O";
  event.target.style.color = "black";
}
function removeevents(ev) {
  if (ev != undefined) {
    event.target.removeEventListener("click", click_now);
    event.target.removeEventListener("mouseover", hover);
    event.target.removeEventListener("mouseout", def);
    event.target.style.cursor = "default";
  } else {
    for (let i = 0; i < cubik.length; i++) {
      cubik[i].removeEventListener("click", click_now);
      cubik[i].removeEventListener("mouseover", hover);
      cubik[i].removeEventListener("mouseout", def);
      cubik[i].style.cursor = "default";
    }
  }
}
function check(arr) {
  for (let elem of combo) {
    let counter = 0;
    for (let i = 0; i < elem.length; i++) {
      if (arr.includes(elem[i])) {
        counter++;
        if (counter == 3) {
          for (let win_cubiks of elem) {
            cubik[win_cubiks].style.backgroundColor = "yellow";
          }
          removeevents();
          if (count % 2) {
            return "p2";
          } else {
            return "p1";
          }
        }
      }
    }
  }
}
function random_num() {
  let rand = Math.floor(Math.random() * 8);
  if (arr_o.includes(rand) || arr_x.includes(rand)) {
    return random_num();
  } else return rand;
}
