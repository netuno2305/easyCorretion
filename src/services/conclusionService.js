const ConclusionStructures = require('../models/conclusionStrutucures')

function countConclusionStructures(text, structure) {
    let textStructures = 0

    for (var i = 0; i < structure.length; i++) {
        if (text.includes(structure[i])) textStructures++
    }

    return textStructures
}

module.exports = async (paragraphs) => {

    const lastParagraph = paragraphs[paragraphs.length - 1]
    
    const {
        agents: agents, 
        completionconnectives:completionconnectives, 
        closingsentences: closingsentences } = await ConclusionStructures.findOne({}, ["agents","completionconnectives", "closingsentences" ])
    
    var countAgents = countConclusionStructures(lastParagraph, agents)
    var countCompletionConnectives = countConclusionStructures(lastParagraph, completionconnectives)
    var countClosingSentences = countConclusionStructures(lastParagraph, closingsentences)
    
    var agentsPontuation = CompletionnConnectivesPontuation =   null

    switch (true) {
        case countAgents >= 3:
            agentsPontuation = 200
            break;
        case countAgents >= 2:
            agentsPontuation = 160
            break;
        case countAgents >= 1:
            agentsPontuation = 120
            break; 
        case countAgents === 0:
            agentsPontuation = 40
            break;
    }
    switch (true) {
        case countCompletionConnectives >= 3 :
            CompletionnConnectivesPontuation = 200
            break;
        case countCompletionConnectives >= 2 && countClosingSentences >= 1:
            CompletionnConnectivesPontuation = 160
            break;
        case countCompletionConnectives >= 2:
            CompletionnConnectivesPontuation = 120
            break;
        case countCompletionConnectives >= 1:
            CompletionnConnectivesPontuation = 80
            break; 
        case countCompletionConnectives === 0:
            CompletionnConnectivesPontuation = 40
            break;
        }

        var conclusionPontuation = (agentsPontuation + CompletionnConnectivesPontuation)/2

        return conclusionPontuation
}
