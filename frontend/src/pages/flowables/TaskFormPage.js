import ReviewForm from './forms/ReviewForm';
import SimpleApproveForm from './forms/SimpleApproveForm';

const TaskFormPage = () => {
    const { taskId } = useParams();
    const location = useLocation();
    const task = location.state?.task;

    // Словарь ваших компонентов
    const formComponents = {
        'review-form': <ReviewForm task={task} />,
        'approve-billing': <SimpleApproveForm task={task} />,
    };

    return (
        <div className="container mt-4">
            <h2>Задача: {task?.name}</h2>
            <hr />
            {/* Рендерим форму по ключу или заглушку */}
            {formComponents[task?.formKey] || (
                <div className="alert alert-warning">
                    Форма для ключа "{task?.formKey}" не найдена.
                </div>
            )}
        </div>
    );
};

