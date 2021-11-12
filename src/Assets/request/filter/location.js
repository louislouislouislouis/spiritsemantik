const location_filter = `
FILTER (regex(str(?birthPlace), "$$$LOCATION$$$") || regex(str(?deathPlace), "$$$LOCATION$$$")).`;

export default location_filter;
