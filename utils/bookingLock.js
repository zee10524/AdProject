const redis = require("./redisClient");

const LOCK_TTL_SECONDS = 60;

/**
 * Try to acquire a lock for a listing.
 * @returns {boolean} true if lock acquired, false if already locked
 */
const acquireLock = async (listingId) => {
    const key = `lock:listing:${listingId}`;
    // @upstash/redis uses object options syntax
    const result = await redis.set(key, "locked", { nx: true, ex: LOCK_TTL_SECONDS });
    return result === "OK";
};

/**
 * Release the lock for a listing.
 */
const releaseLock = async (listingId) => {
    const key = `lock:listing:${listingId}`;
    await redis.del(key);
};

module.exports = { acquireLock, releaseLock };
