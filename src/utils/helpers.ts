export interface Dict {
    [key: string]: string
}

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

export function extractLinks(link: string): Dict {
    var links: Dict = {};
    var temp: string = link;
    for(let index: number = 0; index < 4; index++) {
        var start = temp.indexOf("<") + 1;
        var end = temp.indexOf(">");
        // 5 is for rel=" because It is easy to find closing quotation mark
        // after opening quotation mark.
        var keyStart = temp.indexOf("rel") + 5; 
        // +1 for starting to count from 0 twice.
        var keyEnd = temp.substring(keyStart).indexOf('"') + temp.indexOf('"') + 1

        if(start == -1 ||end == -1 || keyStart == -1 || keyEnd < keyStart) {
            break;
        }

        var key = temp.substring(keyStart, keyEnd);
        var keyLink = temp.substring(start, end);
        // +1 for avoid closing quotation mark before comma
        temp = temp.substring(keyEnd + 1);

        links[key] = keyLink;
    }

    return links;
}

export default { urlQueryBuilder, extractLinks};