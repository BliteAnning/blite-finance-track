import axiosInstance from "../axiosInstance";


const UploadImages = async (imageFile)=> {
    const formData = new FormData()

    //append image file to form data
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post("/upload-image", formData, {
            headers:{
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error) {
        console.log("error uploading image",error);
        throw error;
        
        
    }
}

export default UploadImages;