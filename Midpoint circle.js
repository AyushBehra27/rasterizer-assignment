function drawCircleMidpoint(xc, yc, r, plot) {
    let x = 0;
    let y = r;
    let d = 1 - r;

    function plotCirclePoints(xc, yc, x, y) {
        plot(xc + x, yc + y);
        plot(xc - x, yc + y);
        plot(xc + x, yc - y);
        plot(xc - x, yc - y);
        plot(xc + y, yc + x);
        plot(xc - y, yc + x);
        plot(xc + y, yc - x);
        plot(xc - y, yc - x);
    }

    plotCirclePoints(xc, yc, x, y);

    while (x < y) {
        x++;

        if (d < 0) {
            d += 2 * x + 1;
        } else {
            y--;
            d += 2 * (x - y) + 1;
        }

        plotCirclePoints(xc, yc, x, y);
    }
}
