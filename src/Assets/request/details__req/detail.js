const detail_req = `
SELECT ?abstract, (GROUP_CONCAT(DISTINCT ?birthName;separator=\", \") AS ?birthName), 
    (GROUP_CONCAT(DISTINCT ?birthPlace;separator=\", \") AS ?birthPlace),
    (GROUP_CONCAT(DISTINCT ?deathPlace;separator=\", \") AS ?deathPlace), 
    (GROUP_CONCAT(DISTINCT ?deathDate;separator=\", \") AS ?deathDate), 
    (GROUP_CONCAT(DISTINCT ?thumbnail;separator=\", \") AS ?thumbnail), 
    (GROUP_CONCAT(DISTINCT ?feastDay;separator=\", \") AS ?feastDay), 
    (GROUP_CONCAT(DISTINCT ?parents;separator=\", \") AS ?parents), 
    (GROUP_CONCAT(DISTINCT ?successor;separator=\", \") AS ?successor), 
    (GROUP_CONCAT(DISTINCT ?label;separator=\", \") AS ?label), 
    (GROUP_CONCAT(DISTINCT ?veneratedIn;separator=\", \") AS ?veneratedIn), 
    (GROUP_CONCAT(DISTINCT ?seeAlso;separator=\", \") AS ?seeAlso) 
WHERE { 
    <$$$BASE_VAL$$$> dbo:abstract ?abstract. 
    OPTIONAL {<$$$BASE_VAL$$$> dbp:birthName ?birthName.} 
    OPTIONAL {<$$$BASE_VAL$$$> dbo:birthPlace ?birthPlace. }  
    OPTIONAL {<$$$BASE_VAL$$$> dbo:deathPlace ?deathPlace.} 
    OPTIONAL {<$$$BASE_VAL$$$> dbp:deathDate ?deathDate.} 
    OPTIONAL {<$$$BASE_VAL$$$> dbo:thumbnail ?thumbnail.} 
    OPTIONAL {<$$$BASE_VAL$$$> dbp:feastDay ?feastDay.} 
    OPTIONAL {<$$$BASE_VAL$$$> dbp:parents ?parents.} 
    OPTIONAL {<$$$BASE_VAL$$$> dbp:successor ?successor.} 
    OPTIONAL {<$$$BASE_VAL$$$> rdfs:label ?label.} 
    OPTIONAL {<$$$BASE_VAL$$$> dbp:veneratedIn ?veneratedIn.} 
    OPTIONAL {<$$$BASE_VAL$$$> dbo:wikiPageWikiLink ?seeAlso. ?seeAlso a <http://dbpedia.org/ontology/Saint>.} 
    FILTER (lang(?abstract) = '$$$LANGUAGE$$$'). 
    FILTER (lang(?birthName) = '$$$LANGUAGE$$$'). 
    FILTER (lang(?deathDate) = '$$$LANGUAGE$$$'). 
    FILTER (lang(?parents) = '$$$LANGUAGE$$$'). 
    FILTER (lang(?label) = '$$$LANGUAGE$$$').
}`;

export default detail_req;
