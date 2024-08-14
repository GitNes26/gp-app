// ESTA NO ES DE CONTEXTO, ES DE PRUEBA
export const getAllPosts = async () => {
   try {
      const request = await fetch(
         "https://jsonplaceholder.typicode.com/posts/1",
      );
      const result = await request.json();
      return result;
   } catch (error) {
      console.log("🚀 ~ getAllPosts ~ error:", error);
   }
};

export const getAllPhotos = async () => {
   try {
      const request = await fetch(
         "https://jsonplaceholder.typicode.com/photos",
      );
      let result = await request.json();
      result = result.slice(0, 10);
      return result;
   } catch (error) {
      console.log("🚀 ~ getAllPhotos ~ error:", error);
   }
};

export const getAllUsers = async () => {
   try {
      const request = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await request.json();
      return result;
   } catch (error) {
      console.log("🚀 ~ getAllUsers ~ error:", error);
   }
};
// ESTA NO ES DE CONTEXTO, ES DE PRUEBA
