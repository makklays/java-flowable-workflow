package com.techmatrix18.mapper;

import com.techmatrix18.dto.DealDto;
import com.techmatrix18.model.Deal;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class DealMapper {

    public static DealDto toDto(Deal deal) {
        DealDto dto = new DealDto();
        dto.setId(deal.getId());
        dto.setClient(deal.getClient());
        dto.setName(deal.getName());
        dto.setStage(deal.getStage());
        dto.setAmount(String.valueOf(deal.getAmount()));
        dto.setCurrency(deal.getCurrency());
        dto.setStartDate(String.valueOf(deal.getStartDate()));
        dto.setStartDate(String.valueOf(deal.getStartDate()));
        return dto;
    }

    public static List<DealDto> toDtoList(List<Deal> deals) {
        return deals.stream().map(deal -> DealMapper.toDto(deal)).collect(Collectors.toList());
    }

    public static Deal toEntity(DealDto dealDto) {
        Deal deal = new Deal();
        deal.setId(dealDto.getId());
        deal.setClient(dealDto.getClient());
        deal.setName(dealDto.getName());
        deal.setStage(dealDto.getStage());
        deal.setAmount(new BigDecimal(dealDto.getAmount()));
        deal.setCurrency(dealDto.getCurrency());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        deal.setStartDate(LocalDateTime.parse(dealDto.getStartDate(), formatter));
        deal.setCloseDate(LocalDateTime.parse(dealDto.getCloseDate(), formatter));
        return deal;
    }
}

