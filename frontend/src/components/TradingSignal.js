import React from 'react';
import GaugeChart from 'react-gauge-chart';

const TradingSignal = ({ probability, id = "trading-gauge" }) => {
    // probability — число от 0 до 1 (например, 0.75 для 75%)

    return (
        <div style={{ width: '100%', textAlign: 'center', fontFamily: 'Arial' }}>
            {/*<h3>Вероятность успеха сделки</h3>*/}
            <GaugeChart
                id={id} // Используем уникальный ID
                nrOfLevels={3}
                arcsLength={[0.2, 0.6, 0.2]}
                colors={["#dc3545", "#ffc107", "#198754"]}
                arcWidth={0.3}
                percent={probability}
                animDelay={0}      // Убирает задержку перед анимацией
                animate={true}     // Включает анимацию перехода
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

