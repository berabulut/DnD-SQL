import * as React from "react";
import * as _ from "lodash";
import { DemoCanvasWidget } from "./canvas/DemoCanvasWidget";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import {TableNodeModel} from "./table-node/TableNodeModel";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import styled from "styled-components";
import './canvas/Canvas.css';

export const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const Header = styled.div`
  display: flex;
  background: rgb(30, 30, 30);
  flex-grow: 0;
  flex-shrink: 0;
  color: white;
  font-family: Helvetica, Arial, sans-serif;
  padding: 10px;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-grow: 1;
`;

export const Layer = styled.div`
  position: relative;
  flex-grow: 1;
`;

export class BodyWidget extends React.Component {
  connections = [{ source: "", target: "" }];

  doesConnectionExist = (src, trg) => {
    let state = false;
    this.connections.map((val, key) => {
      if (src === val.source && trg === val.target) {
        state = true;
      }
    });
    return state;
  };

  getConnectionInfo = () => {
    try {
      this.props.app
        .getDiagramEngine()
        .getModel()
        .getNodes()
        .map((val, key) => {
          let links = Object.values(val.getPort("Out")?.getLinks() || "");
          links.map((value) => {
            if (this.connections.length !== 0) {
              if (this.connections[0].source.length !== 0) {
                // check if connections[0] has initialized values
                if (
                  this.doesConnectionExist(
                    value.getSourcePort().getNode().options.id,
                    value.getTargetPort().getNode().options.id
                  ) !== true
                ) {
                  this.connections.push({
                    source: value.getSourcePort().getNode().options.id,
                    target: value.getTargetPort().getNode().options.id,
                  });
                }
              } else {
                // overwrite initialized values
                this.connections[0] = {
                  source: value.getSourcePort().getNode().options.id,
                  target: value.getTargetPort().getNode().options.id,
                };
              }
            }
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  createNewTable = () => {
    const node = new TableNodeModel({
      color: 'blue',
      name: 'Table',
    })
    node.addOutPort();
    node.addInPort();
    node.setPosition(350, 150);
    this.props.app.getDiagramEngine().getModel().addNode(node);
    this.forceUpdate();
  }

  render() {
    return (
      <Body className="CanvasBody">
        <DemoCanvasWidget>
          <CanvasWidget engine={this.props.app.getDiagramEngine()} />
        </DemoCanvasWidget>
      </Body>
    );
  }
}
