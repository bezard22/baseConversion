import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const bases = {
    2: "Binary",
    10: "Decimal",
    16: "Hexadecimal"
}

function clearAll() {
    document.querySelector("#preBase").value = 10;
    document.querySelector("#postBase").value = 2;
    document.querySelector("#inp").value = "";
    document.querySelector("#out").value = "";
    for (el of document.querySelectorAll("#exp p")) { el.remove(); }
}

function convert() {
    // get elements and inputs
    // const preBase = document.querySelector("#preBase").value;
    // const postBase = document.querySelector("#postBase").value;
    // const inp = document.querySelector("#inp");
    // const out = document.querySelector("#out");
    // const exp = document.querySelector("#exp");

    const preBase = d3.select("#preBase").value;
    const postBase = d3.select("#postBase").value;
    const inp = d3.select("#inp");
    const out = d3.select("#out");
    const exp = d3.select("#exp");
    // const inpVal = inp.attr("value");
    console.log(inp);

    // clear current input and explanation
    out.selectAll("p").remove();
    exp.selectAll("p").remove();

    // if (inpVal.length > 0) {
    //     // calculate and set output
    //     const outVal = parseInt(inpVal, preBase).toString(postBase);
    //     // const outPostEl = document.createElement("p");
    //     // outPostEl.setAttribute("class", `${bases[preBase]} expLine`)
    //     // outPostEl.textContent = `${bases[preBase]}: ${inpVal}`;
    //     // out.appendChild(outPostEl);
    //     // const outPreEl = document.createElement("p");
    //     // outPreEl.setAttribute("class", `${bases[postBase]} expLine`)
    //     // outPreEl.textContent = `${bases[postBase]}: ${outVal}`;
    //     // out.appendChild(outPreEl);
        

    //     // // set explanation
    //     // exp.setAttribute("style", `width: ${100 + input.length*10}px;`);
    //     // const expStr = document.createElement("p");
    //     // expStr.setAttribute('class', 'expStr')
    //     // expStr.setAttribute('style', 'width: 1000px')
    //     // exp.appendChild(expStr)
    // }

}

function d2b() {
    // get elementes
    const inp = document.querySelector("#d2bIn");
    const out = document.querySelector("#d2bOut");
    const exp = document.querySelector("#d2bExp");

    const input = inp.value;

    
    // clear current output and explanation
    out.text = "";
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