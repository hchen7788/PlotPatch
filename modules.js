window.mdToHtml = function(str) {
    var tempStr = str;
    while(tempStr.indexOf("**") !== -1) {
        var firstPos = tempStr.indexOf("**");
        var nextPos = tempStr.indexOf("**",firstPos + 2);
        if(nextPos !== -1) {
            var innerTxt = tempStr.substring(firstPos + 2,nextPos);
            var strongified = '<strong>' + innerTxt + '</strong>';
            tempStr = tempStr.substring(0,firstPos) + strongified + tempStr.substring(nextPos + 2,tempStr.length);
        //get rid of unclosed '**'
        } else {
            tempStr = tempStr.replace('**','');
        }
    }
     while(tempStr.indexOf("*") !== -1) {
        var firstPos = tempStr.indexOf("*");
        var nextPos = tempStr.indexOf("*",firstPos + 1);
        if(nextPos !== -1) {
            var innerTxt = tempStr.substring(firstPos + 1,nextPos);
            var italicized = '<i>' + innerTxt + '</i>';
            tempStr = tempStr.substring(0,firstPos) + italicized + tempStr.substring(nextPos + 2,tempStr.length);
        //get rid of unclosed '*'
        } else {
            tempStr = tempStr.replace('*','');
        }
    }
    return tempStr;
}