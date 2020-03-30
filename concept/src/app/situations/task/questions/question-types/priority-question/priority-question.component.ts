import { Component, OnInit } from "@angular/core";
import { BaseQuestionComponent } from "../../base-question.component";
import { slideInAnimation, fadeInAnimation } from "src/app/animations";

@Component({
  selector: "app-priority-question",
  templateUrl: "./priority-question.component.html",
  styleUrls: ["./priority-question.component.css"],
  animations: [slideInAnimation, fadeInAnimation]
})
export class PriorityQuestionComponent extends BaseQuestionComponent {
  constructor() {
    super();
  }
}
