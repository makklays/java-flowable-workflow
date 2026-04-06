package com.techmatrix18.mapper;

import com.techmatrix18.dto.SymbolDto;
import com.techmatrix18.model.Symbol;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper for symbols.
 *
 * @author Alexander Kuziv
 * @since 06.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class SymbolMapper {

    public static SymbolDto toDto (Symbol symbol) {
        SymbolDto dto = new SymbolDto();
        dto.setId(symbol.getId());
        dto.setExchangeId(symbol.getExchangeId());
        dto.setSymbol(symbol.getSymbol());
        dto.setOriginalSymbol(symbol.getOriginalSymbol());
        dto.setBaseAsset(symbol.getBaseAsset());
        dto.setQuoteAsset(symbol.getQuoteAsset());
        dto.setMarketType(symbol.getMarketType());
        dto.setPricePrecision(symbol.getPricePrecision());
        dto.setQuantityPrecision(symbol.getQuantityPrecision());
        dto.setActive(symbol.getActive());
        dto.setHistoryStartTime(symbol.getHistoryStartTime());
        dto.setHistoryEndTime(symbol.getHistoryEndTime());
        dto.setCreatedAt(symbol.getCreatedAt());
        dto.setUpdatedAt(symbol.getUpdatedAt());
        return dto;
    }

    public static List<SymbolDto> toDtoList(List<Symbol> symbols) {
        return symbols.stream().map(symbol -> SymbolMapper.toDto(symbol)).collect(Collectors.toList());
    }

    public static Symbol toEntity(SymbolDto symbolDto) {
        Symbol symbol = new Symbol();
        symbol.setId(symbolDto.getId());
        symbol.setExchangeId(symbolDto.getExchangeId());
        symbol.setSymbol(symbolDto.getSymbol());
        symbol.setOriginalSymbol(symbolDto.getOriginalSymbol());
        symbol.setBaseAsset(symbolDto.getBaseAsset());
        symbol.setQuoteAsset(symbolDto.getQuoteAsset());
        symbol.setMarketType(symbolDto.getMarketType());
        symbol.setPricePrecision(symbolDto.getPricePrecision());
        symbol.setQuantityPrecision(symbolDto.getQuantityPrecision());
        symbol.setActive(symbolDto.getActive());
        symbol.setHistoryStartTime(symbolDto.getHistoryStartTime());
        symbol.setHistoryEndTime(symbolDto.getHistoryEndTime());
        symbol.setCreatedAt(symbolDto.getCreatedAt() != null ? symbolDto.getCreatedAt() : null);
        symbol.setUpdatedAt(symbolDto.getUpdatedAt() != null ? symbolDto.getUpdatedAt() : null);
        return symbol;
    }
}

