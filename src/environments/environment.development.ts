export const environment = {
    server: {
        protocol: 'http',
        address: 'localhost',
        port: 8080,
        context: ''
    },
    api: {
        all:{
            path:'/employees',
            method:'GET'
        },
        byId: {
            path: '/employees/byId/',
            method:'GET'
        }
    }
};
