export const copyNonEmptyProperties = (obj: any) => {
	// Base case: if obj is not an object, return it as is
	if (typeof obj !== "object" || obj === null) {
		return obj;
	}

	// Create a new object to store the filtered properties
	const newObj: any = {};

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
};

export const generateCode = (len: number) => {
	if (typeof len !== "number" || len <= 0 || !Number.isInteger(len)) {
		throw new Error("The length should be a positive integer.");
	}

	const min = Math.pow(10, len - 1);
	const max = Math.pow(10, len) - 1;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};
