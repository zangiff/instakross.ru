"use strict";

//========================Timer Functionality===================================
const counterData           = document.querySelectorAll(".counter-data"),
      loadDate              = new Date(),
      videos                = document.querySelectorAll(".video"),
      aboutVideo            = document.querySelectorAll(".video__content"),
      feedbackVideo         = document.querySelectorAll(".video__feedback");
let   targetDate            = new Date(),
      resultString          = "",
      dateNow;

if(loadDate.getUTCHours() >= 9) {
  targetDate.setUTCDate(loadDate.getUTCDate() + 1)
}
targetDate.setUTCHours(9, 0, 0, 0);

setTimeout(() => {
  document.querySelector(".program__counter").classList.remove("invisible");
  document.querySelector(".study__counter").classList.remove("invisible");
}, 1000);

let counter = setInterval(() => {
  dateNow = new Date;
  resultString = parseMillisecondsIntoReadableTime(targetDate - dateNow);
  if(targetDate - dateNow < 1000) {
    counterData.forEach(item => {
      item.textContent = "00:00:00";
    });
  } else {
    counterData.forEach(item => {
      item.textContent = resultString;
    });
  }
}, 1000);

if(targetDate - dateNow <= 0) {
  clearInterval(counter);
}

function parseMillisecondsIntoReadableTime(milliseconds){
  //Get hours from milliseconds
  let hours = milliseconds/(1000*60*60);
  let absoluteHours = Math.floor(hours);
  let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  let minutes = (hours - absoluteHours) * 60;
  let absoluteMinutes = Math.floor(minutes);
  let m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  let seconds = (minutes - absoluteMinutes) * 60;
  let absoluteSeconds = Math.floor(seconds);
  let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  return h + ':' + m + ':' + s;
}

document.addEventListener("DOMContentLoaded", function () {
  //============================Video Controls Heading==========================
  const sliderVideos = document.querySelectorAll(".feedback__slider__videowrapper");
  let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  function checkInstagram () {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf('Instagram') > -1) || (ua.indexOf('FBAV') > -1) || (ua.indexOf('FBAN') > -1);
  }
  let isInstagram = checkInstagram();
  if(isSafari || isInstagram) {
    sliderVideos.forEach(item => {
      item.children[0].style.display = "none";
    });
  } else {
    sliderVideos.forEach(item => {
      item.children[1].controls = false;
      item.addEventListener("dblclick", evt => {
        let target = evt.target.closest("div");
        if((target.children[1].paused || target.children[1].ended) && target.classList.contains("slick-current")) {
          target.children[0].style.opacity = "0";
          target.children[1].play();
          target.children[1].controls = true;
        } else {
          target.children[1].controls = false;
          target.children[1].pause();
          target.children[0].style.opacity = "0";
        }
      });
    });
  }

  aboutVideo.forEach(item => {
    item.controls = false;
    if (document.documentMode || /Edge/.test(window.navigator.userAgent) || /Trident/.test(window.navigator.userAgent) || (/MSIE/i).test(window.navigator.usertAgent)) {
      item.poster = "./img/poster.jpg";
    }
    item.addEventListener("dblclick", evt => {
      if(evt.target.closest("video").classList.contains("paused")) {
        evt.target.play();
        evt.target.controls = true;
        evt.target.closest("video").classList.remove("paused");
      } else {
        evt.target.controls = false;
        evt.target.pause();
        evt.target.closest("video").classList.add("paused");
      }
    });
  });

//=============================Modal Windows Functionality======================
//============================1. Policy Window==================================
  document.querySelector('[href="#policyModal"]').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).classList.add('show');
  });

  document.getElementById('policyModal').addEventListener('click', function (e) {
    if (!e.target.classList.contains('open')) {
      return;
    }
    // e.preventDefault();
    this.classList.remove('show');
  });

  var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
  document.querySelector('[href="#policyModal"]').addEventListener('click', function () {
    document.body.style.overflowY = 'hidden';
    document.querySelector('#policyModal').style.marginLeft = scrollbar;
  });
  document.querySelector('[href="#open"]').addEventListener('click', function () {
    document.body.style.overflowY = 'visible';
    document.querySelector('#policyModal').style.marginLeft = '0px';
  });
  //=====================Widget Window============================================
  document.querySelectorAll('[href="#widgetModal"]').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      setTimeout(() => {
        document.querySelector(this.getAttribute('href')).classList.add('show');
      }, 500);
    });
  });

  document.getElementById('widgetModal').addEventListener('click', function (e) {
    if (!e.target.classList.contains('open')) {
      return;
    }
    // e.preventDefault();
    this.classList.remove('show');
  });

  var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
  document.querySelector('[href="#policyModal"]').addEventListener('click', function () {
    document.body.style.overflowY = 'hidden';
    document.querySelector('#policyModal').style.marginLeft = scrollbar;
  });
  document.querySelector('[href="#open"]').addEventListener('click', function () {
    document.body.style.overflowY = 'visible';
    document.querySelector('#policyModal').style.marginLeft = '0px';
  });
});
//================================END===========================================
