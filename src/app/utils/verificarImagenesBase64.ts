export const verificarImagenesBase64 = (string: string): boolean => {
    const regex = /(data:image\/(jpg|png|jpeg);base64,)/g;
    return regex.test(string);
}