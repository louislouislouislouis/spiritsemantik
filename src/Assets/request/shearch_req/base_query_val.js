const fullreq = `
SELECT ?lien ?label ?desc ?pic 
WHERE {
 	?lien a <http://dbpedia.org/ontology/Saint>;
    a dbo:Person;
    rdfs:label ?label;
    rdfs:comment ?desc;
	dbo:birthYear ?birthYear;
	dbo:deathYear ?deathYear;
	dbo:birthPlace ?birthPlace;
	dbo:deathPlace ?deathPlace.
 	OPTIONAL { ?lien dbo:thumbnail ?pic. }
    FILTER (regex(str(?label ), \"$$$BASE_VAL_LOWER$$$\") || regex(str(?label), \"$$$BASE_VAL_UPPER$$$\")) . 
    $$$FILTER_VAL_LANGUAGE$$$
    $$$FILTER_VAL_DATE$$$
    $$$FILTER_VAL_LOCATION$$$
}
GROUP BY ?lien
LIMIT 20`;

// cela crée les doublons ?birthYear ?deathYear ?birthPlace ?deathPlace

export default fullreq;
