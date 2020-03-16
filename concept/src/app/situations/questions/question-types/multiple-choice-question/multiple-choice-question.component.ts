import { Component, OnInit } from "@angular/core";
import { BaseQuestionComponent } from "../../base-question.component";
import { slideInAnimation, fadeInAnimation } from "src/app/animations";

@Component({
  selector: "app-multiple-choice-question",
  templateUrl: "./multiple-choice-question.component.html",
  styleUrls: ["./multiple-choice-question.component.css"],
  animations: [slideInAnimation, fadeInAnimation]
})
export class MultipleChoiceQuestionComponent extends BaseQuestionComponent {
  selectedCheckboxes: number[] = [];

  constructor() {
    super();
  }

  setUpCheckboxes() {
    this.alternativesToBeSelected = this.question.alternativesToBeSelected;
  }

  toggleCheckbox(id: number): void {
    var inputElement = <HTMLInputElement>document.getElementById("alt" + id);
    inputElement.checked = !inputElement.checked;
  }

  alternativeIsChecked(id: number): Boolean {
    if (this.selectedCheckboxes.includes(id)) {
      return true;
    }
    return false;
  }

  correctNumberOfAlternativesSelected(): boolean {
    if (this.selectedCheckboxes.length === this.alternativesToBeSelected) {
      return true;
    }
    return false;
  }

  checkboxClicked(id: number) {
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
  }

  completeTask() {
    super.completeTask();
    this.selectedCheckboxes = [];
  }
}
