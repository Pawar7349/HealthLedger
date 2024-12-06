
import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: 'salmon-tough-locust-28.mypinata.cloud',
});

console.log('PinataJwt :', import.meta.env.VITE_PINATA_JWT)

const addFileToPinata = async (file) => {
  try {
    // Ensure the file is of type Blob
    const blob = new Blob([file], { type: file.type });
    console.log("blob :", blob)
    const upload = await pinata.upload.file(blob);
    console.log('Pinata response:', upload);
    console.log("UPLOAD HASH :", upload.IpfsHash)
    return upload.IpfsHash;
  } catch (error) {
    console.error('Pinata upload failed:', error);
    throw error;
  }
};

export default addFileToPinata;









