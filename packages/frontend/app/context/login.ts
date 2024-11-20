import { create } from 'zustand';

interface User {
    _id: string;
    name: string;
    email: string;
    company: string
}

interface UserState {
    user: User;
    setUser: (user: User) => void;
}

const useUserStore = create<UserState>((set) => ({
    user: {
        _id: "",
        company: "",
        email: "",
        name: ""
    },
    setUser: (user) => set({ user }),
}));

export default useUserStore;
