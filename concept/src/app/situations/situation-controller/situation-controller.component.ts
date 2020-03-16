import { Component, OnInit } from "@angular/core";
import { SituationList } from "./situation-list";

@Component({
  selector: "situation-controller",
  templateUrl: "./situation-controller.component.html",
  styleUrls: ["./situation-controller.component.css"]
})
export class SituationControllerComponent implements OnInit {
  firstElement: {
    task: number;
    situation: number;
  };

  secondElement: {
    task: number;
    situation: number;
  };

  currentDisplayedElement = "first";

  playFirstElementVideo = true;
  playSecondElementVideo = false;

  situationList: SituationList;

  constructor() {
    this.situationList = new SituationList();
  }

  ngOnInit() {
    this.setUpSituationElements();
  }

  setUpSituationElements() {
    this.firstElement = this.situationList.getNextTask();
    this.secondElement = this.situationList.getNextTask();
    //Object.assign(this.firstElement, first);
    //Object.assign(this.secondElement, this.situationList.getNextTask());
  }

  goToNextTask() {
    console.log("event");
    this.playSecondElementVideo = !this.playSecondElementVideo;
    this.playFirstElementVideo = !this.playFirstElementVideo;
    let nextTask = this.situationList.getNextTask();
    if (this.firstElement.task == -1 || this.secondElement.task == -1) {
      console.log("All tasks done.");
    } else {
      if (this.currentDisplayedElement == "first") {
        console.log("fffff");
        this.currentDisplayedElement = "second";
        this.firstElement = nextTask;
      } else if (this.currentDisplayedElement == "second") {
        console.log("ssssssssssss");
        this.currentDisplayedElement = "first";
        this.secondElement = nextTask;
      }
    }
  }
}
