import { Import } from '../Import';
import { Structure } from './Structure';
import { IndentedSection } from '../IndentedSection';
import { getUnmarshalledShapeName, hasStreamingBody } from './helpers';
import {
    OUTPUT_TYPES_IMPORT,
    OUTPUT_METADATA_PROPERTY,
} from './constants';
import {
    RuntimeTarget,
    SyntheticParameterCustomizationDefinition,
    TreeModelStructure,
} from '@aws/build-types';
import { GENERIC_STREAM_TYPE } from '../../constants';

export class Output extends Structure {
    constructor(
        shape: TreeModelStructure,
        private readonly runtime: RuntimeTarget,
        customizations: Array<SyntheticParameterCustomizationDefinition> = []
    ) {
        super(shape, customizations);
    }

    toString(): string {
        const streamType = this.runtime ? ` = ${this.getStreamType()}` : '';
        return `
${this.imports}

${this.docBlock(this.shape.documentation)}
export interface ${this.shape.name}${hasStreamingBody(this.shape) ? `<StreamType${streamType}>` : ''} {
${new IndentedSection(
    Object.keys(this.shape.members)
        .map(this.getMemberDefinition, this)
        .concat(this.syntheticParameters)
        .concat(OUTPUT_METADATA_PROPERTY)
        .join('\n\n')
)}
}
`.trim();
    }

    private get imports(): string {
        return this.foreignShapes
            .map(shape => new Import(
                `./${shape}`,
                getUnmarshalledShapeName(shape)
            ))
            .concat(OUTPUT_TYPES_IMPORT, this.environmentImports())
            .join('\n');
    }

    private environmentImports(): Import[] {
        const toImport = [];
        if (this.runtime === 'node' && hasStreamingBody(this.shape)) {
            toImport.push(new Import('stream', 'Readable'));
        }
        return toImport;
    }

    private getStreamType() {
        switch (this.runtime) {
            case 'browser':
                return 'ReadableStream|Blob';
            case 'node':
                return 'Readable';
            case 'universal':
                return 'Uint8Array';
            default:
                return GENERIC_STREAM_TYPE;
        }
    }
}