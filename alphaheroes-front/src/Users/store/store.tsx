import { create } from "zustand";
import Alien from "../assets/avatars/alien_boy_avatar.png";
import Aquaboy from "../assets/avatars/Aquaboy_avatar.png";
import Captain from "../assets/avatars/Captain_America_Avatar.png";
import Egyptian from "../assets/avatars/Egyptian_boy_avatar.png";
import axios, { AxiosResponse } from "axios";
const imageAssets: { [key: string]: string } = {
  Alien,
  Aquaboy,
  Captain,
  Egyptian,
};
interface Parent {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface Profile {
  id: number;
  name: string;
  avatar: string;
  parent_id: number;
  total_chapters_completed: number;
  theme_color: string | null;
}

interface Settings {
  id: number;
  maxExercisesPerDay: number;
  maxTimePerDay: number;
  profile_id: number;
}

interface Chapter {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  progression: number;
  date: Date;
  order: number;
  badge_id: number;
}
interface Exercise {
  id: number;
  exercise_type: string;
  difficulty: number;
  instructions: string;
  completed: boolean;
  chapter_id: number;
}

interface Progression {
  id: number;
  profile_id: number;
  chapter_id: number;
}

interface Badge {
  id: number;
  name: string;
  image_url: string | null;
  description: string | null;
}

interface UserState {
  parent: Parent | null;
  token: string | null;
  profile: Profile | null;
  parents: Array<Parent>;
  profiles: Array<Profile>;
  chapters: Array<Chapter>;
  exercises: Array<Exercise>;
  settings: Array<Settings>;
  progressions: Array<Progression>;
  badges: Array<Badge>;
  imageAssets: { [key: string]: string };
  getParent: (email: string, password: string) => Promise<Parent>;
  setToken: (token: string) => void;
  Register: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<Parent>;
  getProfiles: () => Promise<Array<Profile>>;
  modifyProfile: (newProfile: Profile) => void;
  addProfile: (profile: Profile) => void;
  deleteProfile: (id: number) => void;
  getSetting: (id: number) => Promise<Settings>;
  getSettings: () => Promise<Array<Settings>>;
  modifySettings: (settings: Settings) => void;
  addSettings: (settings: Settings) => void;
  setCurrentProfile: (profile: Profile | null) => void;
  setCurrentParent: (parent: Parent | null) => void;
  getExercises: (id: number) => Promise<Array<Exercise>>;
}

const useStore = create<UserState>()((set, get) => ({
  token: "",
  parent: null,
  imageAssets,
  addParent: (parent: Parent) => {
    const updatedParents = [...get().parents, parent];
    set({ parents: updatedParents });
    get().setCurrentParent(parent);
  },
  setCurrentParent: (parent) => {
    set(() => ({
      parent: parent,
    }));
  },
  profile: null,
  setCurrentProfile: (profile) => {
    set(() => ({
      profile: profile,
    }));
  },
  setToken: (token: string) => set({ token }),

  parents: [
    // {
    //   id: 0,
    //   name: "Camille",
    //   firstName: "Camille",
    //   email: "camille@gmail.com",
    //   password: "123456",
    // },
    // {
    //   id: 1,
    //   name: "Julien",
    //   firstName: "Julien",
    //   email: "julien@hotmail.fr",
    //   password: "Password123!",
    // },
  ],
  getParent: async (email, password) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);

    if (response.status === 201) {
      useStore.getState().setToken(response.data.token); // Save the token
      set((state) => ({
        ...state,
        parent: response.data,
      }));

      return response.data;
    } else {
      throw new Error("Login failed");
    }
  },
  Register: async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/signup",
      {
        firstname,
        lastname,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      useStore.getState().setToken(response.data.token); // Save the token
      set((state) => ({
        ...state,
        parent: response.data,
      }));
      return response.data;
    } else {
      throw new Error("Registration failed");
    }
  },
  profiles: [
    // {
    //   id: 0,
    //   name: "Camille",
    //   image: Alien,
    //   parent_id: 0,
    //   total_chapters_completed: 0,
    //   theme_color: "palette3",
    // },
    // {
    //   id: 1,
    //   name: "Julien",
    //   image: Aquaboy,
    //   parent_id: 0,
    //   total_chapters_completed: 0,
    //   theme_color: "palette2",
    // },
    // {
    //   id: 1,
    //   name: "Rayan",
    //   image: Aquaboy,
    //   parent_id: 0,
    //   total_chapters_completed: 0,
    //   theme_color: "palette2",
    // },
    // {
    //   id: 2,
    //   name: "Guillaume",
    //   image: Captain,
    //   parent_id: 1,
    //   total_chapters_completed: 0,
    //   theme_color: "palette4",
    // },
    // {
    //   id: 3,
    //   name: "Rafael",
    //   image: Egyptian,
    //   parent_id: 1,
    //   total_chapters_completed: 0,
    //   theme_color: "palette1",
    // },
    // {
    //   id: 4,
    //   name: "Simon",
    //   image: Egyptian,
    //   parent_id: 1,
    //   total_chapters_completed: 0,
    //   theme_color: "palette5",
    // },
  ],
  getProfile: async (id: number) => {
    const token = useStore.getState().token; // Get the token from the store

    const response = await axios.get(
      `http://localhost:3000/api/profiles/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }, // Use the token
        withCredentials: true,
      }
    );
    console.log(response.data);

    if (response.status === 200) {
      set({ profile: response.data });
      return response.data;
    } else {
      throw new Error("Failed to fetch profile");
    }
  },
  getProfiles: async (): Promise<Profile[]> => {
    const token: string | null = useStore.getState().token; // Get the token from the store
  
    const response: AxiosResponse = await axios.get(
      `http://localhost:3000/api/profiles`,
      { 
        headers: { Authorization: `Bearer ${token}` }, // Use the token
        withCredentials: true 
      }
    );
    console.log(response.data);
    if (response.status === 200) {
      set({ profiles: response.data });
      return response.data;
    } else {
      throw new Error("Failed to fetch profiles");
    }
  },
  modifyProfile: (newProfile) => {
    set((state) => ({
      profiles: state.profiles.map((profile) =>
        profile.id === newProfile.id ? newProfile : profile
      ),
    }));
  },
  addProfile: async (profile) => {
    const token: string | null = useStore.getState().token; // Get the token from the store
  
    const response: AxiosResponse = await axios.post(
      `http://localhost:3000/api/profiles`,
      profile,
      { 
        headers: { Authorization: `Bearer ${token}` }, // Use the token
        withCredentials: true 
      }
    );
    console.log(response.data);
    if (response.status === 200) {
      set({ profile: response.data });
      return response.data;
    } else {
      throw new Error("Failed to create profile");
    }
  },
  deleteProfile: (id) => {
    set((state) => ({
      profiles: state.profiles.filter((profile) => profile.id !== id),
    }));
  },
  settings: [
    {
      id: 0,
      maxExercisesPerDay: 3,
      maxTimePerDay: 3,
      profile_id: 0,
    },
    {
      id: 1,
      maxExercisesPerDay: 2,
      maxTimePerDay: 2,
      profile_id: 1,
    },
    {
      id: 2,
      maxExercisesPerDay: 4,
      maxTimePerDay: 4,
      profile_id: 2,
    },
    {
      id: 3,
      maxExercisesPerDay: 1,
      maxTimePerDay: 1,
      profile_id: 3,
    },
    {
      id: 4,
      maxExercisesPerDay: 5,
      maxTimePerDay: 5,
      profile_id: 4,
    },
    {
      id: 5,
      maxExercisesPerDay: 6,
      maxTimePerDay: 6,
      profile_id: 5,
    },
  ],
  getSetting: async (id: number) => {
    const response = await axios.get(
      `http://localhost:3000/api/settings/${id}`,
      { withCredentials: true }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch settings");
    }
  },
  getSettings: async () => {
    const response = await axios.get("http://localhost:3000/api/settings", {
      withCredentials: true,
    });
    if (response.status === 200) {
      set({ settings: response.data });
      return response.data;
    } else {
      throw new Error("Failed to fetch settings");
    }
  },
  modifySettings: async (updatedSettings: Settings) => {
    const response = await axios.put(
      `http://localhost:3000/api/settings/${updatedSettings.id}`,
      updatedSettings,
      { withCredentials: true }
    );
    if (response.status === 200) {
      set((state) => ({
        settings: state.settings.map((setting) =>
          setting.id === updatedSettings.id ? updatedSettings : setting
        ),
      }));
    } else {
      throw new Error("Failed to modify settings");
    }
  },
  addSettings: async (settings: Settings) => {
    const response = await axios.post(
      "http://localhost:3000/api/settings",
      settings,
      { withCredentials: true }
    );
    if (response.status === 200) {
      set((state) => ({
        settings: [...state.settings, response.data],
      }));
    } else {
      throw new Error("Failed to add settings");
    }
  },
  chapters: [
    {
      id: 1,
      name: "Chapter 1",
      description: "Introduction to the course",
      completed: true,
      progression: 100,
      date: new Date(),
      order: 1,
      badge_id: 0,
    },
    {
      id: 2,
      name: "Chapter 2",
      description: "Introduction to the course",
      completed: false,
      progression: 50,
      date: new Date(),
      order: 2,
      badge_id: 1,
    },
    {
      id: 3,
      name: "Chapter 3",
      description: "Introduction to the course",
      completed: false,
      progression: 0,
      date: new Date(),
      order: 3,
      badge_id: 2,
    },
    {
      id: 4,
      name: "Chapter 4",
      description: "Introduction to the course",
      completed: true,
      progression: 100,
      date: new Date(),
      order: 4,
      badge_id: 0,
    },
    {
      id: 5,
      name: "Chapter 5",
      description: "Introduction to the course",
      completed: false,
      progression: 50,
      date: new Date(),
      order: 5,
      badge_id: 1,
    },
    {
      id: 6,
      name: "Chapter 6",
      description: "Introduction to the course",
      completed: false,
      progression: 0,
      date: new Date(),
      order: 6,
      badge_id: 2,
    },
  ],
  getExercises: async () => {
    const response = await axios.get("http://localhost:3000/api/exercises");
    if (response.status === 200) {
      set({ exercises: response.data });
      return response.data;
    } else {
      throw new Error("Failed to fetch exercises");
    }
  },
  getExercise: async (id: number) => {
    const response = await axios.get(
      `http://localhost:3000/api/exercises/${id}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch exercise");
    }
  },
  exercises: [
    {
      id: 0,
      exercise_type: "Math",
      difficulty: 1,
      instructions: "Add 2 + 2",
      completed: true,
      chapter_id: 0,
    },
    {
      id: 1,
      exercise_type: "Math",
      difficulty: 2,
      instructions: "Add 3 + 3",
      completed: false,
      chapter_id: 1,
    },
    {
      id: 2,
      exercise_type: "Math",
      difficulty: 3,
      instructions: "Add 4 + 4",
      completed: false,
      chapter_id: 2,
    },
    {
      id: 3,
      exercise_type: "Math",
      difficulty: 1,
      instructions: "Add 5 + 5",
      completed: false,
      chapter_id: 3,
    },
    {
      id: 4,
      exercise_type: "Math",
      difficulty: 2,
      instructions: "Add 6 + 6",
      completed: false,
      chapter_id: 4,
    },
    {
      id: 5,
      exercise_type: "Math",
      difficulty: 3,
      instructions: "Add 7 + 7",
      completed: false,
      chapter_id: 5,
    },
    {
      id: 6,
      exercise_type: "Math",
      difficulty: 1,
      instructions: "Add 8 + 8",
      completed: true,
      chapter_id: 5,
    },
    {
      id: 7,
      exercise_type: "Math",
      difficulty: 2,
      instructions: "Add 9 + 9",
      completed: false,
      chapter_id: 5,
    },
    {
      id: 8,
      exercise_type: "Math",
      difficulty: 3,
      instructions: "Add 10 + 10",
      completed: false,
      chapter_id: 2,
    },
  ],
  progressions: [
    {
      id: 0,
      profile_id: 0,
      chapter_id: 0,
    },
    {
      id: 1,
      profile_id: 0,
      chapter_id: 1,
    },
    {
      id: 2,
      profile_id: 0,
      chapter_id: 2,
    },
    {
      id: 3,
      profile_id: 1,
      chapter_id: 0,
    },
    {
      id: 4,
      profile_id: 1,
      chapter_id: 1,
    },
    {
      id: 5,
      profile_id: 1,
      chapter_id: 2,
    },
    {
      id: 6,
      profile_id: 2,
      chapter_id: 0,
    },
    {
      id: 7,
      profile_id: 2,
      chapter_id: 1,
    },
    {
      id: 8,
      profile_id: 2,
      chapter_id: 2,
    },
    {
      id: 9,
      profile_id: 3,
      chapter_id: 0,
    },
    {
      id: 10,
      profile_id: 3,
      chapter_id: 1,
    },
    {
      id: 11,
      profile_id: 3,
      chapter_id: 2,
    },
  ],
  badges: [
    {
      id: 0,
      name: "First Badge",
      image_url: null,
      description: null,
    },
    {
      id: 1,
      name: "Second Badge",
      image_url: null,
      description: null,
    },
    {
      id: 2,
      name: "Third Badge",
      image_url: null,
      description: null,
    },
  ],
}));

export { useStore, type Profile, type Chapter };
