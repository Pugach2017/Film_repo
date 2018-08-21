export const imageUrl = path => {
  const image = `https://image.tmdb.org/t/p/w200`;
  const DEFAULT_PATH = `https://fakeimg.pl/200x300/?text=img`;
  return path ? image + path : DEFAULT_PATH;
};

export const bgImageUrl = path => {
  const image = `https://image.tmdb.org/t/p/w500`;
  const DEFAULT_PATH = `https://fakeimg.pl/500x280/?text=img`;
  return path ? image + path : DEFAULT_PATH;
};

export const getShortOverview = overview =>
  overview.length > 250 ? `${overview.slice(0, 250)}...` : overview;

export const getReleaseDate = releaseDate => releaseDate.slice(0, 4);

export const getOriginalTitleName = originalTitleName =>
  originalTitleName.length > 50;
