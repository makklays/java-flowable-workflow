package com.techmatrix18.patterns;

import java.util.Set;

/**
 * EnumSet - modern realization of enum pattern in Java
 *
 * @author Alexander Kuziv
 * @since 04.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class TextEnumSet {

    public enum Style { BOLD, ITALIC, UNDERLINE, STRIKETHROUGH, HIGHLIGHT }

    // Можно передать любой набор стилей Set, но EnumSet более эффективен
    public void applyStyles(Set<Style> styles) {
        //
    }
}

// text.applyStyles(EnumSet.of(Style.BOLD, Style.UNDERLINE));

