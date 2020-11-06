import * as React from "react";
import { PortWidget } from "@projectstorm/react-diagrams";


export class TableNodeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <div>
        <p>TABLE</p>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out")}
        >
          <div className="circle-port out-port" />
        </PortWidget>

        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("in")}
        >
          <div className="circle-port in-port" />
        </PortWidget>
      </div>
    );
  }
}

/*componentDidMount() {
	document.getElementById(this.props.node.options.id).addEventListener('contextmenu', (event) => {
		event.preventDefault();
		this.showModal()
	})
}*/

/* 

								<PortWidget engine={this.props.engine} port={this.props.node.getPort('out')}>
									<div className="circle-port out-port" />
								</PortWidget>

																		<PortWidget engine={this.props.engine} port={this.props.node.getPort('in')}>
											<div className="circle-port in-port" />
										</PortWidget>
*/
