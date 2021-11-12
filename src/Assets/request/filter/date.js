const date_filter = `
FILTER(("$$$DATE1_VAL$$$"^^xsd:date >= ?birthYear) || ("$$$DATE1_VAL$$$"^^xsd:date >= ?deathYear)).
FILTER(("$$$DATE2_VAL$$$"^^xsd:date <= ?birthYear) || ("$$$DATE2_VAL$$$"^^xsd:date <= ?deathYear)).`;

export default date_filter;
