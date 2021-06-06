// Global Selected Color Variable
var selectedColor = "";

const world = [
    [ 5, 4, 6, 4, 3, 4, 4, 8, 4, 3, 4, 4, 6, 5, 4, 4], 
    [ 3, 4, 4, 6, 5, 6, 4, 3, 6, 4, 3, 3, 4, 8, 3, 6], 
    [ 4, 4, 4, 6, 4, 3, 3, 4, 3, 4, 6, 4, 6, 3, 4, 6], 
    [ 6, 4, 6, 3, 8, 3, 3, 3, 6, 4, 5, 3, 6, 6, 3, 3], 
    [ 3, 3, 3, 3, 5, 3, 3, 4, 4, 4, 3, 4, 3, 6, 6, 6], 
    [ 8, 3, 7, 6, 6, 3, 6, 3, 3, 3, 6, 3, 3, 3, 3, 3], 
    [ 6, 7, 7, 3, 3, 3, 3, 6, 3, 6, 5, 3, 3, 4, 6, 3], 
    [ 7, 7, 8, 3, 6, 3, 3, 4, 3, 4, 3, 3, 6, 9, 3, 7], 
    [ 8,10, 3, 7, 7, 6, 7, 6, 3, 5, 3, 8, 7, 4, 6, 1], 
    [ 6, 9, 7, 8, 7, 3, 7, 7, 6, 7, 6, 4, 3, 6, 7, 1], 
    [ 8, 7, 9, 1, 1, 1, 2, 7, 8, 9, 7, 8, 6, 8,10, 7], 
    [ 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [ 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [ 6, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [ 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [ 3, 9,10, 1, 1, 1, 2, 7, 8, 7, 8, 1, 1, 1, 1, 1]
];

const colors = [
    "",
    "white", 
    "dark-blue", 
    "medium-azure", 
    "dark-turquoise", 
    "bright-green", 
    "lime", 
    "tan", 
    "bright-light-orange", 
    "orange", 
    "coral"
];

// Insert Grid Cells
function addCells() {
    var counter = 0;
    while (counter < 10240) { // 128 x 80
        let x = counter % 128;
        let y = (counter / 128) >> 0;
        let colorIndex = (y < world.length && x < world[y].length) ? world[y][x] : 0;
        let color = colors[colorIndex];
        let type = (colorIndex === 1 || colorIndex === 2) ? "land" : "water";
        $("#canvas").append(`<div class='cell ${color}' data-x='${x}' data-y='${y}' data-color='${color}' data-type='${type}'></div>`);
        counter++;
    }
    setCounters();
}

addCells();

$("#color-choices")
    .children(".color-button")
    .click(function () {
        setSelectedColor($(this).attr("id"),  $(this));
    });

$(".cell").click(function () {
    if (!selectedColor) return;
    $(this).attr("class",  `cell ${selectedColor}`);
    setCounters();
});

$("#clear").click(function () {
    setSelectedColor("");
    $(".cell").each(function() {
        let color = $(this).data("color");
        $(this).attr("class",  `cell ${color}`);
    });
    setCounters();
});

$("#fill").click(function () {
    if (!selectedColor) return;
    $(".cell").each(function() {
        let type = $(this).data("type");
        if (type === "water") {
            $(this).attr("class",  `cell ${selectedColor}`);
        }
    });
    setCounters();
});

function setSelectedColor(colorClass,  element) {
    selectedColor = colorClass;
    $("#color-choices").children().removeClass("selected");
    if (selectedColor) {
        element.addClass("selected");
        $("#fill").attr("class",  `action-button ${colorClass}`);
        //setCursor(colorClass);
    }
    else {
        $("#fill").attr("class",  "action-button");
        //document.body.style.cursor = "default";
    }
}

function setCounters() {
    $("#color-counters div").each(function() {
        let color = $(this).attr("class");
        let max = $(this).data("max");
        let count = $(`.cell.${color}`).length;
        $(this).html(`${count}/${max}`);
    });
}

// const colors = {
//     "white": "white", 
//     "dark-blue": "#0a3463", 
//     "medium-azure": "#36aebf", 
//     "dark-turquoise": "#008f9b", 
//     "bright-green": "#4b9f4a", 
//     "lime": "#bbe90b", 
//     "tan": "#e4cd9e", 
//     "bright-light-orange": "#f8bb3d", 
//     "orange": "#fe8a18", 
//     "coral": "#ff698f", 
//     "clear-cell": "black", 
// }

// function setCursor(colorClass) {

//     // create off-screen canvas
//     var cursor = document.createElement('canvas'), 
//         ctx = cursor.getContext('2d');

//     cursor.width = 16;
//     cursor.height = 16;

//     // draw some shape for sake of demo
//     ctx.strokeStyle = colors[colorClass];

//     ctx.lineWidth = 2;
//     ctx.moveTo(2,  10);
//     ctx.lineTo(2,  2);
//     ctx.lineTo(10,  2);
//     ctx.moveTo(2,  2);
//     ctx.lineTo(30,  30)    
//     ctx.stroke();

//     // set image as cursor (modern browsers can take PNGs as cursor).
//     document.body.style.cursor = 'url(' + cursor.toDataURL() + '),  auto';
// }
