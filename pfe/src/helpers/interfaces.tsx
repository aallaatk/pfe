 export interface Country {
    value: string;
    label: string;
}

 export interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    gsm: string;
    birthDate: string;
    agreeToTerms: boolean;
    isGuider: boolean;
    cinFile?: File;
}