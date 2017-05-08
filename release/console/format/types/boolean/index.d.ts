import { FormatArg } from '../../interfaces';
import { FormatValueType } from '../type.class';
export declare class BooleanValueType extends FormatValueType<boolean> {
    typeName: string;
    flag: RegExp;
    render(formatArg: FormatArg<boolean>): string;
}
export default BooleanValueType;
