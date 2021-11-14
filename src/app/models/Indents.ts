import { Deserializable } from "../firebase-deserialisation";

export default class Indents implements Deserializable {
    $key: string;
    role: string;
    description: number;
    created_on: number;
    created_by: string;
    department: string;
    ctc: number;
    min_work_ex: number;
    vacancies: number;
    location: string[];
    skills: string[];
    max_work_ex: number;
    expected_joining_date: number;
    open: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}