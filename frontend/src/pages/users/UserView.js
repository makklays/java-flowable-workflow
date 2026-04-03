import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTimes, faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const UserView = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userService.getUserById(id);
                setUser(response.data);
            } catch (error) {
                console.error("Ошибка загрузки роли:", error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>User details</h1>

            <div className="row" >
                <div className="col-md-6">
                    <p><b>Username:</b> {user.username != null ? user.username : '-'}</p>
                    <p><b>Display name:</b> {user.displayname != null ? user.displayname : '-'}</p>
                    <p><b>First name:</b> {user.firstname != null ? user.firstname : '-'}</p>
                    <p><b>Last name:</b> {user.lastname != null ? user.lastname : '-'}</p>

                    <p><b>E-mail:</b> {user.email != null ? user.email : '-'}</p>
                    <p><b>Phone:</b> {user.phone != null ? user.phone : '-'}</p>
                    <p><b>Address:</b> {user.address != null ? user.address : '-'}</p>

                    <p><b>Age:</b> {user.age != null ? user.age : '-'}</p>

                    <p><b>Department:</b> {user.departmentTitle != null ? user.departmentTitle : '-'}</p>
                    <p><b>Position:</b> {user.positionTitle != null ? user.positionTitle : '-'}</p>
                    <p><b>Role:</b> {user.roleTitle != null ? user.roleTitle : '-'}</p>

                    <p><b>Is a man:</b> {user.is_a_man ? 'да' : 'нет'}</p>
                    <p><b>Is a avatar showing:</b> {user.is_set_picture ? 'да' : 'нет'}</p>

                    <p><b>Start Work Date:</b> {user.startWorkDate != null ? user.startWorkDate : '-'}</p>

                    <p><b>Created at:</b> {user.createdAt != null ? user.createdAt : '-'}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/users')}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserView;

