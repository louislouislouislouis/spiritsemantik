const seeAlso_req = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX : <http://dbpedia.org/resource/>
    PREFIX dbpedia2: <http://dbpedia.org/property/>
    PREFIX dbpedia: <http://dbpedia.org/>
    PREFIX skos:<http://www.w3.org/2004/02/skos/core#> 

    SELECT ?seeAlso, ?label, ?thumbnail, ?abstract
    WHERE { 
        <$$$BASE_VAL$$$> dbo:wikiPageWikiLink ?seeAlso. 
        ?seeAlso a <http://dbpedia.org/ontology/Saint>; 
                a dbo:Person; 
                dbo:abstract ?abstract; 
                rdfs:label ?label.
        OPTIONAL { ?seeAlso dbo:thumbnail ?thumbnail. }
        FILTER (lang(?label) = '$$$LANGUAGE$$$').
        FILTER (lang(?abstract) = '$$$LANGUAGE$$$').
    }
`;

export default seeAlso_req;