import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import roleService from "../services/roleService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTimes, faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const RoleView = () => {
    const { id } = useParams();
    const [role, setRole] = useState(null);

    const navigate = useNavigate();

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
            <h1>Role details</h1>

            <div className="row" >
                <div className="col-md-6">
                    <p><b>Title:</b> {role.title}</p>
                    <p><b>Description:</b> {role.description}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/roles')}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleView;

