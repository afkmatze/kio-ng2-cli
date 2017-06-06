import { FormatArg } from '../../interfaces';
import { FormatValueType } from '../type.class';
export declare class StringValueType extends FormatValueType<string> {
    typeName: string;
    flag: RegExp;
    render(formatArg: FormatArg<string>): string;
}
export default StringValueType;
