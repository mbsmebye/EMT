import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"]
})
export class TaskComponent {
  showQuestions: Boolean = false;
  @Output() messageEvent = new EventEmitter<string>();

  questions: string[] = ["question 1:", "question 2:"];

  showTask() {
    this.showQuestions = true;
  }

  completeTask() {
    this.showQuestions = false;
    this.messageEvent.emit("lol");
  }
}
