import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import departmentService from "../services/departmentService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTimes, faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const DepartmentView = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await departmentService.getDepartmentById(id);
                setDepartment(response.data);
            } catch (error) {
                console.error("Ошибка загрузки роли:", error);
            }
        };

        fetchDepartment();
    }, [id]);

    if (!department) return <div>Loading...</div>;

    return (
        <div>
            <h1>Department details</h1>

            <div className="row" >
                <div className="col-md-6">
                    <p><b>Title:</b> {department.title}</p>
                    <p><b>Description:</b> {department.description}</p>

                    <p><b>Created at:</b> {department.createdAt != null ? department.createdAt : '-'}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/departments')}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DepartmentView;

