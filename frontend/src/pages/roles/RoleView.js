import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import roleService from "../../services/roleService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTimes, faPenToSquare, faTrashCan, faPlus, faUserShield, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

const RoleView = () => {
    const { id } = useParams();
    const [role, setRole] = useState(null);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await roleService.getRoleById(id);
                setRole(response.data);
            } catch (error) {
                console.error("Ошибка загрузки роли:", error);
            }
        };

        fetchRole();
    }, [id]);

    if (!role) return <div>Loading...</div>;

    return (
        <div>
            {/* Заголовок с кнопкой назад */}
            <div className="row">
                <div className="col-md-6">
                    <h1>
                        <FontAwesomeIcon icon={faUserShield} className="me-3 text-primary" />
                        {t('role_details')}
                    </h1>
                    <p>Здесь будет список отделений компании...</p>
                </div>
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/roles')}>
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> {t('back_to_list')}
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 col-lg-6">
                    <table className="table table-hover mb-0">
                        <tbody>
                            <tr>
                                <th className="bg-light w-25 ps-4">ID</th>
                                <td className="ps-4">{role.id}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Название</th>
                                <td className="ps-4 fw-bold text-dark">{role.title}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Описание</th>
                                <td className="ps-4 text-muted">
                                    {role.description || 'Описание отсутствует'}
                                </td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Создано</th>
                                <td className="ps-4">
                                    <span className="badge bg-info-subtle text-info border border-info-subtle">
                                        {role.createdAt || '-'}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-8 col-lg-6">
                    <button className="btn btn-warning" onClick={() => navigate(`/roles/${role.id}/edit`)} style={{ marginRight: '10px' }} >
                        <FontAwesomeIcon icon={faPenToSquare} className="me-2" /> Редактировать
                    </button>
                    <button className="btn btn-light text-secondary" onClick={() => navigate('/roles')}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleView;

