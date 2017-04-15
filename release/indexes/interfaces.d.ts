import { ComponentModel } from '../components';
export declare type IndexName = "publication" | "structure" | "navigation" | "fixture" | "criteria";
export declare enum IndexType {
    publication = 0,
    structure = 1,
    navigation = 2,
    fixture = 3,
    criteria = 4,
}
export interface ComponentIndex {
    name: IndexName;
    components: ComponentModel[];
}
