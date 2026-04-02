import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import positionService from "../services/positionService";

const PositionView = () => {
    const { id } = useParams();
    const [position, setPosition] = useState(null);

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

            <p><b>Title:</b> {position.title}</p>
        </div>
    );
};

export default PositionView;

