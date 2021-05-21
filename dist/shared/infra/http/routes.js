"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routes = _interopRequireDefault(require("../../../../dist/modules/agendamento/infra/http/routes/routes"));

var _routesUser = _interopRequireDefault(require("../../../../dist/modules/users/infra/http/routes/routesUser.routes"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Route = (0, _express.Router)();
Route.use(_routes.default);
Route.use(_routesUser.default);
var _default = Route;
exports.default = _default;