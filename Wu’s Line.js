function fpart(x) {
    return x - Math.floor(x);
}

function rfpart(x) {
    return 1 - fpart(x);
}

function drawLineWu(x0, y0, x1, y1, plot) {
    let steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);

    if (steep) {
        [x0, y0] = [y0, x0];
        [x1, y1] = [y1, x1];
    }

    if (x0 > x1) {
        [x0, x1] = [x1, x0];
        [y0, y1] = [y1, y0];
    }

    let dx = x1 - x0;
    let dy = y1 - y0;
    let gradient = dy / dx;

    // First endpoint
    let xend = Math.round(x0);
    let yend = y0 + gradient * (xend - x0);
    let xgap = rfpart(x0 + 0.5);
    let xpxl1 = xend;
    let ypxl1 = Math.floor(yend);

    if (steep) {
        plot(ypxl1, xpxl1, rfpart(yend) * xgap);
        plot(ypxl1 + 1, xpxl1, fpart(yend) * xgap);
    } else {
        plot(xpxl1, ypxl1, rfpart(yend) * xgap);
        plot(xpxl1, ypxl1 + 1, fpart(yend) * xgap);
    }

    let intery = yend + gradient;

    // Second endpoint
    xend = Math.round(x1);
    yend = y1 + gradient * (xend - x1);
    xgap = fpart(x1 + 0.5);
    let xpxl2 = xend;
    let ypxl2 = Math.floor(yend);

    if (steep) {
        plot(ypxl2, xpxl2, rfpart(yend) * xgap);
        plot(ypxl2 + 1, xpxl2, fpart(yend) * xgap);
    } else {
        plot(xpxl2, ypxl2, rfpart(yend) * xgap);
        plot(xpxl2, ypxl2 + 1, fpart(yend) * xgap);
    }

    // Main loop
    if (steep) {
        for (let x = xpxl1 + 1; x < xpxl2; x++) {
            plot(Math.floor(intery), x, rfpart(intery));
            plot(Math.floor(intery) + 1, x, fpart(intery));
            intery += gradient;
        }
    } else {
        for (let x = xpxl1 + 1; x < xpxl2; x++) {
            plot(x, Math.floor(intery), rfpart(intery));
            plot(x, Math.floor(intery) + 1, fpart(intery));
            intery += gradient;
        }
    }
}
