import Feedback from "./feedback";

export default class Applications {
    key: string;
    role: string;
    applied_on: number;
    name: string;
    email: string;
    resume: string;
    photo: URL;
    skills: string[];
    work_ex: number;
    phone: number;
    ctc:number;
    status: string;
    rating: number;
    indent_id:string;
    moved_1:Date;
    moved_2:Date;
    moved_3:Date;
    rejected_on:Date;
    hired_on:Date;
    feedback:[Feedback];
}