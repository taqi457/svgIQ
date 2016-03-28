var specifications = {
    canvas: {
        height: 300,
        width: 800,
        elem: 'svgBody'
    },
    specs: {
        xpad: 15,
        ypad: 150,
        iconHolderRadius: 18
    },
    objects: [
        {
            value: 510,
            icon: 'https://g.twimg.com/Twitter_logo_blue.png'
        },
        {
            value: 100,
            icon: ''
        },
        {
            value: 100,
            icon: ''
        },
        {
            value: 100,
            icon: ''
        },
        {
            value: 100,
            icon: ''
        },
        {
            value: 250,
            icon: ''
        },
        {
            value: 250,
            icon: ''
        },
        {
            value: 250,
            icon: ''
        },
        {
            value: 501,
            icon: ''
            },
        {
            value: 301,
            icon: ''
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
    var svg, centerX, centerY, width, height, xpad, ypad, iconHolderRadius;
    height = specifications.canvas.height;
    width = specifications.canvas.width;
    xpad = specifications.specs.xpad;
    ypad = specifications.specs.ypad;
    centerY = height / 2.5;
    centerX = width / 2;
    iconHolderRadius = specifications.specs.iconHolderRadius;

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
        var radius, xpos, ypos, valueHolder, totalLengthLine, lineVert, xposLine, iconHolder, text, icon;
        radius = Math.floor((object.value / totalValue) * maxWidthAllowed);
        xpos = totalLength + (radius) + (xpad);
        totalLength += (radius * 2) + (xpad);
        object.svg = {};
        ypos = (ypad) + Math.ceil((Math.random() * 10) + 20);
        lineVert = svg.line(xpos, ypad - radius - iconHolderRadius, xpos, ypos).attr({
            stroke: specifications.colors.valueHolder,
            strokeWidth: '2px'
        });
        valueHolder = svg.circle(xpos, ypos, radius).attr({
            fill: object.valueHolderColor ? object.valueHolderColor : specifications.colors.valueHolder
        });
        text = svg.text(xpos - (radius / 1.4), ypos + (radius / 3), object.value).attr({
            fill: 'white',
            fontSize: radius
        });
        iconHolder = svg.circle(xpos, ypad - radius - iconHolderRadius, iconHolderRadius).attr({
            fill: object.valueHolderColor ? object.iconHolderColor : specifications.colors.iconHolder
        });
        icon = svg.image(object.icon, xpos - (iconHolderRadius / 2), ypad - radius - (iconHolderRadius * 1.5), iconHolderRadius, iconHolderRadius);
        console.log(index, "radius", radius, "value", object.value, "xpos", xpos, "totalLength", totalLength);
        console.log("ypad", ypad, "ypos", ypos);
    });
    document.getElementById(specifications.canvas.elem).appendChild(svg.node);
}

testObject(specifications);
