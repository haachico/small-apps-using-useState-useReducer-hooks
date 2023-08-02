export const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/userchats") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            "Hey",
            "Hi, how are you?",
            "I am good, How are you doing?",
            "I am good too. Can we meet on Monday?"
          ]
        });
      } else {
        reject({
          status: 404,
          message: "users chat not found."
        });
      }
    }, 2000);
  });
};
