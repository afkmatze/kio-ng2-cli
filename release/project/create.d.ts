/// <reference types="node" />
import { Observable } from 'rxjs';
export declare const createProject: (opts: {
    name: string;
}) => Observable<string | Buffer[]>;
