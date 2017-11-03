export default (request, response) => {

    const kvdb = require('kvstore');
    const pubnub = require('pubnub');
    const xhr = require('xhr');

    response.headers['Access-Control-Allow-Origin'] = '*';
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE';

    const body = JSON.parse(request.body);

    let controllers = {
        index: {},
        bootstrap: {},
        user_read: {},
        user_write: {},
        grant: {},
        chat: {},
        group: {}
    };

    let authPolicy = () => {
        return xhr.fetch("https://neutrinoapi.com/geocode-address");
    }

    let handleStatus = (status) => {

        if (!status.message || status.message !== 'Success') {
            console.log('PAM Issue: ', status.message);
            response.status = 500;
            return response.send('Internal Server Error');
        } else {
            response.status = 200;
            return response.send();
        }

    }

    let handleError = (err) => {
        console.log('PAM Error: ', err);
        response.status = 500;
        return response.send('Internal Server Error');
    }

    controllers.index.GET = () => {
        return response.send(200);
    };

    controllers.user_read.POST = () => {

        let chanEverybodyR = [
            body.global + '#user:' + body.uuid + '#read.*'
        ];

        return pubnub.grant({
            channels: chanEverybodyR,
            read: true, // false to disallow
            write: false,
            ttl: 0
        })
        .then(handleStatus)
        .catch(handleError);

    }

    controllers.user_write.POST = () => {

        let chanEverybodyW = [
            body.global + '#user:' + body.uuid + '#write.*'
        ];

        return pubnub.grant({
            channels: chanEverybodyW,
            write: true, // false to disallow
            read: false,
            ttl: 0
        })
        .then(handleStatus)
        .catch(handleError);

    }

    controllers.bootstrap.POST = () => {

        console.log('performing global grant for', body.uuid, 'on', body.global);

        let chanMeRW = [
            body.global,
            body.global + '-pnpres',
            body.global + '#chat#public.*',
            body.global + '#user#' + body.uuid + '#read.*',
            body.global + '#user#' + body.uuid + '#write.*'
        ];


        return pubnub.grant({
            channels: chanMeRW,
            read: true, // false to disallow
            write: true, // false to disallow,
            authKeys: [body.authKey],
            ttl: 0
        })
        .then(handleStatus)
        .catch(handleError);

    };

    controllers.group.POST = () => {

        let groups = [
            body.global + '#' + body.uuid + '#fixed',
            body.global + '#' + body.uuid + '#system',
            body.global + '#' + body.uuid + '#custom'
        ];

        console.log('granting on', groups);

        return pubnub.grant({
            channelGroups: groups,
            authKeys: [body.authkey],
            ttl: 0,
            manage: true,
            read: true
        }).then((status) => {

            if (status && status.message === 'Success') {
                return response.send();
            }

            response.status = 500;
            return response.send();

        }).catch((err) => {

            console.log(err);
            response.status = 500;
            return response.send();

        });

    };

    controllers.grant.POST = () => {

        console.log('grant for', body.authKey, 'on', body.chat.channel);

        return pubnub.grant({
            channels: [body.chat.channel],
            read: true,
            write: true,
            authKeys: [body.authKey],
            ttl: 0
        }).then((status) => {

            if (status && status.message === 'Success') {
                return response.send();
            }

            response.status = 500;
            return response.send();

        }).catch((err) => {

            console.log(err);
            response.status = 500;
            return response.send();

        });

    };

    // Choose route based on request.params and request.method
    // Execute the controller function in the controllers object
    const route = request.params.route;
    const method = request.method.toUpperCase();

    console.log(route, method)

    // GET request with empty route returns the homepage
    // If a requested route or method for a route does not exist, return 404
    if (!route && method === 'GET') {
        return controllers.index.GET();
    } else if (controllers[route] && controllers[route][method]) {

        return authPolicy().then(() => {
            return controllers[route][method]();
        }).catch(() => {
            console.log('Unauthorized');
            response.status = 401;
            return response.send();
        })

    } else {
        response.status = 404;
        console.log('not found', route, method);
        return response.send();
    }
};
