import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) // Convert the items array into a Lodash object
    .slice(startIndex) // Takes a portion of the array from the startIndex
    .take(pageSize) // Takes the two first "pageSize" items from that portion
    .value(); // Converts the Lodash object back into a normal array
}
