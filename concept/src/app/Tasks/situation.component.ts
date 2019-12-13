import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "situation",
  templateUrl: "./situation.component.html",
  styleUrls: ["./situation.component.css"]
})
export class SituationComponent {
  @Output() messageEvent = new EventEmitter<string>();
  @ViewChild("taskVideo", { static: true }) taskVideo: ElementRef;
  videoHasEnded: boolean = false;
  taskTwo: number = 2;

  questions: string[] = ["question 1:", "question 2:"];

  videoEnded() {
    this.videoHasEnded = true;
  }

  completeTask() {
    this.messageEvent.emit("lol");
  }

  onReplayClicked() {
    this.taskVideo.nativeElement.currentTime = 0;
    this.taskVideo.nativeElement.play();
    this.videoHasEnded = false;
  }
}
