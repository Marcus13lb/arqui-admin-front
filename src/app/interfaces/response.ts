export interface Response {
    result: any;
    message: string | null;
    http: {
        code:number;
        status:string;
    }
}
