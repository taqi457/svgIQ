var specifications = {
    canvas: {
        height: 300,
        width: 800,
        xpad: 15,
        ypad: 150
    },
    specs: {
        elem: 'svgBody'
    },
    iconHolder: {
        specs: {
            fill: 'black'
        },
        radius: 18,
        eventHandlers: {
            onClick: function (context, event) {},
            onHover: function (context, event) {}
        }
    },
    valueHolder: {
        specs: {
            fill: '#cd3333',
        },
        eventHandlers: {
            onClick: function (context, event) {},
            onHover: function (context, event) {}
        }
    },
    line: {
        specs: {
            stroke: '#cd3333',
            strokeWidth: '2px'
        },
        eventHandlers: {
            onClick: function (context, event) {},
            onHover: function (context, event) {}
        }
    },
    label: {
        specs: {
            fill: 'white',
            fontFamily: 'Arial'
        }
    },
    objects: [
        {
            value: 510,
            icon: 'https://g.twimg.com/Twitter_logo_blue.png',
        },
        {
            value: 100,
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
    backdrop: {
        foreground: "#fdfdcb",
        background: "#fcfdd5",
    }

};

function testObject(specifications) {
    var list, svg, centerX, centerY, width, height, xpad, ypad,
        iconHolderRadius, totalValue, totalLength, maxWidthAllowed,
        valueHolderAttr, iconHolderAttr, lineAttr, labelAttr, resultElement,
        background, foreground;
    height = specifications.canvas.height;
    width = specifications.canvas.width;
    xpad = specifications.canvas.xpad;
    ypad = specifications.canvas.ypad;
    list = specifications.objects;
    iconHolderRadius = specifications.iconHolder.radius;
    valueHolderAttr = specifications.valueHolder.specs;
    iconHolderAttr = specifications.iconHolder.specs;
    labelAttr = specifications.label.specs;
    lineAttr = specifications.line.specs;
    centerY = height / 2.5;
    centerX = width / 2;
    totalLength = xpad * 2;
    totalValue = _.reduce(list, function (aggregated, iteratee) {
        return aggregated + iteratee.value;
    }, 0);
    maxWidthAllowed = (width - (xpad * (list.length + 2))) / 2.1;

    svg = Snap(width, height);
    resultElement = svg.group();
    background = svg.rect(0, 0, width, height).attr({
        fill: specifications.backdrop.background
    });
    foreground = svg.polygon([width, 0, 0, 0, centerX, centerY]).attr({
        fill: specifications.backdrop.foreground
    });
    resultElement.add([background, foreground]);
    //let the loop begin
    _.each(list, function (object, index) {
        var radius, xpos, ypos, valueHolder, totalLengthLine, lineVert, xposLine, iconHolder, text, icon, group, iconHolderColor, valueHolderColor;
        radius = Math.floor((object.value / totalValue) * maxWidthAllowed);
        xpos = totalLength + (radius) + (xpad);
        totalLength += (radius * 2) + (xpad);
        ypos = (ypad) + Math.ceil((Math.random() * 10) + 20);

        //let the drawing begin!
        lineVert = svg.line(xpos, ypad - radius - iconHolderRadius, xpos, ypos)
            .attr(lineAttr);
        valueHolder = svg.circle(xpos, ypos, radius).attr(valueHolderAttr);
        labelAttr.fontSize = radius - 1;
        text = svg.text(xpos - (radius / 1.4), ypos + (radius / 3), object.value)
            .attr(labelAttr);
        iconHolder = svg.circle(xpos, ypad - radius - iconHolderRadius, iconHolderRadius)
            .attr(iconHolderAttr);
        icon = svg.image(object.icon, xpos - (iconHolderRadius / 2),
            ypad - radius - (iconHolderRadius * 1.5), iconHolderRadius, iconHolderRadius);
        //group them as one and insert the snap group object and the node in the list
        object.element = svg.group();
        object.element.add([lineVert, valueHolder, text, iconHolder, icon]);
        object.node = object.element.node;
        resultElement.add(object.element);
    });
    console.log(resultElement);
    document.getElementById(specifications.specs.elem).appendChild(svg.node);
}

testObject(specifications);
