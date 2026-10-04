if (documents.length == 0) {
    alert("There are no documents open.");
}
else {
    var loDoc = app.activeDocument;
    var  loLayers = [];
    lcPath = loDoc.path.toString() + "/icons";

    UnvisiblePassedLayers(loDoc, 0);
    ExportPassedLayers(loDoc, 0);
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
            layer.visible = true;
            lcName = layer.name;
            if (lcName == "backround off") {
                var targetLayer = activeDocument.layers.getByName("light");
                targetLayer.visible = false;
            }
            $.writeln("Exported Layer Name: " + "'" + lcName + "'");
            var loFile = new File(lcPath + "/" + lcName + ".jpg");
            var loOptions = new ExportOptionsJPEG();
            loOptions.qualitySetting = 100;
            loDoc.exportFile(loFile, ExportType.JPEG, loOptions);
            layer.visible = false;
            var targetLayer = activeDocument.layers.getByName("light");
            targetLayer.visible = true;
        }
        if (layer.name == "passed") {
            ExportPassedLayers(layer, level + 1);
        }
    }
}