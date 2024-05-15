

const uploadImageToCloudinary = async (base64Image) => {
    try {
        const cloudName = 'stayease'; // Your Cloudinary cloud name
        const uploadPreset = 'stayease'; // Name of your Cloudinary upload preset

        const cloudinaryUploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

        const response = await fetch(cloudinaryUploadEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file: `data:image/jpeg;base64,${base64Image}`,
                upload_preset: uploadPreset // Specify the upload preset name
            }),
        });

        const data = await response.json();
        console.log('data', data)
        return data.secure_url; // URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return null;
    }
};
export default uploadImageToCloudinary