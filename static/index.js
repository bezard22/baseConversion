import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function clearAll() {
    d3.select("#d2bExp").selectAll("p").remove();
    d3.select("#d2hExp").selectAll("p").remove();
    d3.select("#d2bIn").property("value", "");
    d3.select("#d2hIn").property("value", "");
    d3.select("#b2dIn").property("value", "");
}

function d2b() {
    // get input
    const input = d3.select("#d2bIn").property("value");
    
    // clear current output and explanation
    d3.select("#d2bOut").text("");
    d3.select("#d2bExp").selectAll("p").remove();
    
    if (input.length > 0) {
        // calculate and set output
        const output = Number(input).toString(2);
        d3.select("#d2bOut").text(output);
        
        // set explanation
        const exp = d3.select("#d2bExp");
        exp.attr("style", `width: ${100 + input.length*10}px;`);
        exp.append("p").classed("d2bExpStr", true).attr("style", "width: 1000px;")
        exp.select(".d2bExpStr")
            .append("span")
            .classed("decimal", true)
            .text(`${input}`);
        exp.select(".d2bExpStr")
            .append("span")
            .text(" = ");
        let expStr = "";
        for (let i = output.length - 1; i >= 0; i--) {
            const curVal = parseInt(output[output.length - 1 - i], 2) * Math.pow(2, i);
            expStr += curVal.toString() + " + ";
            const expLine = exp.append("p").classed("expLine", true);
            expLine.append("span")
                .classed("decimal", true)
                .attr("style", `width: ${input.length*10}px;`)
                .text(`${curVal}`);
            expLine
                .append("span")
                .text(`= 2^${i} *`);
            expLine.append("span")
                .classed("binary", true)
                .text(`${output[output.length - 1 -i]}`);
        }
        expStr = expStr.slice(0, expStr.length - 3);
        exp.select(".d2bExpStr").append("span").text(expStr)
    }
    
}

function d2h() {
    // get input
    const input = d3.select("#d2hIn").property("value");
    
    // clear current output and explanation
    d3.select("#d2hOut").text("");
    d3.select("#d2hExp").selectAll("p").remove();
    
    if (input.length > 0) {
        // calculate and set output
        const output = Number(input).toString(16);
        d3.select("#d2hOut").text(output);
        
        // set explanation
        const exp = d3.select("#d2hExp");
        exp.attr("style", `width: ${100 + input.length*10}px;`);
        exp.append("p").classed("d2hExpStr", true).attr("style", "width: 1000px;")
        exp.select(".d2hExpStr")
            .append("span")
            .classed("decimal", true)
            .text(`${input}`);
        exp.select(".d2hExpStr")
            .append("span")
            .text(" = ");
        let expStr = "";
        for (let i = output.length - 1; i >= 0; i--) {
            const curVal = parseInt(output[output.length - 1 - i], 16) * Math.pow(16, i);
            expStr += curVal.toString() + " + ";
            const expLine = exp.append("p").classed("expLine", true);
            expLine.append("span")
                .classed("decimal", true)
                .attr("style", `width: ${input.length*10}px;`)
                .text(`${curVal}`);
            expLine
                .append("span")
                .text(`= 16^${i} *`);
            expLine.append("span")
                .classed("hex", true)
                .text(`${output[output.length - 1 -i]}`);
        }
        expStr = expStr.slice(0, expStr.length - 3);
        exp.select(".d2hExpStr").append("span").text(expStr)
    }
    
}

function b2d() {
    clearExp();
    const input = d3.select("#b2dIn")
        .property("value");
    const output = parseInt(input, 2);
    let expStr = ""
    for (let i = 0; i < input.length; i++) {
        expStr += `${input[i]} * 2^${input.length-1-i} = ${input[i] == "1" ? Math.pow(2, input.length-1-i): 0}\n`;
    }
    expStr += "     +___\n"
    expStr += `       ${output}`
    d3.select("#b2dExp").text(expStr);
    
    d3.select("#b2dOut")
        .text(output);
}

clearAll();

// Event handlers
var input = document.getElementById("d2bIn");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        d2b();
    }
});

var input = document.getElementById("d2hIn");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        d2h();
    }
});

var input = document.getElementById("b2dIn");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        b2d();
    }
});
window.d2b = d2b;
window.d2h = d2h;
window.b2d = b2d;
window.clearAll = clearAll;