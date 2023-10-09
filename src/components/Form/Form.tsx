/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import Input from "./../Input/Input"; 
import Button from "./../Button/Button";  
import Select from "./../Select/Select";  
import Switch from "./../Switch/Switch";  
import "./Form.css";

interface FormProps {
    dataQuestion: any;
    handleSubmit: any;
    dataArr: any;
    setDataArr: any;
    label: string;
}

const Form = ({
    dataQuestion,
    handleSubmit,
    dataArr,
    setDataArr,
    label,
}: FormProps) => {
    const linkedInput = (name: string, value: any) => {
        setDataArr(name, value);
    };

    return (
        <form onSubmit={handleSubmit}>
            {dataQuestion.questions.map((question: any) => (
                <Fragment key={question.id}>
                    {["email", "number", "text", "tel", "date", "month", "range"].includes(question.type) && (
                        <Input
                            id={question.name}
                            name={question.name}
                            label={question.label}
                            type={question.type}
                            value={String(dataArr[question.name])}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => linkedInput(question.name, e.target.checked)} // Typed the event
                        />
                    )}
                    {/* ... other form elements ... */}
                    {question.type === "switch" && (
                        <Switch
                            isChecked={Boolean(dataArr[question.name])}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => linkedInput(question.name, e.target.checked)} // Typed the event
                        />
                    )}
                    {question.type === "select" && (
                        <Select
                            id={question.name}
                            name={question.name}
                            label={question.label}
                            value={String((dataArr as any)[question.name])}
                            options={question.options || []}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => linkedInput(question.name, e.target.value)} // Typed the event
                        />
                    )}
                </Fragment>
            ))}
            <Button text={label} submit={true} />
        </form>
    );
};

export default Form;
