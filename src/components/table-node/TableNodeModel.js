import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';

/**
 * Example of a custom model using pure javascript
 */
export class TableNodeModel extends NodeModel {
	constructor(options = {}) {
		super({
			...options,
			type: 'js-custom-node'
		});
		this.color = options.color || { options: 'red' };
		this.name = options.name || {name: 'name'};
		// setup an in and out port
	}

	addOutPort() {
		this.addPort(
			new DefaultPortModel({
				in: true,
				name: 'out'
			})
		);
	}

	addInPort() {
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'in'
			})
		);
	}

	serialize() {
		return {
			...super.serialize(),
			color: this.color,
			name: this.name,
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
		this.color = ob.color;
		this.name = ob.name;
	}
}