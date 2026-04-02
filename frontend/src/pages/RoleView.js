import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import roleService from "../services/roleService";

const RoleView = () => {
    const { id } = useParams();
    const [role, setRole] = useState(null);

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

            <p><b>Title:</b> {role.title}</p>
            <p><b>Description:</b> {role.description}</p>
        </div>
    );
};

export default RoleView;

