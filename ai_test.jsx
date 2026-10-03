if (documents.length == 0) {
    alert("There are no documents open.");
}
else {
    var loDoc = app.activeDocument;

    // var laLayers = loDoc.layers;
    //var laSubLayers = loDoc.sublayers;

    lcPath = loDoc.path.toString();
    lcName = loDoc.name.split('.')[0].toString();
    lcRoot = lcPath.substring(1, 2) + ":/" + lcPath.substring(3, lcPath.length - 6);

    //for (var i = 0; i < laLayers.length; i++) {
    //    $.writeln("Layer Name: " + laLayers[i].name);
    // }

    var  loLayers = [];
    CollectAllLayers(loDoc, 0);

    for (var i = 0; i < loLayers.length; i++) {
        $.writeln("All Layer Name: " + loLayers[i]);
    }

}    

function CollectAllLayers(parent, level) {
    for (var i = 0; i < parent.layers.length; i++) {
        var layer = parent.layers[i];
        
        // Indent based on nesting level for readability
        var indent = "";
        for (var j = 0; j < level; j++) {
            indent += "SUB - ";
        }
        
        loLayers.push(indent + layer.name);
        
        // If the layer has nested layers, call the function again
        if (layer.layers.length > 0) {
            CollectAllLayers(layer, level + 1);
        }
    }
}