// Description: Tgis file contains utility function commonly used in application

// check if a text contains any non space characters
module.exports.containsNonSpaceCharacters = function(text){
    return /\S/.test(text);
}