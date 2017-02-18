// require fs
var fs = require("fs");

module.exports = ClozeFlashcard;

// constructor for ClozeFlashcard
function ClozeFlashcard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = this.text.replace(this.cloze, '_____');

}