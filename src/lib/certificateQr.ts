import QRCode from 'qrcode';
import { getCertificateVerifyUrl } from './urlUtils';

/**
 * Generates a PNG Data URL for a certificate verification QR code.
 */
export async function generateCertificateQrDataUrl(certificateId: string): Promise<string> {
  const verifyUrl = getCertificateVerifyUrl(certificateId);
  return QRCode.toDataURL(verifyUrl, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 250,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
  });
}

/**
 * Generates an SVG string for a certificate verification QR code.
 */
export async function generateCertificateQrSvg(certificateId: string): Promise<string> {
  const verifyUrl = getCertificateVerifyUrl(certificateId);
  return QRCode.toString(verifyUrl, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
  });
}

/**
 * Returns the exact encoded payload string for verification contract checks.
 */
export function getCertificateQrPayload(certificateId: string): string {
  return getCertificateVerifyUrl(certificateId);
}
