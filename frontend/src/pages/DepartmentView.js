import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import departmentService from "../services/departmentService";

const DepartmentView = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);

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
            <h2>Department details</h2>
            <p><b>Title:</b> {department.title}</p>
            <p><b>Description:</b> {department.description}</p>
        </div>
    );
};

export default DepartmentView;

