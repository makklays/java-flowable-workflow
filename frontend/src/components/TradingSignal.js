import React from 'react';
import GaugeChart from 'react-gauge-chart';

const TradingSignal = ({ probability }) => {
    // probability — число от 0 до 1 (например, 0.75 для 75%)

    return (
        <div style={{ width: '100%', textAlign: 'center', fontFamily: 'Arial' }}>
            {/*<h3>Вероятность успеха сделки</h3>*/}
            <GaugeChart
                id="trading-gauge"
                nrOfLevels={3} // Делим на 3 зоны: Продавать, Ждать, Покупать
                arcsLength={[0.2, 0.6, 0.2]} // 20% для "Продавать", 60% для "Ждать", 20% для "Покупать"
                colors={["#dc3545", "#ffc107", "#198754"]} // Красный, Желтый, Синий/Зеленый
                arcWidth={0.3}
                percent={probability}
                formatTextValue={val => val + '%'}
                textColor="#333"
            />
            <div style={{ marginTop: '-20px', fontWeight: 'bold', fontSize: '20px' }} >
                {probability > 0.8 ? "🚀 ПОКУПАТЬ" : probability < 0.2 ? "⚠️ ПРОДАВАТЬ" : "⌛ ЖДАТЬ"}
            </div>
        </div>
    );
};

export default TradingSignal;

