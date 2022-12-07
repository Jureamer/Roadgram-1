import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware { //implements -> 반드시 구현하도록 강제하는거임
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request;

        response.on('finish', () => {
            const { statusCode } = response;
            this.logger.log(`${method} ${originalUrl} ${statusCode} ${ip}`);
        });

        next();
    }
}
