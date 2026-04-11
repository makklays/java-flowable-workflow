package com.techmatrix18.mapper;

import com.techmatrix18.dto.CandleDto;
import com.techmatrix18.model.Candle;
import com.fasterxml.jackson.databind.JsonNode;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper for candles.
 *
 * @author Alexander Kuziv
 * @since 06.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class CandleMapper {

    public static CandleDto toDto (Candle candle) {
        CandleDto dto = new CandleDto();
        dto.setId(candle.getId());
        dto.setExchangeId(candle.getExchangeId());
        dto.setSymbolId(candle.getSymbolId());
        // Берем имя из связанной сущности Symbol
        /*if (candle.getSymbol() != null) {
            dto.setSymbolName(candle.getSymbol().getName());
        }*/
        dto.setTimeframe(candle.getTimeframe());
        dto.setOpenTime(candle.getOpenTime());
        dto.setOpen(candle.getOpen());
        dto.setHigh(candle.getHigh());
        dto.setLow(candle.getLow());
        dto.setClose(candle.getClose());
        dto.setVolume(candle.getVolume());
        dto.setQuoteAssetVolume(candle.getQuoteAssetVolume());
        dto.setTradesCount(candle.getTradesCount());
        dto.setOpenInterest(candle.getOpenInterest());
        dto.setFundingRate(candle.getFundingRate());
        return dto;
    }

    public static List<CandleDto> toDtoList(List<Candle> candles) {
        return candles.stream().map(candle -> CandleMapper.toDto(candle)).collect(Collectors.toList());
    }

    public static Candle toEntity(CandleDto candleDto) {
        Candle candle = new Candle();
        candle.setId(candleDto.getId());
        candle.setExchangeId(candleDto.getExchangeId());
        candle.setSymbolId(candleDto.getSymbolId());
        candle.setTimeframe(candleDto.getTimeframe());
        candle.setOpenTime(candleDto.getOpenTime());
        candle.setOpen(candleDto.getOpen());
        candle.setHigh(candleDto.getHigh());
        candle.setLow(candleDto.getLow());
        candle.setClose(candleDto.getClose());
        candle.setVolume(candleDto.getVolume());
        candle.setQuoteAssetVolume(candleDto.getQuoteAssetVolume());
        candle.setTradesCount(candleDto.getTradesCount());
        candle.setOpenInterest(candleDto.getOpenInterest());
        candle.setFundingRate(candleDto.getFundingRate());
        return candle;
    }

    public static Candle toEntityFromBinanceJson(Long symbolId, Integer exchangeId, String timeframe, JsonNode node) {
        Candle candle = new Candle();
        candle.setSymbolId(symbolId);
        // Если exchangeId пришел null, ставим ID = 1 (Binance) по умолчанию
        candle.setExchangeId(exchangeId != null ? exchangeId : 1);
        candle.setTimeframe(timeframe);

        candle.setOpenTime(node.get(0).asLong());
        candle.setOpen(new BigDecimal(node.get(1).asText()));
        candle.setHigh(new BigDecimal(node.get(2).asText()));
        candle.setLow(new BigDecimal(node.get(3).asText()));
        candle.setClose(new BigDecimal(node.get(4).asText()));
        candle.setVolume(new BigDecimal(node.get(5).asText()));
        candle.setQuoteAssetVolume(new BigDecimal(node.get(7).asText()));
        candle.setTradesCount(node.get(8).asInt());

        // Поля, которых нет в обычном клайне Binance, лучше инициализировать нулем,
        // если они NOT NULL в базе
        candle.setOpenInterest(BigDecimal.ZERO);
        candle.setFundingRate(BigDecimal.ZERO);

        return candle;
    }
}

