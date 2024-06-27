export const copyNonEmptyProperties = (obj: any) => {
	// Base case: if obj is not an object, return it as is
	if (typeof obj !== "object" || obj === null) {
		return obj;
	}

	// Create a new object to store the filtered properties
	const newObj:any = {};

	// Iterate over each key-value pair in the object
	for (const [key, value] of Object.entries(obj)) {
		if (value !== null && value !== undefined && value !== "") {
			if (typeof value === "object") {
				// Recursively copy properties for nested objects
				const nestedObj = copyNonEmptyProperties(value);
				if (Object.keys(nestedObj).length > 0) {
					newObj[key] = nestedObj;
				}
			} else {
				newObj[key] = value;
			}
		}
	}

	return newObj;
}
