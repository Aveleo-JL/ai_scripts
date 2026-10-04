if (documents.length == 0) {
    alert("There are no documents open.");
}
else {
    var loDoc = app.activeDocument;
    var  loLayers = [];
    lcPath = loDoc.path.toString() + "/icons";

    UnvisibleLayers(loDoc, 0);
    ExportIcons(loDoc, 0);
}    


function UnvisibleLayers(parent, level) {
    for (var i = 0; i < parent.layers.length; i++) {
        var layer = parent.layers[i];
        // upravit aby sa zneviditelnili vsetky okrem base a rooto export
        if (level > 0) {
            loLayers.push(layer.name);
            layer.visible = false;
        }
        if (layer.name == "export") {
            layer.visible = true;
            UnvisibleLayers(layer, level + 1);
        }
    }
}

function ExportIcons(parent, level) {
    for (var i = 0; i < parent.layers.length; i++) {
        var layer = parent.layers[i];
        if (level > 0) {
            layer.visible = true;
            lcName = layer.name;
            if (lcName == "backround off" || lcName == "adobe illustrator") {
                var targetLayer = activeDocument.layers.getByName("light");
                targetLayer.visible = false;
            }
            $.writeln("Exported Layer Name: " + "'" + lcName + "'");
            var loFile = new File(lcPath + "/" + lcName + ".jpg");
            var loOptions = new ExportOptionsJPEG();
            loOptions.qualitySetting = 100;
            loDoc.exportFile(loFile, ExportType.JPEG, loOptions);
            var loRenFile = new File(lcPath + "/" + lcName.replace(/\s+/g, '-') + ".jpg");
            loRenFile.rename(lcName + '.jpg');
            layer.visible = false;
            var targetLayer = activeDocument.layers.getByName("light");
            targetLayer.visible = true;
        }
        if (layer.name == "export") {
            ExportIcons(layer, level + 1);
        }
    }
}