"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IPrestadorRepository = _interopRequireDefault(require("../../prestador/repositories/IPrestadorRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _IAgendamentoRespository = require("../repositories/IAgendamentoRespository");

var _IBloqueioRepository = _interopRequireDefault(require("../repositories/IBloqueioRepository"));

var _IServiceRepository = _interopRequireDefault(require("../repositories/IServiceRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListHorarioDiponilvelService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AgendamentoRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ServiceRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("BloqueioRepostory")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("PrestadorRepository")(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IAgendamentoRespository.IAgendamentoRepository === "undefined" ? Object : _IAgendamentoRespository.IAgendamentoRepository, typeof _IServiceRepository.default === "undefined" ? Object : _IServiceRepository.default, typeof _IBloqueioRepository.default === "undefined" ? Object : _IBloqueioRepository.default, typeof _IPrestadorRepository.default === "undefined" ? Object : _IPrestadorRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class ListHorarioDiponilvelService {
  constructor(agendamentoRepository, serviceRepository, bloquioRepository, prestadorRepository) {
    this.agendamentoRepository = agendamentoRepository;
    this.serviceRepository = serviceRepository;
    this.bloquioRepository = bloquioRepository;
    this.prestadorRepository = prestadorRepository;
  }

  async exec({
    provider_id,
    service,
    dia,
    mes,
    ano
  }) {
    const horarios = [];

    function convertHours(time) {
      const [hour, minutes] = time.split(":").map(Number);
      const timeInMinutes = hour * 60 + minutes;
      return timeInMinutes;
    }

    function rangeHorario(start, stop) {
      stop = stop === undefined ? start : stop;
      start = stop === start ? 1 : start;
      const length = stop - start + 1;

      const mapFn = (_, i) => start + i;

      const hor = Array.from({
        length
      }, mapFn);
      return hor;
    }

    const findSercies = await this.serviceRepository.findUniqService(provider_id, service);
    const findWork = await this.prestadorRepository.findById(provider_id);

    if (!findWork) {
      throw new _AppError.default("prestador nao encontrado");
    }

    if (!findSercies) {
      throw new _AppError.default("Esse servi??o nao existe");
    }

    const tempoServico = convertHours(findSercies === null || findSercies === void 0 ? void 0 : findSercies.time);
    const time = (0, _dateFns.getMinutes)(new Date(2000, 2, 2, 10, tempoServico - 1, 0, 0));
    const appointments = await this.agendamentoRepository.findAgenndamentosDoDia(dia, mes, provider_id);
    const horaStartAgenda = appointments.map(h => {
      return h.from;
    });
    horaStartAgenda.sort((a, b) => {
      return a - b;
    });
    const horafim = appointments.map(h => {
      // const horaReduzida = convertHours(h.at);
      return h.at;
    });
    horafim.sort((a, b) => {
      return a - b;
    });
    const inicioLeng = horaStartAgenda.length - 1;

    if (findSercies.service === service) {
      const hora = [];
      let indice = -1;

      while (indice < inicioLeng) {
        indice += 1;
        const inicio = horaStartAgenda[indice + 1] + 1;
        let fim = horafim[indice];

        while (fim < inicio) {
          fim += 1;

          if (fim + tempoServico < inicio) {
            hora.push(fim);
          }
        }
      }

      const tempoWorkStart = convertHours(findWork.work_init);
      const tempoWorkStop = convertHours(findWork.work_and);
      let indCont = -tempoServico;

      while (indCont < hora[hora.length - 1]) {
        indCont += tempoServico;

        if (hora[indCont] !== undefined) {
          horarios.push(hora[indCont]);
        }
      }

      if (horaStartAgenda[0] === undefined) {
        let conte = tempoWorkStart - tempoServico;

        while (conte < tempoWorkStop) {
          conte += tempoServico;
          horarios.push(conte);
        }
      }

      if (horaStartAgenda[0] > tempoWorkStart) {
        let con = tempoWorkStart - tempoServico;
        const or = [];
        const horaMI = horaStartAgenda[0] - tempoServico;

        while (con < horaMI) {
          con += tempoServico;
          or.push(con);
        }

        or.filter(h => {
          if (h + time < horaStartAgenda[0]) {
            horarios.push(h);
          }
        });
      }

      let hormin = horafim[horafim.length - 1] + 1 - tempoServico;

      for (hormin; hormin < tempoWorkStop;) {
        hormin += tempoServico;

        if (hormin <= tempoWorkStop) {
          horarios.push(hormin);
        }
      }
    }

    horarios.sort((a, b) => {
      return a - b;
    });
    const findBloqueio = await this.bloquioRepository.findBloqueio(provider_id, dia, mes);
    const startBloqueio = findBloqueio.map(h => convertHours(h.from)).sort((a, b) => a - b);
    const stopBloqueio = findBloqueio.map(h => convertHours(h.at)).sort((a, b) => a - b);
    const bloqueio = [];

    if (findBloqueio) {
      const lenght = findBloqueio.length - 1;
      let i = -1;

      while (i < lenght) {
        i += 1;
        const start = startBloqueio[i];
        const stop = stopBloqueio[i];
        rangeHorario(start, stop).map(h => bloqueio.push(h));
      }
    }

    const horariosBloqueados = horarios.filter(h => {
      const bk = bloqueio.find(d => {
        return h === d;
      });
      return h !== bk;
    });
    const hor = horariosBloqueados.map(h => {
      const hourCorrent = new Date(Date.now());
      hourCorrent.setMinutes(-(3 * 60));
      const event = new Date(ano, mes - 1, dia, 0, h, 0);
      const formated = (0, _dateFns.format)(event, "HH:mm");
      let week = (0, _dateFns.format)(event, "i");

      if (week === "7") {
        week = false;
      } else {
        week = true;
      }

      return {
        hour: formated,
        avaliable: (0, _dateFns.isAfter)(event, hourCorrent) && week
      };
    });
    return hor;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ListHorarioDiponilvelService;