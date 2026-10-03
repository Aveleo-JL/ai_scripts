if (documents.length == 0) {
    alert("There are no documents open.");
}
else {
    var loDoc = app.activeDocument;

    lcPath = loDoc.path.toString();
    lcName = loDoc.name.split('.')[0].toString();
    lcRoot = lcPath.substring(1, 2) + ":/" + lcPath.substring(3, lcPath.length - 6);

    var  loLayers = [];
    CollectPassedLayers(loDoc, 0);


    for (var i = 0; i < loLayers.length; i++) {
        // $.writeln("Passed Layer ID: " + "'" + loLayers[i] + "'" + " Name: " + "'" + loDoc.layers[loLayers[i]].name + "'");
        $.writeln("Passed Layer ID: " + "'" + loLayers[i] + "'");
        //loDoc.layers[loLayers[i]].visible = false;
        
    }

}    


function CollectPassedLayers(parent, level) {
    for (var i = 0; i < parent.layers.length; i++) {
        var layer = parent.layers[i];
        if (level > 0) {
            loLayers.push(layer.name);
        }
        if (layer.name == "passed") {
            CollectPassedLayers(layer, level + 1);
        }

    }
}