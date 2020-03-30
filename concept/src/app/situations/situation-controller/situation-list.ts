export class SituationList {
  list = [
    { situationNumber: 0, taskList: [1] },
    { situationNumber: 1, taskList: [] },
    { situationNumber: 2, taskList: [] },
    { situationNumber: 3, taskList: [2, 3] },
    { situationNumber: 4, taskList: [] }
  ];
  currentSituation: ITaskList;

  constructor() {
    this.currentSituation = this.list.shift();
  }

  getNextTask() {
    if (this.currentSituation.taskList.length == 0) {
      if (this.list.length == 0) {
        return { task: -1, situation: -1 };
      }
      this.currentSituation = this.list.shift();
      return this.getNextTask();
    } else {
      return {
        task: this.currentSituation.taskList.shift(),
        situation: this.currentSituation.situationNumber
      };
    }
  }
}

export interface ITaskList {
  situationNumber: number;
  taskList: number[];
}
