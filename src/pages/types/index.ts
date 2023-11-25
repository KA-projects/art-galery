export type UnsplashApi = {
  id: string;
  urls: {
    raw: string;
    regular: string;
    full: string;
    small: string;
    thumb: string;
  };
};

export type PhotoDetails = {
  user: {
    name: string;
    username: string;
    profile_image: {
      medium: string;
    };
  };
};
