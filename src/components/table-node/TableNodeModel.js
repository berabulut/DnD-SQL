import {DefaultPortModel, NodeModel} from '@projectstorm/react-diagrams';

/**
 * Example of a custom model using pure javascript
 */
export class TableNodeModel extends NodeModel {
    constructor(options = {}) {
        super({
            ...options,
            type: 'js-custom-node'
        });
        this.fields = options.fields || {
            fields: [{
                Name: "id",
                Type: "Integer",
                Nullable: false,
                Indexed: true,
                Unique: true,
            }]
        }
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

    addNewField() {
        this.fields.push({
            Name: "newField",
            Type: "Integer",
            Nullable: false,
            Indexed: false,
            Unique: false,
        });
    }

    serialize() {
        return {
            ...super.serialize(),
            name: this.name,
            fields: this.fields
        };
    }

    deserialize(ob, engine) {
        super.deserialize(ob, engine);
        this.name = ob.name;
        this.fields = ob.fields;
    }
}