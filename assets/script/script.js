import { ProjectListItems } from './App/ProjectListItems.js';

class App {
  static init() {
    const activeProject = new ProjectListItems('active');
    const finishedProjectList = new ProjectListItems('finished');
    activeProject.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));

    finishedProjectList.setSwitchHandlerFunction(activeProject.addProject.bind(activeProject));
  }
}

App.init();