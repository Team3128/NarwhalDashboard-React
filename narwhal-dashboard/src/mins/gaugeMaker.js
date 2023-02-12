import { RadialGauge, LinearGauge } from "canvas-gauges";

var clear = "rgba(0,0,0,0)";

    function makeGauge(id, size, min, max, major_ticks, minor_ticks, highlights, needle_color, text_color, prog_color, dec, number_size) {
        var gauge = new RadialGauge({ 
            renderTo: id,
            width: size,
            height: size,
            minValue: min,
            maxValue: max,
            majorTicks: major_ticks,
            minorTicks: minor_ticks,
            barProgress: true,

            barWidth: "20%",

            colorPlate: clear,
            colorBorderOuter: clear,
            colorBorderOuterEnd: clear,
            colorBorderMiddle: clear,
            colorBorderMiddleEnd: clear,
            colorBorderInner: clear,
            colorBorderInnerEnd: clear,

            colorBorderShadow: "false",
            colorMajorTicks: text_color,
            colorNumbers: text_color,
            fontNumbersWeight: "700",
            fontNumbersSize: number_size,
            numbersMargin: 0,

            colorValueBoxRect: clear,
            colorValueBoxRectEnd: clear,
            colorValueBoxShadow: clear,
            colorValueTextShadow: clear,
            colorValueBoxBackground: clear,

            fontNumbers: "Open Sans",
            fontValue: "Open Sans",
            fontValueSize: "64",
            valueInt: 1,
            valueDec: dec,
            colorValueText: text_color,
            fontValueWeight: "700",

            colorNeedleShadowDown: clear,
            colorNeedleShadowUp: clear,
            colorNeedle: needle_color,
            colorNeedleEnd: needle_color,
            needleStart: 0,
            needleWidth: 8,
            colorNeedleCircleOuter: needle_color,
            colorNeedleCircleOuterEnd: needle_color,
            colorNeedleCircleInner: needle_color,
            colorNeedleCircleInnerEnd: needle_color,

            colorBarProgress: prog_color,

            highlights: highlights,
            highlightsWidth: 10,

            animation: false
        });

        return gauge;
    }

    function makeBar(id, width, height, min, max, major_ticks, minor_ticks, tick_side, highlights, tick_color, text_color, prog_color, dec, number_size) {
        var bar = new LinearGauge({ 
            renderTo: id,
            width: width,
            height: height,
            minValue: min,
            maxValue: max,
            majorTicks: major_ticks,
            minorTicks: minor_ticks,
            barProgress: true,
            
            tickSide: tick_side,
            numberSide: tick_side,

            barProgress: true,
            barWidth: "30",

            colorPlate: clear,
            colorBorderOuter: clear,
            colorBorderOuterEnd: clear,
            colorBorderMiddle: clear,
            colorBorderMiddleEnd: clear,
            colorBorderInner: clear,
            colorBorderInnerEnd: clear,

            colorValueBoxRect: clear,
            colorValueBoxRectEnd: clear,
            colorValueBoxShadow: clear,
            colorValueTextShadow: clear,
            colorValueBoxBackground: clear,

            colorMajorTicks: tick_color,
            colorMinorTicks: tick_color,

            colorNeedle: clear,
            colorNeedleEnd: clear,

            fontNumbers: "Open Sans",
            fontValue: "Open Sans",
            fontValueSize: "48",
            valueInt: 1,
            valueDec: dec,
            colorValueText: text_color,
            fontValueWeight: "700",

            barBeginCircle: false,

            colorBorderShadow: "false",
            colorNumbers: text_color,
            fontNumbersWeight: "700",
            fontNumbersSize: number_size,
            numbersMargin: 0,

            colorBarProgress: prog_color,

            highlights: highlights,
            highlightsWidth: 10,

            animation: false
        });

        return bar;
    }

    export {makeGauge, makeBar};
    export default makeGauge;