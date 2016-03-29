'use strict';

/**
 * @ngdoc service
 * @name platsoApp.svg
 * @description
 * # auth
 * Factory in the platsoApp.
 */
angular.module('platsoApp')
    .factory('svgIQ', ['$sce',
    function ($sce) {
            var self = this;

            function init() {
                console.log(Snap);
            };

            var main = function (chartType, specifications) {
                return $sce.trustAsHtml('' + self.setup(chartType, specifications));
            };

            self.setup = function (chartType, specifications) {
                return self[chartType](specifications);
            };

            self.bigBalls = function (specifications) {
                console.log("bigBalls");
                var list, svg, centerX, centerY, width, height, xpad, ypad,
                    iconHolderRadius, totalValue, totalLength, maxWidthAllowed,
                    valueHolderAttr, iconHolderAttr, lineAttr, labelAttr,
                    background, foreground;
                var svgHeight = specifications.canvas.height;
                var svgWidth = specifications.canvas.width;
                xpad = specifications.canvas.xpad;
                ypad = specifications.canvas.ypad;
                list = specifications.objects;
                iconHolderRadius = specifications.iconHolder.radius;
                valueHolderAttr = specifications.valueHolder.specs;
                iconHolderAttr = specifications.iconHolder.specs;
                labelAttr = specifications.label.specs;
                lineAttr = specifications.line.specs;
                totalLength = xpad * 2;
                totalValue = _.reduce(list, function (aggregated, iteratee) {
                    return aggregated + iteratee.value;
                }, 0);

                svg = Snap(svgWidth, svgHeight);
                height = svg.node.clientHeight;
                width = svg.node.clientWidth;
                console.log("snap.svg", height, width);
                svg.attr({
                    viewBox: '0 0 ' + width + ' ' + height
                })
                centerY = height / 2.5;
                centerX = width / 2;
                maxWidthAllowed = (width - (xpad * (list.length + 2))) / 2.1;

                //                resultElement = svg.group();
                background = svg.rect(0, 0, width, height).attr({
                    fill: specifications.backdrop.background
                });
                foreground = svg.polygon([width, 0, 0, 0, centerX, centerY]).attr({
                    fill: specifications.backdrop.foreground
                });
                //                resultElement.add([background, foreground]);
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
                    labelAttr.fontSize = radius - 2;
                    text = svg.text(xpos - (radius / 1.3), ypos + (radius / 3), object.value)
                        .attr(labelAttr);
                    iconHolder = svg.circle(xpos, ypad - radius - iconHolderRadius, iconHolderRadius)
                        .attr(iconHolderAttr);
                    icon = svg.image(object.icon, xpos - (iconHolderRadius / 2),
                        ypad - radius - (iconHolderRadius * 1.5), iconHolderRadius, iconHolderRadius);
                    //group them as one and insert the snap group object and the node in the list
                    object.element = svg.group();
                    object.element.add([lineVert, valueHolder, text, iconHolder, icon]);
                    object.node = object.element.node;
                    //                    resultElement.add(object.element);
                });
                if (specifications.specs.elem)
                    document.getElementById(specifications.specs.elem).appendChild(svg.node);
                return svg.node;
            };

            return {
                makeChart: main
            }
    }]);
