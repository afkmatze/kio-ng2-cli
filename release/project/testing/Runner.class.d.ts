import { Observable } from 'rxjs';
import { ComponentFixture, NamedComponent } from 'kio-ng2-component-routing';
export interface ComponentTest {
    component: NamedComponent;
    fixture: ComponentFixture;
}
export interface TestFixture {
    componentName: string;
    fixture: ComponentFixture;
}
export declare class TestRunner {
    protected components: NamedComponent[];
    constructor(components: NamedComponent[]);
    private _components;
    private _fixtures;
    readonly fixtures: Observable<TestFixture>;
    getComponentForFixture(fixture: TestFixture): any;
    mapFixtureToTest(testFixture: TestFixture): ComponentTest;
    readonly componentTests: Observable<ComponentTest>;
    testComponent(component: NamedComponent): void;
    run(): Observable<string>;
    assertComponent(component: NamedComponent): void;
}
