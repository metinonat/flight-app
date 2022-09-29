export function urlQueryBuilder(baseQuery: string, newQuery: string, order?: string): string {
    var query : string = "";
    var multipleValue : boolean = newQuery.includes(",");

    if(baseQuery.length == 0) {
        query = "?"; // before the first parameter
    }
    else {
        query = baseQuery.concat("&"); // between parameters
    }

    // Place parameter/parameters
    if(!multipleValue) {
        // If order provided add ordering symbol
        if(order) {
            query = query.concat(order?.charAt(0) == "1" ? "+": "-");
        }
        query = query.concat(newQuery);
    }
    else {
        var paramList : Array<string> = newQuery.split(",");

        for(var i = 0; i < paramList.length; i++) {
            // First add the parameter name and skip the next value as the parameter name
            // should not have a +/- sign before and a comma after it. 
            if(i == 0) {
                query = query.concat(paramList[i]);
                continue;
            }
            // If order provided add ordering symbol
            if(order) {
                query = query.concat(order?.charAt(i - 1) == "1" ? "+": "-")
            }
            query = query.concat(paramList[i]);

            if(i != paramList.length - 1) {
                query = query.concat(",");
            }
        }
    }

    return query;
}

export default { urlQueryBuilder };