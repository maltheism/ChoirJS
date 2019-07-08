export default {
    app: {
        name: 'ChoirJS',
        version: '1.0.0',
        info: 'Healthcare Service'
    },
    ip: {
        server: '10.142.0.2'
    },
    port: {
        server: 4000,
        socket: 7770
    },
    security : {
        cookie: {
            secret: '87iVzEwvXu3AHwxAjAw2UD6CYyC29vGgbGK86mcCJCXvxWNj3C',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week cookie age.
        },
    },
    database: {
        postgres: {
            use: 'development', // set to 'deployment' or 'development' to switch (development).
            deployment: 'postgres://vagrant:vagrant@localhost/choir',
            development: 'postgres://vagrant:vagrant@localhost/choir'
        }
    },
    websocket: {
        deployment: [
            'ws://choirjs.com',
            'wss://choirjs.com',
            'http://choirjs.com',
            'https://choirjs.com'
        ],
        development: [
            'ws://localhost:7770',
            'wss://localhost:7770',
            'http://localhost:7770',
            'https://localhost:7770'
        ]
    }
};