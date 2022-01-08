const Redaction = require('../models/redaction')
const Theme = require('../models/theme')


function countKeywordsInCommon(text,themeKeywords) {
    var keywordsInCommon = 0

    themeKeywords.forEach(word => {
        if (text.includes(word)) keywordsInCommon++
    });
  
    return keywordsInCommon
}


module.exports = async (text, theme, paragraphs) => {
    
    let { keywords: themeKeywords} = await Theme.findOne({theme: theme}, ["keywords"] )

    var keywordsInCommon = countKeywordsInCommon(text, themeKeywords)

    var coherencePontuation = null

    var countParagraphs = paragraphs.length
    
    switch (true) {
        case keywordsInCommon >= 13 && countParagraphs >= 4:
          coherencePontuation = 200
          break;
        case keywordsInCommon >= 10 && countParagraphs >= 3:
          coherencePontuation = 160
          break;
        case keywordsInCommon >= 6 && countParagraphs >= 3:
          coherencePontuation = 80
          break;
        case keywordsInCommon >= 2:
         coherencePontuation = 40
          break; 
        case keywordsInCommon == 0:
          coherencePontuation = 0
          break;
      }

      return coherencePontuation
}