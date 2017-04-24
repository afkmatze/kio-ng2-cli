import { Observable } from 'rxjs';
export interface ComponentTest {
    name: string;
    criteria: any;
    fixture: any;
}
export declare class TestRunner {
    constructor();
    componentTests: ComponentTest[];
    addTest(componentTest: ComponentTest): ComponentTest;
    protected runTest(componentTest: ComponentTest): Observable<string>;
    run(): Observable<string>;
}
