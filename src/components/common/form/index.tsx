import { Fragment } from 'react';
import Input from '../input';
import Button from '../button';
import Select from '../select';
import Switch from '../switch';
import '../../../assets/style/components/common/form.css';
import { FormProps } from '../../../interface/components/common/form.interface';

function Form({
    dataQuestion,
    handleSubmit,
    dataArr,
    setDataArr,
    label,
}: FormProps) {
    const linkedInput = (name: any, value: string | boolean) => {
        setDataArr((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            {dataQuestion.map((question: any) => (
                <Fragment key={question.id}>
                    {[
                        'email',
                        'number',
                        'text',
                        'tel',
                        'date',
                        'month',
                        'range',
                        'search',
                        'time',
                        'url',
                        'week',
                        'password',
                    ].includes(question.type) && (
                        <Input
                            id={question.name}
                            name={question.name}
                            label={question.label}
                            type={question.type}
                            value={String(dataArr[question.name] || '')}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => linkedInput(question.name, e.target.value)}
                        />
                    )}
                    {question.type === 'switch' && (
                        <Switch
                            isChecked={Boolean(dataArr[question.name])}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => linkedInput(question.name, e.target.checked)}
                        />
                    )}
                    {question.type === 'select' && (
                        <Select
                            id={question.name}
                            name={question.name}
                            label={question.label}
                            value={String(
                                (dataArr as any)[question.name] || ''
                            )}
                            options={question.options || []}
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => linkedInput(question.name, e.target.value)}
                        />
                    )}
                </Fragment>
            ))}
            <Button text={label} variant="primary" submit />
        </form>
    );
}

export default Form;
