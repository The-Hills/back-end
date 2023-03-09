import * as QRCode from "qrcode";

const generateQR = async (id: string) => {
  console.log(id)
  const QR = await QRCode.toDataURL(id);
  return QR
};

export default generateQR;
