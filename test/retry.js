export default async (callback, { maxRetries = 5, delay = 250, backOff = 2 } = {}) => {
    for (let i = 1; i <= maxRetries; i++) {
        try {
            await callback();
        }
        catch (e) {
            if (i === maxRetries) {
                throw e;
            }
            console.log(`Caught error ${e}. Will retry ${maxRetries - i} more times.`);
            await new Promise((resolve) => setTimeout(resolve, delay * i * backOff));
        }
    }
};
