import * as SRD from '@projectstorm/react-diagrams';
import { TableNodeFactory } from "./table-node/TableNodeFactory";
import '../App.css';

export class Diagram {
	activeModel = null;
	diagramEngine = null;
  
	constructor() {
	  this.diagramEngine = SRD.default();
	  this.diagramEngine
	  .getNodeFactories()
	  .registerFactory(new TableNodeFactory());
	  this.activeModel = new SRD.DiagramModel();
	  this.newModel();
	  this.diagramEngine.repaintCanvas();
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
  