import { Component, OnInit, Output, Input, SimpleChange } from "@angular/core";
import { Question, IAlternative, IQuestionInput } from "./question";
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
  selector: "base-question",
  templateUrl: "./base-question.component.html",
  styleUrls: ["./base-question.component.css"],
  animations: [slideInAnimation, fadeInAnimation]
})
export class BaseQuestionComponent implements OnInit {
  data: IQuestionInput;
  state: string = "hidden";
  task: number;
  situation: number;
  sound = new Audio();
  soundDuration: number;
  radioButtonsMarked: number[] = [];
  showSoundButtons = new Object();
  audioList = new Object();
  useTypewriter: boolean = true;
  typewriterFinished: boolean = false;
  alternativesToBeSelected: number;
  buttonRow: string = "show";
  errorMessage: string;
  dataIsLoaded: boolean = false;
  @Output() replayClicked: EventEmitter<null> = new EventEmitter();
  @Output() completeClicked: EventEmitter<null> = new EventEmitter();
  question: Question;

  constructor() {}

  ngOnInit() {
    console.log(this.data);
    this.baseSetUp();
    // this.questionService.getQuestion(this.situation, this.task).subscribe({
    //   next: data => {
    //     this.question = new Question(data);
    //     this.setUp();
    //     this.dataIsLoaded = true;
    //   },
    //   error: err => (this.errorMessage = err)
    // });
  }

  baseSetUp() {
    this.setUpInput();
    this.setUpSoundButtonsAndAudio();
    this.setUpRadiobuttonsAndCheckboxes();
    if (this.useTypewriter) {
      this.question.setUpTypewriting();
      this.buttonRow = "hide";
    }
    this.dataIsLoaded = true;
  }

  setUpInput() {
    this.question = this.data.question;
    this.situation = this.data.situation;
    this.task = this.data.task;
    this.useTypewriter = this.data.useTypewriter;
  }

  async slideInQuestion() {
    this.state = "visible";
    if (this.useTypewriter) {
      await this.sleep(1000);
      this.typewriteQuestion();
    }
  }

  setUpRadiobuttonsAndCheckboxes() {
    if (this.question.questionType == "priority-question")
      this.question.alternatives.forEach(alt => {
        this.radioButtonsMarked.push(0);
      });
    else {
      this.alternativesToBeSelected = this.question.alternativesToBeSelected;
    }
  }

  setUpSoundButtonsAndAudio() {
    this.question.alternatives.forEach(element => {
      this.showSoundButtons[element.alternativeId] = this.useTypewriter
        ? "hide"
        : "show";
      let audio = document.createElement(`audio`);
      audio.src = `/assets/sounds/situation-${this.situation}/t${this.task}a${element.alternativeId}.mp3`;
      audio.setAttribute(
        "id",
        `audio_task${this.task}_id${element.alternativeId}`
      );
      this.audioList[element.alternativeId] = audio;
    });
  }

  resetVisibleComponents() {
    if (this.useTypewriter) {
      this.question.alternatives.forEach(element => {
        this.showSoundButtons[element.alternativeId] = "hide";
      });
      this.resetTextForTypewriting();
    }
  }

  resetTextForTypewriting() {
    this.question.alternatives.forEach(alternative => {
      alternative.alternativeText = alternative.typewriterText;
      alternative.typewriterText = "";
    });
  }

  displayQuestionBox() {
    this.toggleSlide();
    this.typewriteQuestion();
  }

  playSound(id: number) {
    this.sound.pause();
    this.sound.currentTime = 0;
    this.sound = this.audioList[id];
    this.sound.play();
  }

  async replayTask() {
    this.sound.pause();
    this.sound.currentTime = 0;
    this.toggleSlide();
    this.replayClicked.emit();
    await this.sleep(1000);
    this.resetVisibleComponents();
  }

  completeTask() {
    this.sound.pause();
    this.sound.currentTime = 0;
    this.toggleSlide();
    this.completeClicked.emit();
  }

  toggleSlide() {
    this.state = this.state === "hidden" ? "visible" : "hidden";
  }

  // checkboxClicked(id: number) {
  //   if (this.selectedCheckboxes.includes(id)) {
  //     this.selectedCheckboxes.splice(this.selectedCheckboxes.indexOf(id), 1);
  //   } else {
  //     if (this.selectedCheckboxes.length === this.alternativesToBeSelected) {
  //       let firstElement = this.selectedCheckboxes[0];
  //       this.selectedCheckboxes.shift();
  //       this.toggleCheckbox(firstElement);
  //       this.selectedCheckboxes.push(id);
  //     } else {
  //       this.selectedCheckboxes.push(id);
  //     }
  //   }
  // }

  toggleCheckbox(id: number): void {
    var inputElement = <HTMLInputElement>document.getElementById("alt" + id);
    inputElement.checked = !inputElement.checked;
  }

  // alternativeIsChecked(id: number): Boolean {
  //   if (this.selectedCheckboxes.includes(id)) {
  //     return true;
  //   }
  //   return false;
  // }

  radiobuttonClicked(alternativeId: number, radioButtonNumber: number) {
    if (this.radioButtonsMarked[alternativeId - 1] === radioButtonNumber) {
      this.radioButtonsMarked[alternativeId - 1] = 0;
    } else {
      this.radioButtonsMarked[alternativeId - 1] = radioButtonNumber;
    }
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
    if (this.allPriorityButtonsSelected()) {
      return true;
    }
    return false;
  }

  allPriorityButtonsSelected() {
    if (
      this.radioButtonsMarked.includes(0) ||
      this.radioButtonsMarked.length === 0
    ) {
      return false;
    }
    return true;
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
        // if (propName === "showQuestion" && from === "false" && to === "true") {
        //   this.slideInQuestion();
        // }
        // if (propName === "task") {
        //   this.fullSetUp();
        // }
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    console.log(log);
  }
}
