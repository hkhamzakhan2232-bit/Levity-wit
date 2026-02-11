declare namespace Deno {
  const env: {
    get(key: string): string | undefined;
  };
}

declare const process:
  | {
      env: Record<string, string | undefined>;
    }
  | undefined;

declare module "https://esm.sh/@bunny.net/edgescript-sdk@latest" {
  export const net: {
    http: {
      serve(handler: (req: Request) => Response | Promise<Response>): void;
    };
  };
}
