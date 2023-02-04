import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const bases = {
    2: "Binary",
    10: "Decimal",
    16: "Hexadecimal"
}

function clearAll() {
    d3.select("#preBase").property("value", 10);
    d3.select("#postBase").property("value", 2);
    preBaseSelection();
    postBaseSelection();
    d3.select("#inp").property("value", "");
    d3.select("#out").property("value", "");
    d3.selectAll("#exp p").remove();
}

// generate explanation section
function explanation(inpVal, outVal, postBase){
    const exp = d3.select("#exp");
    const expValLen = inpVal.length*10;

    // set explanation
    const expEl = exp.append("p")
        .classed("expStr", true)
        .attr("style", "width: 1000px;")
    expEl.append("span")
        .classed("Decimal", true)
        .text(inpVal);
    expEl.append("span")
        .text("=");
    for (let i = outVal.length - 1; i >= 0; i--) {
        const curVal = parseInt(outVal[outVal.length - 1 - i], postBase) * Math.pow(postBase, i);
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
        const expMidSpan = expLine.append("span");
        expMidSpan.append("span")
            .text("=");
        expMidSpan.append("span")
            .classed("Decimal", true)
            .text(postBase);
        expMidSpan.append("span")
            .text("^");
        expMidSpan.append("span")
            .classed("Decimal", true)
            .text(i);
        expMidSpan.append("span")
            .text("*");
        expLine.append("span")
            .classed(bases[postBase], true)
            .text(`${outVal[outVal.length - 1 -i]}`);
    }
    expEl.select("span:last-of-type ").remove()
}

// perfrom conversion and update document
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
        // calculate output
        const outVal = parseInt(inpVal, preBase).toString(postBase);        
        const expValLen = inpVal.length*10;

        // set output
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
        
        // set explanation
        exp.attr("style", `width: ${100 + expValLen}px;`);
        exp.append("p")
            .text("Explanation:")
        if (preBase != 10 && postBase != 10) {
            explanation(parseInt(inpVal, preBase).toString(10), inpVal, preBase);
            explanation(parseInt(inpVal, preBase).toString(10), outVal, postBase);
        } else if (postBase == 10) {
            explanation(parseInt(inpVal, preBase).toString(10), inpVal, preBase);
        } else {
            explanation(inpVal, outVal, postBase);
        }
    }
}

// preBase event handler
function preBaseSelection() {
    const preBase = d3.select("#preBase");
    const input = d3.select("#inp");
    input.property("value", "");
    if (preBase.property("value") == 2) {
        preBase.attr("class", "Binary");
        input.attr("class", "Binary");
    } else if (preBase.property("value") == 10) {
        preBase.attr("class", "Decimal");
        input.attr("class", "Decimal");
    } else if (preBase.property("value") == 16) {
        preBase.attr("class", "Hexadecimal");
        input.attr("class", "Hexadecimal");
    } 
}

// postBase event handler
function postBaseSelection() {
    const postBase = d3.select("#postBase");
    console.log(postBase.property("value"))
    if (postBase.property("value") == 2) {
        postBase.attr("class", "Binary");
    } else if (postBase.property("value") == 10) {
        postBase.attr("class", "Decimal");
    } else if (postBase.property("value") == 16) {
        postBase.attr("class", "Hexadecimal");
    } 
}

// Input event handlers
var input = document.querySelector("#inp");
input.addEventListener("keypress", function(event) {
    const preBase = d3.select("#preBase").property("value");
    if (event.key === "Enter") {
        event.preventDefault();
        convert();
    } else if (preBase == 10 && (event.key < '0' || event.key > '9')) {
        event.preventDefault();
    } else if (preBase == 2 && (event.key < '0' || event.key > '1')) {
        event.preventDefault();
    } else if (preBase == 16 && (event.key < '0' || event.key > '9') && (event.key < 'a' || event.key > 'f') && (event.key < 'A' || event.key > 'F')) {
        event.preventDefault();
    }
});

clearAll();
window.convert = convert;
window.postBaseSelection = postBaseSelection;
window.preBaseSelection = preBaseSelection;