export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/usertweets") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            {
              id: "tw001",
              content: "this is a cool tweet",
              likes: 50,
              views: 100
            },
            {
              id: "tw002",
              content: "React is cool",
              likes: 47,
              views: 655
            },
            {
              id: "tw003",
              content: "Router is cool",
              likes: 55,
              views: 90
            },
            {
              id: "tw004",
              content: "CSS is Awesome",
              likes: 35,
              views: 55
            },
            {
              id: "tw005",
              content: "JavaScript is versatile",
              likes: 48,
              views: 90
            }
          ]
        });
      } else {
        reject({
          status: 404,
          message: "tweets not found."
        });
      }
    }, 2000);
  });
};
