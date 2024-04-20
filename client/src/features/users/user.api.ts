import api from "@/api";
import {UserType} from "@/features/users/types/user.type";
import {ResponseType} from "@/response.type";

const BaseUri = "users/";

const UserApi = {
    fetchUsers: async (): Promise<UserType[]> => {
        const {data} = await api.get<UserType[]>(BaseUri);
        return data;
    },
    create: async (form: FormData): Promise<ResponseType<UserType>> => {
        const {data} = await api.post(BaseUri, form);
        return data
    },
};

export default UserApi;
