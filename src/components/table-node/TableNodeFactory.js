import * as React from 'react';
import { TableNodeModel } from './TableNodeModel';
import { TableNodeWidget } from './TableNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

export class TableNodeFactory extends AbstractReactFactory {
	constructor() {
		super('js-custom-node');
	}

	generateModel(event) {
		return new TableNodeModel();
	}

	generateReactWidget(event) {
		return <TableNodeWidget engine={this.engine} node={event.model} />;
	}
}