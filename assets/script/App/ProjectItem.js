import { DOMHelper } from '../utility/DOMHelper.js';
// import { Tooltip } from './Tooltip.js';

export class ProjectItem {

  hasActiveTooltip = false;

  constructor(id, updateProjectListFunction, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunction;
    this.connectMoreInfoButton();
    this.connectSwithButton(type);
    this.connectDrag();
  }



  connectSwithButton(type) {
    const projectItemElement = document?.getElementById(this.id);
    let switchBtn = projectItemElement?.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListener(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Active';
    switchBtn?.addEventListener('click', this.updateProjectListHandler.bind(null, this.id));
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) return;
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    import('./Tooltip.js').then(module => {
      const tooltip = new module.Tooltip(() => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id);
      tooltip.attach();
      this.hasActiveTooltip = true;
    });

  }
  update(updateProjectListFn, type) {
    this.updateProjectListHandler = updateProjectListFn;
    this.connectSwithButton(type);
  }
  connectMoreInfoButton() {
    const projectItemElement = document?.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }
  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', event => {
      console.log(event);
    });
  }
}