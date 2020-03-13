import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: any) {}
  elem: any;

  fullscreen: Boolean = false;

  ngOnInit() {
    this.elem = document.documentElement;
  }

  launchFullScreen() {
    let element = this.elem;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
    this.fullscreen = true;
  }
}
