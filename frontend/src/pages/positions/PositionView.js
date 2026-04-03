import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import positionService from "../../services/positionService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTimes, faPenToSquare, faTrashCan, faPlus, faSitemap, faBriefcase, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

const PositionView = () => {
    const { id } = useParams();
    const [position, setPosition] = useState(null);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchPosition = async () => {
            try {
                const response = await positionService.getPositionById(id);
                setPosition(response.data);
            } catch (error) {
                console.error("Ошибка загрузки роли:", error);
            }
        };

        fetchPosition();
    }, [id]);

    if (!position) return <div>Loading...</div>;

    return (
        <div>
            {/* Заголовок с кнопкой назад */}
            <div className="row">
                <div className="col-md-6">
                    <h1>
                        <FontAwesomeIcon icon={faBriefcase} className="me-3 text-primary" />
                        {t('position_details')}
                    </h1>
                    <p>Здесь будет список отделений компании...</p>
                </div>
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/positions')}>
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
                                <td className="ps-4">{position.id}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Название</th>
                                <td className="ps-4 fw-bold text-dark">{position.title}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Описание</th>
                                <td className="ps-4 text-muted">
                                    {position.description || 'Описание отсутствует'}
                                </td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Создано</th>
                                <td className="ps-4">
                                    <span className="badge bg-info-subtle text-info border border-info-subtle">
                                        {position.createdAt || '-'}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-8 col-lg-6">
                    <button className="btn btn-warning" onClick={() => navigate(`/positions/${position.id}/edit`)} style={{ marginRight: '10px' }} >
                        <FontAwesomeIcon icon={faPenToSquare} className="me-2" /> Редактировать
                    </button>
                    <button className="btn btn-light text-secondary" onClick={() => navigate('/positions')}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PositionView;

