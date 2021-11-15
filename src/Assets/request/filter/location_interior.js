const location_filter_interior = `
regex(str(?birthPlace), "$$$LOCATION$$$") || regex(str(?deathPlace), "$$$LOCATION$$$")`;
export default location_filter_interior