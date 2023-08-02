export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/movies") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            {
              id: 1,
              title: "The Shawshank Redemption",
              rating: 9.3,
              year: 1994,
              category: "Drama"
            },
            {
              id: 2,
              title: "The Godfather",
              rating: 9.2,
              year: 1972,
              category: "Crime"
            },
            {
              id: 3,
              title: "The Dark Knight",
              rating: 9.0,
              year: 2008,
              category: "Action"
            },
            {
              id: 4,
              title: "Pulp Fiction",
              rating: 8.9,
              year: 1994,
              category: "Crime"
            },
            {
              id: 5,
              title: "The Lion King",
              rating: 8.5,
              year: 1994,
              category: "Drama"
            },
            {
              id: 6,
              title: "Inception",
              rating: 8.8,
              year: 2010,
              category: "Action"
            }
          ]
        });
      } else {
        reject({
          status: 404,
          message: "Movies not found."
        });
      }
    }, 2000);
  });
};
