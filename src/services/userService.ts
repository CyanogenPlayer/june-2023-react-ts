import {IUser} from "../interfaces/userInterface";
import {axiosService, IRes} from "./axiosService";
import {urls} from "../constants/urls";

const userService = {
    getAll: (): IRes<IUser[]> => axiosService.get(urls.users.base),
    getById: (id: number): IRes<IUser> => axiosService.get(urls.users.byId(id))
}

export {
    userService
}