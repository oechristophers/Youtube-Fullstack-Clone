import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const uploadToFirebase = async (app, userId, file) => {
  // Initialize Firebase Storage
  const storage = getStorage(app);

  // Create a storage reference for the file
  const storageRef = ref(storage, `profile_pics/${userId}/${file.name}`);

  // Create an upload task
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    // Monitor the upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error uploading file:", error);
        reject(error);
      },
      async () => {
        // Get the download URL once the upload is complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
