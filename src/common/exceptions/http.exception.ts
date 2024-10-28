interface HttpExceptionOptions {
    cause?: unknown;
}

export class HttpException extends Error {
    constructor(
        private readonly response: string,
        private readonly status: number, 
        private readonly options?:  HttpExceptionOptions) {
        super();
        this.initName();
        this.initMessage();
        this.initCause();
    }

    private initMessage() {
        return this.message = this.response
    }

    private initCause() {
        if (this.options?.cause) {
            this.cause = this.options.cause;
            return
        }
    }

    private initName() {
        return this.name = this.constructor.name;
    } 
}
