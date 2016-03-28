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
            value: 510,
            label: ''
        },
        {
            value: 100,
            label: ''
        },
        {
            value: 100,
            label: ''
        },
        {
            value: 100,
            label: ''
        },
        {
            value: 100,
            label: ''
        },
        {
            value: 250,
            label: ''
        },
        {
            value: 250,
            label: ''
        },
        {
            value: 250,
            label: ''
        },
        {
            value: 501,
            label: ''
            },
        {
            value: 301,
            label: ''
            }
    ],
    colors: {
        triangle: "#fdfdcb",
        background: "#fcfdd5",
        valueHolder: '#cd3333',
        iconHolder: 'black'
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
    var totalValue = _.reduce(list, function (aggregated, iteratee) {
        return aggregated + iteratee.value;
    }, 0);
    var maxWidthAllowed = (width - (xpad * (list.length + 2))) / 2.1;
    console.log("totalValue", totalValue);
    var totalLength = xpad * 2;
    _.each(list, function (object, index) {
        var radius, xpos, ypos, valueHolder, totalLengthLine, lineVert, xposLine, iconHolder, text;
        radius = Math.floor((object.value / totalValue) * maxWidthAllowed);
        xpos = totalLength + (radius) + (xpad);
        totalLength += (radius * 2) + (xpad);
        object.svg = {};
        ypos = (ypad) + (Math.random() * 100);
        lineVert = svg.line(xpos, ypad - radius, xpos, ypos).attr({
            stroke: specifications.colors.valueHolder,
            strokeWidth: '2px'
        });
        valueHolder = svg.circle(xpos, ypos, radius).attr({
            fill: object.valueHolderColor ? object.valueHolderColor : specifications.colors.valueHolder
        });
        console.log("BBox", valueHolder.getBBox());
        text = svg.text(xpos - (radius / 1.5), ypos + (radius / 3), object.value).attr({
            fill: 'white',
            fontSize: radius
        });
        iconHolder = svg.circle(xpos, ypad - radius, 20).attr({
            fill: object.valueHolderColor ? object.iconHolderColor : specifications.colors.iconHolder
        });
        console.log(index, "radius", radius, "value", object.value, "xpos", xpos, "totalLength", totalLength);
        console.log("ypad", ypad, "ypos", ypos);
    });
    document.getElementById(specifications.canvas.elem).appendChild(svg.node);
}

testObject(specifications);
