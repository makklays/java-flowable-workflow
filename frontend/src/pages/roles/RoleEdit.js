import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTimes } from "@fortawesome/free-solid-svg-icons";

import roleService from "../../services/roleService";

const RoleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [roleData, setRoleData] = useState({
        title: "",
        description: ""
    });

    const [errors, setErrors] = useState({});

    // Загрузка роли при входе на страницу
    useEffect(() => {
        fetchRole();
    }, []);

    const fetchRole = async () => {
        try {
            const response = await roleService.getRoleById(id);
            setRoleData(response.data);
        } catch (error) {
            console.error("Ошибка загрузки роли:", error);
        }
    };

    // Сохранение изменений
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация
        const newErrors = {};
        if (!roleData.title) {
            newErrors.title = 'Поле обязательно для заполнения';
        } else if (roleData.title.length < 3) {
            newErrors.title = 'Минимум 3 символа';
        }
        // Если есть ошибки — сохраняем их в state и выходим
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Прерываем выполнение, запрос к API не уйдет
        }
        // Если ошибок нет — очищаем стейт и отправляем данные
        setErrors({});

        try {
            await roleService.putRole(id, roleData);
            navigate("/roles");
        } catch (error) {
            console.error("Ошибка обновления роли:", error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h1>Редактирование роли</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label required">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={roleData.title}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setRoleData({ ...roleData, title: val });
                                    if (val) setErrors(prev => ({ ...prev, title: null }));
                                }}
                            />
                            {errors.title && (
                                <div className="invalid-feedback" style={{ display: "block" }}>
                                    {errors.title}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                rows="8"
                                value={roleData.description || ""}
                                onChange={(e) =>
                                    setRoleData({ ...roleData, description: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-success me-2">
                            <FontAwesomeIcon icon={faFloppyDisk} className="me-2" />
                            Сохранить
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/roles")}
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />
                            Отмена
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RoleEdit;

