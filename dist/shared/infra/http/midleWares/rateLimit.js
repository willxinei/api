"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _redis = _interopRequireDefault(require("redis"));

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _AppError = _interopRequireDefault(require("../../../../../dist/shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisClient = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "ratelimit",
  points: 5,
  duration: 1
});

async function rateLimiter(req, res, next) {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch (err) {
    throw new _AppError.default("Muitas requisiçoes", 429);
  }
}