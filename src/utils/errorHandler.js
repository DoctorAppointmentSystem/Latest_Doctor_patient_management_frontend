/**
 * Parses API errors and returns a user-friendly message.
 * @param {Object} error - The error object from axios/fetch.
 * @returns {String} - A clean error message.
 */
export const formatError = (error) => {
    if (!error) return "An unknown error occurred.";

    // 1. Network Errors
    if (error.message === "Network Error") {
        return "Unable to connect to the server. Please check your internet connection.";
    }

    // 2. HTTP Response Errors
    if (error.response) {
        const { status, data } = error.response;

        // Backend often returns { message: "..." } or { error: "..." }
        const backendMsg = data?.message || data?.error || (typeof data === "string" ? data : undefined);

        // Handle Mongoose Validation Errors with precise mapping
        if (backendMsg && backendMsg.includes("validation failed")) {
            if (backendMsg.includes("eye")) {
                return "Please select an Eye (Right, Left, or Both) for all history items.";
            }
            if (backendMsg.includes("required")) {
                return "Some required fields are missing. Please check your input.";
            }
            return "Validation failed. Please check your entries.";
        }

        if (status === 400) return backendMsg || "Bad Request. Please check your data.";
        if (status === 401) return "Session expired. Please login again.";
        if (status === 403) return "You are not authorized to perform this action.";
        if (status === 404) return "Resource not found.";
        if (status === 500) return "Server error. Please try again later.";

        // Return backend message if it exists and isn't handled above
        if (backendMsg) return backendMsg;
    }

    // 3. Fallback
    return error.message || "Something went wrong.";
};
