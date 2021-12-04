import { Deserializable } from "../firebase-deserialisation";
import Applications from "./Applications";

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
    open: boolean;
    due_date: number;
    reportingManager: string;
    applications: [Applications];
    rejected:[Applications];
    first:[Applications];
    second:[Applications];
    third:[Applications];
    hired:[Applications];

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}