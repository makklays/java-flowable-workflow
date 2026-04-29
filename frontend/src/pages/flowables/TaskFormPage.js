import { FORM_COMPONENTS } from './flowable-forms';

const TaskFormPage = () => {
    const location = useLocation();
    const task = location.state?.task;

    // Получаем нужный компонент из реестра
    const SelectedForm = FORM_COMPONENTS[task?.formKey];

    return (
        <div>
            {SelectedForm ? (
                <SelectedForm task={task} />
            ) : (
                <div className="alert alert-danger">Компонент для {task?.formKey} не создан</div>
            )}
        </div>
    );
};

