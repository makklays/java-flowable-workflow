package com.techmatrix18.mapper;

import com.techmatrix18.dto.TradeDto;
import com.techmatrix18.enums.TradeSide;
import com.techmatrix18.model.Trade;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper for trades.
 *
 * @author Alexander Kuziv
 * @since 24.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class TradeMapper {

    // Преобразование Entity в DTO (для отправки на фронтенд)
    public static TradeDto toDto(Trade trade) {
        if (trade == null) return null;

        // Используем ваш конструктор (entryTime, entryPrice, type)
        // Преобразуем LocalDateTime в Long (миллисекунды)
        Long entryTime = trade.getOpenedAt() != null
            ? trade.getOpenedAt().toInstant(ZoneOffset.UTC).toEpochMilli()
            : null;

        TradeDto dto = new TradeDto(
            entryTime,
            trade.getOpenPrice(),
            trade.getSide() != null ? trade.getSide().name() : null
        );

        // Заполняем остальные публичные поля
        dto.exitTime = trade.getClosedAt() != null
            ? trade.getClosedAt().toInstant(ZoneOffset.UTC).toEpochMilli()
            : null;

        dto.exitPrice = trade.getClosePrice();
        dto.profit = trade.getProfitLoss();

        // Расчет profitPercent (Прибыль / Цена открытия * 100)
        if (trade.getOpenPrice() != null && trade.getProfitLoss() != null && trade.getOpenPrice().compareTo(BigDecimal.ZERO) > 0) {
            dto.profitPercent = trade.getProfitLoss()
                .divide(trade.getOpenPrice(), 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal("100"));
        } else {
            dto.profitPercent = BigDecimal.ZERO;
        }

        return dto;
    }

    // Преобразование списка сущностей в список DTO
    public static List<TradeDto> toDtoList(List<Trade> trades) {
        if (trades == null || trades.isEmpty()) {
            return Collections.emptyList();
        }
        return trades.stream()
            .map(TradeMapper::toDto)
            .collect(Collectors.toList());
    }

    // Преобразование DTO в Entity (для сохранения в базу)
    public static Trade toEntity(TradeDto dto) {
        if (dto == null) return null;

        Trade trade = new Trade();

        // 1. Восстанавливаем время из Long (миллисекунды) в LocalDateTime
        if (dto.entryTime != null) {
            trade.setOpenedAt(LocalDateTime.ofInstant(Instant.ofEpochMilli(dto.entryTime), ZoneOffset.UTC));
        }

        if (dto.exitTime != null) {
            trade.setClosedAt(LocalDateTime.ofInstant(Instant.ofEpochMilli(dto.exitTime), ZoneOffset.UTC));
        }

        // 2. Цены и профит
        trade.setOpenPrice(dto.entryPrice);
        trade.setClosePrice(dto.exitPrice);
        trade.setProfitLoss(dto.profit);

        // 3. Преобразование типа сделки из String обратно в Enum
        if (dto.type != null) {
            try {
                trade.setSide(TradeSide.valueOf(dto.type.toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Если тип не распознан, можно оставить null или задать дефолт
                trade.setSide(null);
            }
        }

        // Примечание: Поля аналитики (maxPnl, maxDrawdown и т.д.)
        // в DTO отсутствуют, поэтому они останутся дефолтными в Entity.

        return trade;
    }
}

