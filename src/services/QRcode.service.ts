import * as QRCode from "qrcode";

const generateQR = async (id: string) => {
  try {
    const QR = await QRCode.toDataURL( id);
    return QR
  } catch (err) {
    console.log(err);
  }
};

export default generateQR;
