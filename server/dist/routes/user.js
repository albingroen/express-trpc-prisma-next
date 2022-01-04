"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const client_1 = require("@prisma/client");
const trpc = __importStar(require("@trpc/server"));
const y = __importStar(require("yup"));
const prisma = new client_1.PrismaClient();
exports.usersRoutes = trpc
    .router()
    .query('getUser', {
    input: y.string().required(),
    resolve({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    id: input,
                },
            });
            return user;
        });
    },
})
    .query('getUsers', {
    resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany();
            return users;
        });
    },
})
    .mutation('createUser', {
    input: y.object({
        name: y.string().required(),
    }),
    resolve({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.create({
                data: input,
            });
            return user;
        });
    },
})
    .mutation('updateUser', {
    input: y.object({
        id: y.string().required(),
        patch: y.object({
            name: y.string(),
        }),
    }),
    resolve({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.update({
                where: {
                    id: input.id,
                },
                data: input.patch,
            });
            return user;
        });
    },
})
    .mutation('deleteUser', {
    input: y.string().required(),
    resolve({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.user.delete({
                    where: {
                        id: input,
                    },
                });
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    },
});
