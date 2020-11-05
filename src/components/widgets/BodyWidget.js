import * as React from "react";
import * as _ from "lodash";
import { TrayWidget } from "./TrayWidget";
import { TrayItemWidget } from "./TrayItemWidget";
import { DemoCanvasWidget } from "./DemoCanvasWidget";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import styled from "styled-components";


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
          let links = Object.values(
            val.getPort("Out")?.getLinks() || ""
          );
          console.log(val)
          console.log(links)
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
    } catch (err) {console.log(err)}
  };

  bForce = () => {
    this.getConnectionInfo();
    this.forceUpdate();
  };

  render() {
    return (
      <Body>
        <Header>
          <div className="title">Storm React Diagrams - DnD demo</div>
        </Header>
        <Content>
          <TrayWidget>
            <TrayItemWidget
              model={{ type: "in" }}
              name="In Node"
              color="rgb(192,255,0)"
            />
            <TrayItemWidget
              model={{ type: "out" }}
              name="Out Node"
              color="rgb(0,192,255)"
            />
            <button id="force-render" onClick={this.bForce}>
              force render
            </button>
          </TrayWidget>
          <Layer
            onDrop={(event) => {
              var data = JSON.parse(
                event.dataTransfer.getData("storm-diagram-node")
              );
              var nodesCount = _.keys(
                this.props.app.getDiagramEngine().getModel().getNodes()
              ).length;

              

              var node = new DefaultNodeModel(
                "Node " + (nodesCount + 1),
                "rgb(0,192,255)"
              );
              if (data.type === "in") {
                node = new DefaultNodeModel(
                  "Node " + (nodesCount + 1),
                  "rgb(192,255,0)"
                );
                node.addInPort("In");
              } else {
                node = new DefaultNodeModel(
                  "Node " + (nodesCount + 1),
                  "rgb(0,192,255)"
                );
                node.addOutPort("Out");
              }
              var point = this.props.app
                .getDiagramEngine()
                .getRelativeMousePoint(event);
              node.setPosition(point);
              this.props.app.getDiagramEngine().getModel().addNode(node);
              this.forceUpdate();
            }}
            onDragOver={(event) => {
              event.preventDefault();
            }}
          >
            <div>
              {this.connections.length !== 0 &&
                this.connections.map((val, key) => {
                  if (val.source.length !== 0) {
                    return (
                      <div>
                        <h2 style={{ color: "black" }}>
                          {val.source} {"->"} {val.target}
                        </h2>
                        <h5 style={{ color: "black" }}></h5>
                      </div>
                    );
                  }
                })}
            </div>
            <DemoCanvasWidget>
              <CanvasWidget engine={this.props.app.getDiagramEngine()} />
            </DemoCanvasWidget>
          </Layer>
        </Content>
      </Body>
    );
  }
}
