package com.techmatrix18.mapper;

import com.techmatrix18.dto.PositionDto;
import com.techmatrix18.model.Position;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class PositionMapper {

    public static PositionDto toDto (Position position) {
        PositionDto dto = new PositionDto();
        dto.setId(position.getId());
        dto.setTitle(position.getTitle());
        return dto;
    }

    public static List<PositionDto> toDtoList(List<Position> positions) {
        return positions.stream().map(position -> PositionMapper.toDto(position)).collect(Collectors.toList());
    }

    public static Position toEntity(PositionDto positionDto) {
        Position position = new Position();
        position.setId(positionDto.getId());
        position.setTitle(positionDto.getTitle());
        return position;
    }
}

