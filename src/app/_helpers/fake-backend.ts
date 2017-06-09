/**
 * Created by aafanasiev on 05.06.2017.
 */
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
  // array in local storage for registered users
  let user: any = {"username":"admin", "password":"admin"};
  let posts: any[] = JSON.parse(localStorage.getItem("posts"));
  // configure fake backend
  backend.connections.subscribe((connection: MockConnection) => {
    // wrap in timeout to simulate server api call
    setTimeout(() => {
      let GET_METHOD =  0;
      let POST_METHOD = 1;
      let PUT_METHOD =  2;
      let DELETE_METHOD=3;
      let OPTIONS =     4;
      let HEAD =        5;
      let PATCH =       6;

      if( localStorage.getItem('posts')==null){
        localStorage.setItem('posts','[{"id":1,"title":"First Post", "body":"First post body!"}]')
      }
      // authenticate
      if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === POST_METHOD) {
        // get parameters from post request
        let params = JSON.parse(connection.request.getBody());

        // find if any user matches login credentials

        if (user.username == params.username&&user.password == params.password ) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: {
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              token: 'fake-jwt-token'
            }
          })));
        } else {
          // else return 400 bad request
          connection.mockError(new Error('Username or password is incorrect'));
        }

        return;
      }
      // get users
      if (connection.request.url.endsWith('/api/posts') && connection.request.method === GET_METHOD) {
        // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: localStorage.getItem("posts") })));
        }

      if (connection.request.url.match(/\/api\/posts\/\d+$/) && connection.request.method === GET_METHOD) {
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          let urlParts = connection.request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let matchedPosts = posts.filter(post => { return post.id === id; });
          let post = matchedPosts.length ? matchedPosts[0] : null;

          // respond 200 OK with user
          connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: post })));
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
      }

      // create post
      if (connection.request.url.endsWith('/api/posts') && connection.request.method === PUT_METHOD) {
        let newPost = JSON.parse(connection.request.getBody());
        newPost.id = posts.length + 1;
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        // respond 200 OK
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

        return;
      }

      // delete post
      if (connection.request.url.match(/\/api\/posts\/\d+$/) && connection.request.method === DELETE_METHOD) {
        // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
          // find user by id in users array
          let urlParts = connection.request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < posts.length; i++) {
            let post = posts[i];
            if (post.id === id) {
              // delete user
              posts.splice(i, 1);
              localStorage.setItem('posts', JSON.stringify(posts));
              break;
            }
          }

          // respond 200 OK
          connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
      }

      // pass through any requests not handled above
      let realHttp = new Http(realBackend, options);
      let requestOptions = new RequestOptions({
        method: connection.request.method,
        headers: connection.request.headers,
        body: connection.request.getBody(),
        url: connection.request.url,
        withCredentials: connection.request.withCredentials,
        responseType: connection.request.responseType
      });
      realHttp.request(connection.request.url, requestOptions)
        .subscribe((response: Response) => {
            connection.mockRespond(response);
          },
          (error: any) => {
            connection.mockError(error);
          });

    }, 500);

  });

  return new Http(backend, options);
};

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
