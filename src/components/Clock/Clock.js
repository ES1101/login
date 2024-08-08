import React, { Component } from "react";
import "./Clock.css";

function Clock() {
  const secondHand = document.querySelector(".sec-hand");
  const minHand = document.querySelector(".min-hand");
  const hourHand = document.querySelector(".hour-hand");

  setDate = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 90;
    secondHand.computedStyleMap.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = (mins / 60) * 360 + 90;
    minHand.computedStyleMap.transform = `rotate(${minsDegrees}deg)`;
  };
  setInterval(setDate, 1000);
}

// https://geonlee.tistory.com/50 보고 작성중인데 잘 모르겠음
