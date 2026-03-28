package com.techmatrix18.delegate.order;

import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

/**
 * Ship Order Delegate -
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 28.03.2026
 * @version 0.0.1
 */
@Component("shipOrderDelegate")
public class ShipOrderDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("🚢 Заказ успешно отгружен со склада!");
    }
}

