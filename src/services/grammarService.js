const textGears = require('textgears-api')
const textGearsApi = textGears('iUJ438EWYKLwmbY7', {language: 'pt-BR'})

module.exports = async (text) => {

    var grammarCorrectionResult= await textGearsApi.checkGrammar(text)
    
    const ignoredErrors = ["style","typographical","uncategorized", "register"]
    var grammarPontuation = null

    var errors = grammarCorrectionResult.response.errors.filter(item => !ignoredErrors.includes(item.type))
    const errorsLength = errors.length

    switch (true) {
      case errorsLength <= 2:
        grammarPontuation = 200
        break;
      case errorsLength >= 3 && errorsLength <= 4:
        grammarPontuation = 160
        break;
      case errorsLength >= 5 && errorsLength <= 6:
        grammarPontuation = 120
        break;
      case errorsLength >= 7 && errorsLength <= 8:
        grammarPontuation = 80
        break; 
      case errorsLength >= 9 && errorsLength <= 15:
        grammarPontuation = 40
        break; 
      case errorsLength >= 16:
        grammarPontuation = 0
        break;
      
    }
    
    return grammarPontuation
}