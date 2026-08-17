export function getSiteBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'https://learntech.app';
}

export function getCertificateVerifyUrl(certificateId: string): string {
  const baseUrl = getSiteBaseUrl();
  return `${baseUrl}/verify/${certificateId}`;
}
