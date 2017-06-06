import { FormatArg } from '../../interfaces';
import { FormatValueType } from '../type.class';
export declare class NumberValueType extends FormatValueType<number> {
    typeName: string;
    flag: RegExp;
    render(formatArg: FormatArg<number>): string;
}
export default NumberValueType;
