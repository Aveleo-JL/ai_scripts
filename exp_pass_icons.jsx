if (documents.length == 0) {
    alert("There are no documents open.");
}
else {
    var loDoc = app.activeDocument;

    lcPath = loDoc.path.toString() + "/icons";
    // lcName = loDoc.name.split('.')[0].toString();
    // lcRoot = lcPath.substring(1, 2) + ":/" + lcPath.substring(3, lcPath.length - 6);

    var  loLayers = [];
    UnvisiblePassedLayers(loDoc, 0);
    ExportPassedLayers(loDoc, 0);

    for (var i = 0; i < loLayers.length; i++) {
        // $.writeln("Passed Layer ID: " + "'" + loLayers[i] + "'" + " Name: " + "'" + loDoc.layers[loLayers[i]].name + "'");
        $.writeln("Passed Layer ID: " + "'" + loLayers[i] + "'");
        //loDoc.layers[loLayers[i]].visible = false;
        
    }
}    


function UnvisiblePassedLayers(parent, level) {
    for (var i = 0; i < parent.layers.length; i++) {
        var layer = parent.layers[i];
        if (level > 0) {
            loLayers.push(layer.name);
            layer.visible = false;
        }
        if (layer.name == "passed") {
            layer.visible = true;
            UnvisiblePassedLayers(layer, level + 1);
        }
    }
}

function ExportPassedLayers(parent, level) {
    for (var i = 0; i < parent.layers.length; i++) {
        var layer = parent.layers[i];
        if (level > 0) {
            loLayers.push(layer.name);
            layer.visible = true;
            // export layer
            lcName = layer.name.split('.')[0].toString();
            var loFile = new File(lcPath + "/" + lcName + ".jpg");
            var loOptions = new ExportOptionsJPEG();
            loOptions.qualitySetting = 100;
            loDoc.exportFile(loFile, ExportType.JPEG, loOptions);
            layer.visible = false;
        }
        if (layer.name == "passed") {
            // layer.visible = true;
            ExportPassedLayers(layer, level + 1);
        }
    }
}