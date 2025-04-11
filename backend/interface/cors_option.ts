export interface Cors_Options {
  origin: (origin: string | undefined, callback: (error: Error | null, success?: boolean) => void) => void;
  optionsSuccessStatus: number;
}