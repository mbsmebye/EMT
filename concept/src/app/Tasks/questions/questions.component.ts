import { Component, OnInit, Output, Input, SimpleChange } from "@angular/core";
import { Question, IAlternative } from "./question";
import { EventEmitter } from "@angular/core";
import {
  animation,
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";
import { slideInAnimation, fadeInAnimation } from "src/app/animations";
import { QuestionService } from "./question.service";

@Component({
  selector: "task-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"],
  animations: [slideInAnimation, fadeInAnimation],
  providers: [QuestionService]
})
export class QuestionsComponent implements OnInit {
  state: string = "hidden";
  @Input() task: number;
  @Input() scenario: number;
  @Input() showQuestion: boolean = false;
  selectedCheckboxes: number[] = [];
  sound = new Audio();
  soundDuration: number;
  radioButtonsMarked: number[] = [];
  showSoundButtons = new Object();
  audioList = new Object();
  @Input() useTypewriter: boolean = true;
  typewriterFinished: boolean = false;
  alternativesToBeSelected: number;
  buttonRow: string = "show";
  errorMessage: string;
  dataIsLoaded: boolean = false;
  @Output() replayClicked: EventEmitter<null> = new EventEmitter();

  question: Question;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.getQuestion(this.scenario, this.task).subscribe({
      next: data => {
        this.question = new Question(data);
        this.setUp();
        this.dataIsLoaded = true;
      },
      error: err => (this.errorMessage = err)
    });
  }

  async slideInQuestion() {
    this.state = "visible";
    if (this.useTypewriter) {
      await this.sleep(1000);
      this.typewriteQuestion();
    }
  }

  setUp() {
    this.setUpSoundButtonsAndAudio();
    this.setUpRadiobuttonsAndCheckboxes();
    if (this.useTypewriter) {
      this.question.setUpTypewriting();
      this.buttonRow = "hide"
    }
  }

  setUpRadiobuttonsAndCheckboxes() {
    if (this.question.taskType == "priorityTask")
      this.question.alternatives.forEach(alt => {
        this.radioButtonsMarked.push(0);
      });
    else {
      this.alternativesToBeSelected = this.question.alternativesToBeSelected;
    }
  }

  setUpSoundButtonsAndAudio() {
    this.question.alternatives.forEach(element => {
      this.showSoundButtons[element.alternativeId] = "hide";
      let audio = document.createElement(`audio`);
      audio.src = `/assets/sounds/Task${this.task}/${element.alternativeId}.mp3`;
      audio.setAttribute(
        "id",
        `audio_task${this.task}_id${element.alternativeId}`
      );
      this.audioList[element.alternativeId] = audio;
    });
  }

  resetVisibleComponents() {
    this.question.alternatives.forEach(element => {
      this.showSoundButtons[element.alternativeId] = "hide";
    });
    this.resetTextForTypewriting();
  }

  resetTextForTypewriting() {
    this.question.alternatives.forEach(alternative => {
      alternative.alternativeText = alternative.typewriterText;
      alternative.typewriterText = "";
    });
  }

  displayQuestionBox() {
    console.log("display");
    this.toggleSlide();
    this.typewriteQuestion();
  }

  playSound(id: number) {
    this.sound = this.audioList[id];
    this.sound.play();
  }

  replayTask() {
    this.toggleSlide();
    this.replayClicked.emit();
    this.sleep(1000);
    this.resetVisibleComponents();
  }

  toggleSlide() {
    this.state = this.state === "hidden" ? "visible" : "hidden";
  }

  checkboxClicked(id: number) {
    console.log(this.alternativesToBeSelected);
    if (this.selectedCheckboxes.includes(id)) {
      this.selectedCheckboxes.splice(this.selectedCheckboxes.indexOf(id), 1);
    } else {
      if (this.selectedCheckboxes.length === this.alternativesToBeSelected) {
        let firstElement = this.selectedCheckboxes[0];
        this.selectedCheckboxes.shift();
        this.toggleCheckbox(firstElement);
        this.selectedCheckboxes.push(id);
      } else {
        this.selectedCheckboxes.push(id);
      }
    }
    console.log(this.selectedCheckboxes);
  }

  toggleCheckbox(id: number): void {
    var inputElement = <HTMLInputElement>document.getElementById("alt" + id);
    inputElement.checked = !inputElement.checked;
    console.log(document.getElementById("alt" + id));
  }

  alternativeIsChecked(id: number): Boolean {
    if (this.selectedCheckboxes.includes(id)) {
      return true;
    }
    return false;
  }

  radiobuttonClicked(alternativeId: number, radioButtonNumber: number) {
    if (this.radioButtonsMarked[alternativeId - 1] === radioButtonNumber) {
      this.radioButtonsMarked[alternativeId - 1] = 0;
      console.log(1);
    } else {
      console.log(2);
      this.radioButtonsMarked[alternativeId - 1] = radioButtonNumber;
    }
    console.log(this.radioButtonsMarked);
  }

  isChecked(alternativeId: number, radioButtonNumber: number) {
    return this.radioButtonsMarked[alternativeId - 1] === radioButtonNumber;
  }

  async typewriteQuestion() {
    let len = this.question.questionHeader.length;
    for (let i = 0; i < len; i++) {
      this.question.typewriterQuestionHeader += this.question.questionHeader.charAt(
        0
      );
      this.question.questionHeader = this.question.questionHeader.substr(1);
      await this.sleep(50);
    }
    this.typeWriteAlternatives(this.question.alternatives, 0);
  }

  async typeWriteAlternatives(alternatives: IAlternative[], id: number) {
    let altToBeTyped = alternatives[id];
    id++;

    document
      .getElementsByTagName("body")[0]
      .appendChild(this.audioList[altToBeTyped.alternativeId]);
    let audio = <HTMLAudioElement>(
      document.getElementById(
        `audio_task${this.task}_id${altToBeTyped.alternativeId}`
      )
    );

    let delayPerLetter = this.calculateDelayForTypewriter(
      audio.duration,
      altToBeTyped.alternativeText.length
    );

    await this.sleep(700);
    this.playSound(altToBeTyped.alternativeId);
    await this.sleep(1000);

    let textLength = altToBeTyped.alternativeText.length;

    for (let i = 0; i < textLength; i++) {
      altToBeTyped.typewriterText += altToBeTyped.alternativeText.charAt(0);
      altToBeTyped.alternativeText = altToBeTyped.alternativeText.substr(1);
      await this.sleep(delayPerLetter - 10);
    }
    this.fadeInIcons(altToBeTyped.alternativeId);
    document.getElementsByTagName("body")[0].removeChild(audio);

    if (alternatives.length > id) {
      this.typeWriteAlternatives(alternatives, id);
    } else {
      this.buttonRow = "show";
    }
  }

  calculateDelayForTypewriter(duration: number, textLength: number): number {
    let durationPerLetter = Math.round((duration / textLength) * 1000);
    return durationPerLetter;
  }

  correctNumberOfAlternativesSelected(): boolean {
    if (this.selectedCheckboxes.length === this.alternativesToBeSelected) {
      return true;
    }
    return false;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fadeInIcons(id: number) {
    this.showSoundButtons[id] =
      this.showSoundButtons[id] === "hide" ? "show" : "hide";
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);

      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        if (propName === "showQuestion" && from === "false" && to === "true") {
          console.log("lol");
          this.slideInQuestion();
        }
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    console.log(log);
  }
}
