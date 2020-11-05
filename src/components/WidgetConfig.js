import '../App.css';
import * as SRD from '@projectstorm/react-diagrams';

export class Diagram {
	activeModel = null;
	diagramEngine = null;
  
	constructor() {
	  this.diagramEngine = SRD.default();
	  this.activeModel = new SRD.DiagramModel();
	  this.newModel();
	}
  
	newModel() {
	  this.diagramEngine.setModel(this.activeModel);
	}
  
	getActiveDiagram() {
	  return this.activeModel;
	}
  
	getDiagramEngine() {
	  return this.diagramEngine;
	}
  }
  