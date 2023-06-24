import cloudinary from 'cloudinary-core';

const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: 'dvk80x6fi' });

const getVideoDuration = async ({ videoUrl }) => {
  const url = videoUrl;
  const result = await new Promise((resolve, reject) => {
    cloudinaryCore.video(url, { resource_type: 'video' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  const duration = result.duration;
  console.log(`Video duration: ${duration} seconds`);
  return duration;
};

export default getVideoDuration;
