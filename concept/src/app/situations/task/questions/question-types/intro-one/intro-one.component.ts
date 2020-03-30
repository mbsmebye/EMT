import { Component, OnInit } from "@angular/core";
import { BaseQuestionComponent } from "../../base-question.component";
import { fadeInAnimation } from "src/app/animations";

@Component({
  selector: "app-intro-one",
  templateUrl: "./intro-one.component.html",
  styleUrls: ["./intro-one.component.css"],
  animations: [fadeInAnimation]
})
export class IntroOneComponent extends BaseQuestionComponent {
  buttonRow: string = "hide";

  constructor() {
    super();
  }

  ngOnInit() {
    this.videoEnded();
  }

  videoEnded() {
    this.buttonRow = "show";
  }

  async replayTask() {
    this.buttonRow = "hide";
    super.replayTask();
  }
}
