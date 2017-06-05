# Path Module

## Classes


## Interfaces


## Constants


## Functions


* `buildQueryString(params: Object, traditional?: Boolean): string` - Generate a query string from an object.
  * `params: Object` - Object containing the keys and values to be used.
  * `traditional?: Boolean` - Boolean Use the old URI template standard (RFC6570)


* `join(path1: string, path2: string): string` - Joins two paths.
  * `path1: string` - The first path.
  * `path2: string` - The second path.


* `parseQueryString(queryString: string): Object` - Parse a query string.
  * `queryString: string` - The query string to parse.


* `relativeToFile(name: string, file: string): string` - Calculates a path relative to a file.
  * `name: string` - The relative path.
  * `file: string` - The file path.

