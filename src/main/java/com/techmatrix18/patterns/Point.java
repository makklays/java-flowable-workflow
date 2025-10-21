package com.techmatrix18.patterns;

import java.awt.*;

public class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Object))
            return false;

        Point p = (Point) o;
        return p.x == x && p.y == y;
    }
    // other code
}

/*public class ColorPoint extends Point {
    private final Color color;
    public ColorPoint(int x, int y, Color color) {
        super(x, y);
        this.color = color;
    }
    // other code

    // Типичный метод hashCode
    @Override
    public int hashCode() {
        int result = Short.hashCode(x);
        result = 31 * result + Short.hashCode(y);
        result = 31 * result + Short.hashCode(color);
        return result;
    }
}

Point р = new Point(1, 2);
ColorPoint ср = new ColorPoint(1, 2, Color.RED);
*/

// Float.compare (float, float)
// Double.compare (double, double)
// hashCode() {
//     result = 31 * result + с;
// }

