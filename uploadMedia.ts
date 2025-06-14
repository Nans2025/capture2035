// utils/uploadMedia.ts
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const uploadMediaAsync = (uri: string, path: string, onProgress?: (percent: number) => void) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage();
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
