import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import positionService from "../services/positionService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTimes, faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const PositionView = () => {
    const { id } = useParams();
    const [position, setPosition] = useState(null);

    const navigate = useNavigate();

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
            <h1>Position details</h1>

            <div className="row" >
                <div className="col-md-6">
                    <p><b>Title:</b> {position.title}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/positions')}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PositionView;

