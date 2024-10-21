export interface Env {
    API_KEY: string,
    API_HOST: string
}

export default {
    async fetch(request: Request, env: Env) {
        if (request === new Request('host')) return new Response(`API host: ${env.API_HOST}`);
        if (request === new Request('key')) return new Response(`API host: ${env.API_KEY}`);
    }
}