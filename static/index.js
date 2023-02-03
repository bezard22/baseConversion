import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const bases = {
    2: "Binary",
    10: "Decimal",
    16: "Hexadecimal"
}

function clearAll() {
    d3.select("#preBase").property("value", 10);
    d3.select("#postBase").property("value", 2);
    d3.select("#inp").property("value", "");
    d3.select("#out").property("value", "");
    d3.selectAll("#exp p").remove();
}

function explanation(inpVal, outVal, preBase, postBase){
    const exp = d3.select("#exp");
    const outValDec = parseInt(inpVal, preBase).toString(10);
    const expValLen = inpVal.length*10;

    // set explanation
    exp.attr("style", `width: ${100 + expValLen}px;`);
    exp.append("p")
        .text("Explanation:")
    const expEl = exp.append("p")
        .classed("expStr", true)
        .attr("style", "width: 1000px;")
    expEl.append("span")
        .classed("Decimal", true)
        .text(outValDec);
    expEl.append("span")
        .text("=");
    for (let i = outVal.length - 1; i >= 0; i--) {
        const curVal = parseInt(outVal[outVal.length - 1 - i], postBase) * Math.pow(postBase, i);
        // expStr += `${curVal.toString()}+`;
        expEl.append("span")
            .classed("Decimal", true)
            .text(curVal);
        expEl.append("span")
            .text("+");
        const expLine = exp.append("p")
            .classed("expLine", true);
        expLine.append("span")
            .classed("Decimal", true)
            .attr("style", `width: ${expValLen}px;`)
            .text(curVal);
        expLine.append("span")
            .text(`= ${postBase}^${i} *`);
        expLine.append("span")
            .classed(bases[postBase], true)
            .text(`${outVal[outVal.length - 1 -i]}`);
    }
}

function convert() {
    // get elements and values
    const preBase = d3.select("#preBase").property("value");
    const postBase = d3.select("#postBase").property("value");
    const inp = d3.select("#inp");
    const out = d3.select("#out");
    const exp = d3.select("#exp");
    const inpVal = inp.property("value");

    // clear current input and explanation
    out.selectAll("p").remove();
    exp.selectAll("p").remove();

    if (inpVal.length > 0) {
        // calculate and set output
        const outVal = parseInt(inpVal, preBase).toString(postBase);
        
        const expValLen = inpVal.length*10;

        const outPreEl = out.append("p")
            .classed(bases[preBase], true)
        outPreEl.append("span")
            .attr("style", "width: 120px;")
            .text(`${bases[preBase]}:`)
        outPreEl.append("span")
            .text(`${inpVal}`)
        const outPostEl = out.append("p")
            .classed(bases[postBase], true)
        outPostEl.append("span")
        .attr("style", "width: 120px;")
            .text(`${bases[postBase]}:`)
        outPostEl.append("span")
            .text(`${outVal}`)
        
        if (preBase != 10) {
            explanation(parseInt(inpVal, preBase).toString(10), inpVal, 10, preBase);
            explanation((inpVal, preBase).toString(10), outVal, 10, postBase);
        } else {
            explanation(inpVal, outVal, preBase, postBase);
        }
    }
}

// Event handlers
var input = document.querySelector("#inp");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        convert();
    }
});

clearAll();
window.convert = convert;