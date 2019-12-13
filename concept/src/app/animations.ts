import {
    animation,
    trigger,
    transition,
    style,
    animate,
    state
  } from "@angular/animations";

export const slideInAnimation = 
trigger("slideIn", [
    state(
      "hidden",
      style({
        transform: "translate(-50%, -240%)"
      })
    ),
    state(
      "visible",
      style({
        transform: "translate(-50%, -50%)"
      })
    ),
    transition("hidden => visible", animate("500ms ease-out")),
    transition("visible => hidden", animate("500ms ease-in"))
  ])

  export const fadeInAnimation = 
  trigger("fadeIn", [
    state(
      "hide",
      style({
        opacity: "0"
      })
    ),
    state(
      "show",
      style({
        opacity: "1"
      })
    ),
    transition("hide => show", animate("200ms")),
    transition("show => hide", animate("200ms"))
  ])