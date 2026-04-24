let step = 0;
let time = 10;
let timer;

function start() {
  document.getElementById("bgVideo").play().catch(()=>{});
  show("question");
  loadQ();
}

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function loadQ() {

  if (step === 2) {
    fakeEnd();
    return;
  }

  let qText = [
    "How much do you love bubu? ❤️",
    "Do you love me more than them 🍒"
  ];

  document.getElementById("qText").innerText = qText[step];

  let opts = document.getElementById("opts");
  opts.innerHTML = "";

  document.getElementById("time").innerText = "";

  /* Q1 slider */
  if (step === 0) {
    opts.innerHTML = `
      <input type="range" id="loveRange" min="0" max="90" value="50">
      <p id="loveValue">50%</p>
      <button onclick="submitLove()">Submit ❤️</button>
    `;

    setTimeout(()=>{
      let r = document.getElementById("loveRange");
      let v = document.getElementById("loveValue");
      r.oninput = () => v.innerText = r.value + "%";
    },100);
  }

  /* Q2 */
  if (step === 1) {
    document.getElementById("time").innerText = "10";
    startTimer();

    ["Yes","Ofc not","Maybe","Idk"].forEach(o=>{
      let b=document.createElement("button");
      b.innerText=o;
      b.onclick=()=>twist(b);
      opts.appendChild(b);
    });
  }

  progress();
}

function progress() {
  let p = ((step+1)/2)*90;
  document.getElementById("progress").style.width = p+"%";
}

function submitLove() {
  pop("So you don’t love bubu 100%? 💔");

  setTimeout(()=>{
    document.getElementById("popup").classList.add("hide");

    pop("But bubu loves you 101% 😔❤️");

    setTimeout(()=>{
      document.getElementById("popup").classList.add("hide");
      step++;
      loadQ();
    },2500);

  },2500);
}

function startTimer() {
  time = 10;

  clearInterval(timer);
  timer = setInterval(()=>{
    time--;
    document.getElementById("time").innerText = time;

    if(time<=0){
      clearInterval(timer);
      pop("Time’s up 😔");
    }
  },1000);
}

function twist(btn) {
  clearInterval(timer);

  document.querySelectorAll("#opts button").forEach(b=>b.innerText="Yes");
  btn.innerText="Ofc not";

  step++;
  setTimeout(loadQ,1000);
}

function pop(t) {
  document.getElementById("popupText").innerText = t;
  document.getElementById("popup").classList.remove("hide");
}

function closePop() {
  document.getElementById("popup").classList.add("hide");
}

function fakeEnd() {
  pop("Your love for bubu is never full 😔 Goodbye...");

  setTimeout(()=>{
    document.getElementById("popup").classList.add("hide");
    show("reveal");
  },3000);
}

function showFinal() {
  show("final");
}
