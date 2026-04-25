import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

// =========================
// SAFE SYNC CHARTS
// =========================
function syncCharts(chart1, chart2) {
    let isSyncing = false;

    const handler1 = range => {
        if (isSyncing || !range) return;
        isSyncing = true;
        chart2.timeScale().setVisibleLogicalRange(range);
        isSyncing = false;
    };

    const handler2 = range => {
        if (isSyncing || !range) return;
        isSyncing = true;
        chart1.timeScale().setVisibleLogicalRange(range);
        isSyncing = false;
    };

    chart1.timeScale().subscribeVisibleLogicalRangeChange(handler1);
    chart2.timeScale().subscribeVisibleLogicalRangeChange(handler2);

    return () => {
        chart1.timeScale().unsubscribeVisibleLogicalRangeChange(handler1);
        chart2.timeScale().unsubscribeVisibleLogicalRangeChange(handler2);
    };
}

// =========================
// SAFE CROSSHAIR SYNC
// =========================
function syncCrosshair(chart1, chart2) {
    const handler1 = param => {
        if (!param?.time) return;
        chart2.setCrosshairPosition?.(param.paneIndex || 0, param.time, param.point);
    };

    const handler2 = param => {
        if (!param?.time) return;
        chart1.setCrosshairPosition?.(param.paneIndex || 0, param.time, param.point);
    };

    chart1.subscribeCrosshairMove(handler1);
    chart2.subscribeCrosshairMove(handler2);

    return () => {
        chart1.unsubscribeCrosshairMove(handler1);
        chart2.unsubscribeCrosshairMove(handler2);
    };
}

// =========================
// MAIN COMPONENT
// =========================
const Grafics = ({ candlesData = [], rsiData = [] }) => {
    const priceRef = useRef(null);
    const rsiRef = useRef(null);

    const candleSeriesRef = useRef(null);
    const rsiSeriesRef = useRef(null);

    useLayoutEffect(() => {
        if (!priceRef.current || !rsiRef.current) return;

        // =========================
        // PRICE CHART
        // =========================
        const priceChart = createChart(priceRef.current, {
            width: priceRef.current.clientWidth,
            height: 400,
            layout: {
                backgroundColor: '#ffffff',
                textColor: '#333',
            },
            grid: {
                vertLines: { color: '#f0f0f0' },
                horzLines: { color: '#f0f0f0' },
            },
        });

        const candleSeries = priceChart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        candleSeriesRef.current = candleSeries;

        // =========================
        // RSI CHART
        // =========================
        const rsiChart = createChart(rsiRef.current, {
            width: rsiRef.current.clientWidth,
            height: 150,
            layout: {
                backgroundColor: '#ffffff',
                textColor: '#333',
            },
            grid: {
                vertLines: { color: '#f0f0f0' },
                horzLines: { color: '#f0f0f0' },
            },
            timeScale: {
                visible: false,
            },
        });

        const rsiSeries = rsiChart.addLineSeries({
            color: 'purple',
            lineWidth: 2,
        });

        rsiSeriesRef.current = rsiSeries;

        rsiChart.priceScale('right').applyOptions({
            autoScale: false,
            scaleMargins: {
                top: 0.1,
                bottom: 0.1,
            },
        });

        [20, 80].forEach(val => {
            rsiSeries.createPriceLine({
                price: val,
                color: 'red',
                lineWidth: 1,
                lineStyle: 2,
                axisLabelVisible: true,
                title: val === 80 ? 'OB' : 'OS',
            });
        });

        // =========================
        // SYNC
        // =========================
        const unsync1 = syncCharts(priceChart, rsiChart);
        const unsync2 = syncCrosshair(priceChart, rsiChart);

        // =========================
        // RESIZE
        // =========================
        const handleResize = () => {
            if (!priceRef.current) return;
            const width = priceRef.current.clientWidth;

            priceChart.applyOptions({ width });
            rsiChart.applyOptions({ width });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            unsync1();
            unsync2();
            priceChart.remove();
            rsiChart.remove();
        };
    }, []);

    // =========================
    // SAFE DATA UPDATE
    // =========================
    /*useEffect(() => {
        if (!candleSeriesRef.current) return;
        if (!Array.isArray(candlesData)) return;
        if (candlesData.length === 0) return;

        const safe = candlesData.filter(c =>
            c &&
            Number.isFinite(c.time) &&
            Number.isFinite(c.open) &&
            Number.isFinite(c.high) &&
            Number.isFinite(c.low) &&
            Number.isFinite(c.close)
        );

        if (safe.length > 0) {
            candleSeriesRef.current.setData(safe);
        }
    }, [candlesData]);*/

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8082/ws/signals');
        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            if (msg.type !== "CANDLE") return; // отбрасываем SIGNAL и другие типы сообщений

            // ВАЖНО: Проверьте названия полей, которые шлет ваша Java (candle.getClose() и т.д.)
            // Если Java шлет объект Candle, приводим его к формату Lightweight Charts
            const newCandle = {
                time: msg.openTime / 1000, // Конвертируем в секунды
                open: parseFloat(msg.open),
                high: parseFloat(msg.high),
                low: parseFloat(msg.low),
                close: parseFloat(msg.close),
            };

            // Обновляем серию (метод update либо добавит новую свечу, либо обновит текущую)
            if (candleSeriesRef.current) {
                candleSeriesRef.current.update(newCandle);
            }
        };

        return () => socket.close();
    }, []);

    useEffect(() => {
        if (!rsiSeriesRef.current) return;
        if (!Array.isArray(rsiData)) return;

        const safe = rsiData.filter(r =>
            r &&
            Number.isFinite(r.time) &&
            Number.isFinite(r.value)
        );

        if (safe.length > 0) {
            rsiSeriesRef.current.setData(safe);
        }
    }, [rsiData]);

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '10px', border: '1px solid #eee' }}>
                <div ref={priceRef} />
            </div>
            <div style={{ border: '1px solid #eee' }}>
                <div ref={rsiRef} />
            </div>
        </div>
    );
};

export default Grafics;