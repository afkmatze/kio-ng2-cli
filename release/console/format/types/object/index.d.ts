import { FormatArg } from '../../interfaces';
import { FormatValueType } from '../type.class';
export declare class ObjectValueType extends FormatValueType<object> {
    typeName: string;
    flag: RegExp;
    render(formatArg: FormatArg<object>): string;
}
export default ObjectValueType;
