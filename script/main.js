var specifications = {
    canvas: {
        height: 300,
        width: 800,
        elem: 'svgBody'
    },
    specs: {
        xpad: 10,
        ypad: 150
    },
    objects: [
        {
            value: 51,
            label: ''
        },
        {
            value: 10,
            label: ''
        },
        {
            value: 10,
            label: ''
        },
        {
            value: 10,
            label: ''
        },
        {
            value: 10,
            label: ''
        },
        {
            value: 25,
            label: ''
        },
        {
            value: 25,
            label: ''
        },
        {
            value: 25,
            label: ''
        },
        {
            value: 50,
            label: ''
            }, {
            value: 30,
            label: ''
            }],
    colors: {
        triangle: "#fdfdcb",
        background: "#fcfdd5",
        valueHolder: '#cd3333'
    }

};

function testObject(specifications) {
    var svg, centerX, centerY, width, height, xpad, ypad;
    height = specifications.canvas.height;
    width = specifications.canvas.width;
    xpad = specifications.specs.xpad;
    ypad = specifications.specs.ypad;
    centerY = height / 2.5;
    centerX = width / 2;

    svg = Snap(width, height);
    svg.rect(0, 0, width, height).attr({
        fill: specifications.colors.background
    });
    svg.polygon([width, 0, 0, 0, centerX, centerY]).attr({
        fill: specifications.colors.triangle
    });

    var list = specifications.objects;
    //    var pixelRatio = 30;
    var totalValue = _.reduce(list, function (aggregated, iteratee) {
        return aggregated + iteratee.value;
    }, 0);
    var maxWidthAllowed = (width - (xpad * (list.length + 2))) / 2.1;
    var pixelRatio = Math.ceil((specifications.canvas.width) / (totalValue));
    console.log("pixelRatio", pixelRatio, "totalValue", totalValue);
    var totalLength = xpad * 2;
    _.each(list, function (object, index) {
        var radius, xpos, ypos, valueHolder, totalLengthLine, lineVert, xposLine;
        radius = (object.value / totalValue) * maxWidthAllowed;
        xpos = totalLength + (radius) + (xpad);
        totalLength += (radius * 2) + (xpad);
        object.svg = {};
        ypos = (ypad) + (Math.random() * 100) % (height - 40);
        //        ypos = 200 + 40 * (index + 1);
        lineVert = svg.line(xpos, ypad - 100, xpos, ypos).attr({
            //            stroke: specifications.colors.valueHolder,
            stroke: 'green',
            strokeWidth: '2px'
        });
        valueHolder = svg.circle(xpos, ypos, radius).attr({
            fill: object.valueHolderColor ? object.valueHolderColor : specifications.colors.valueHolder
        });
        //        totalLengthLine = svg.line(0, ypos, totalLength, ypos).attr({
        //            stroke: 'green',
        //            strokeWidth: '2px'
        //        });
        //        xposLine = svg.line(0, ypos - 5, xpos, ypos - 5).attr({
        //            strokeWidth: '1px',
        //            stroke: 'black'
        //        });        object.svg.valueHolder = valueHolder;
        //        console.log(index, "radius", radius, "value", object.value, "xpos", xpos, "totalLength", totalLength);
        console.log("ypad", ypad, "ypos", ypos);
    });
    console.log(list);
    document.getElementById(specifications.canvas.elem).appendChild(svg.node);
}

testObject(specifications);
