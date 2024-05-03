window.mdToHtml = function(str) {
    // Replace two newlines with paragraph tags
    str = str.replace(/\n\n/g, '</p><p>');

    // Replace single newline with <br> to create a new line within the same paragraph
    str = str.replace(/\n/g, '<br>');

    // Wrap the whole string in paragraph tags unless the string is empty
    str = '<p>' + str + '</p>';

    // Convert bold markdown to HTML <strong> tags
    str = str.replace(/\*\*(.*?)\*\*/g, function(match, inner) {
        return '<strong>' + inner + '</strong>';
    });

    // Convert italic markdown to HTML <i> tags
    str = str.replace(/\*(.*?)\*/g, function(match, inner) {
        return '<i>' + inner + '</i>';
    });

    // Remove redundant paragraph tags potentially added by double newlines at the start or end of the text
    str = str.replace(/<p><\/p>/g, '');

    return str;
}
