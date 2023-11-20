import { Question } from '../Other/question.interface';

export interface FormProps {
    dataQuestion: Question[];
    handleSubmit: any;
    dataArr: any;
    setDataArr: any;
    label: string;
}
