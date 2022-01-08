const ConnectiveWords = require('../models/connectiveWords')
const Theme = require('../models/theme')

function countConnectiveWords(text, connectiveWords) {
    let textConnectiveWords = 0

    for (var i = 0; i < connectiveWords.length; i++) {
        if (text.includes(connectiveWords[i])) textConnectiveWords++
    }

    return textConnectiveWords
}

module.exports = async (text, paragraphs) => {

    const {words: connectiveWords} = await ConnectiveWords.findOne({}, ["words"])
    let textConnectiveWords = countConnectiveWords(text, connectiveWords)

    var connectivePontuation = null
    var countParagraphs = paragraphs.length

    switch (true) {
        case textConnectiveWords >= 19 && countParagraphs >= 4:
          connectivePontuation = 200
          break;
        case textConnectiveWords >= 13 && countParagraphs >= 3:
          connectivePontuation = 160
          break;
        case textConnectiveWords >= 9 && countParagraphs >= 3:
          connectivePontuation = 80
          break;
        case textConnectiveWords >= 2:
          connectivePontuation = 40
          break; 
        case textConnectiveWords <= 1:
          connectivePontuation = 0
          break;
      }

    return connectivePontuation
}